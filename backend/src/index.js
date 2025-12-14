import "dotenv/config";
import express from "express";
import cors from "cors";
import pkg from "pg";
import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const { Pool } = pkg;

const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set in environment variables");
  process.exit(1);
}

if (!RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not set in environment variables");
  process.exit(1);
}

if (!NOTIFICATION_EMAIL) {
  console.error("NOTIFICATION_EMAIL is not set in environment variables");
  process.exit(1);
}

if (!FROM_EMAIL) {
  console.error("FROM_EMAIL is not set in environment variables");
  process.exit(1);
}

if (!ADMIN_TOKEN) {
  console.error("ADMIN_TOKEN is not set in environment variables");
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});
const resend = new Resend(RESEND_API_KEY);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function requireAdmin(req, res, next) {
  const token = req.header("x-admin-token");

  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  next();
}

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      summary TEXT,
      description TEXT,
      image_url TEXT,
      link_url TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      cover_image_url TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      published_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}

const app = express();

const allowedOrigins = [
  'https://fortium-africa-2.onrender.com',
  'http://localhost:3000',
  'http://localhost:5173' // Vite default dev server port
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(UPLOADS_DIR));
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Contact form submission endpoint
app.post("/api/contact", async (req, res) => {
  console.log('Received contact form submission:', JSON.stringify(req.body, null, 2));
  const { fullName, email, phone, message } = req.body || {};

  if (!fullName || !email || !phone || !message) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }

  try {
    await pool.query(
      "INSERT INTO contact_submissions (full_name, email, phone, message) VALUES ($1, $2, $3, $4)",
      [fullName, email, phone, message]
    );

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFICATION_EMAIL],
      subject: "New contact form submission - Fortium Africa",
      text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("Error handling /api/contact:", err);
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      code: err.code
    });
    return res.status(500).json({ 
      success: false, 
      error: "Internal server error",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

app.post("/api/admin/upload-image", requireAdmin, async (req, res) => {
  try {
    const { fileName, dataUrl } = req.body || {};

    if (!fileName || !dataUrl || typeof fileName !== "string" || typeof dataUrl !== "string") {
      return res.status(400).json({ success: false, error: "fileName and dataUrl are required" });
    }

    const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
    if (!match) {
      return res.status(400).json({ success: false, error: "Invalid dataUrl format" });
    }

    const mimeType = match[1];
    const base64 = match[2];

    const buffer = Buffer.from(base64, "base64");

    let ext = "";
    if (mimeType === "image/jpeg" || mimeType === "image/jpg") ext = ".jpg";
    else if (mimeType === "image/png") ext = ".png";
    else if (mimeType === "image/webp") ext = ".webp";
    else if (mimeType === "image/gif") ext = ".gif";
    else {
      return res.status(400).json({ success: false, error: "Unsupported image type" });
    }

    const safeBaseName = path.basename(fileName, path.extname(fileName)).replace(/[^a-zA-Z0-9-_]/g, "_");
    const uniqueName = `${safeBaseName || "image"}-${Date.now()}${ext}`;
    const filePath = path.join(UPLOADS_DIR, uniqueName);

    await fs.promises.writeFile(filePath, buffer);

    const url = `/uploads/${uniqueName}`;
    return res.json({ success: true, url });
  } catch (err) {
    console.error("Error handling POST /api/admin/upload-image:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.get("/api/projects", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, slug, summary, description, image_url, link_url, status, created_at, updated_at FROM projects WHERE status = 'published' ORDER BY created_at DESC"
    );
    return res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Error handling GET /api/projects:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.get("/api/projects/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const result = await pool.query(
      "SELECT id, title, slug, summary, description, image_url, link_url, status, created_at, updated_at FROM projects WHERE slug = $1 AND status = 'published' LIMIT 1",
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }

    return res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error handling GET /api/projects/:slug:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.get("/api/blogs", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, slug, excerpt, content, cover_image_url, status, published_at, created_at, updated_at FROM blog_posts WHERE status = 'published' ORDER BY COALESCE(published_at, created_at) DESC"
    );
    return res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Error handling GET /api/blogs:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.get("/api/blogs/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const result = await pool.query(
      "SELECT id, title, slug, excerpt, content, cover_image_url, status, published_at, created_at, updated_at FROM blog_posts WHERE slug = $1 AND status = 'published' LIMIT 1",
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Blog post not found" });
    }

    return res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error handling GET /api/blogs/:slug:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Admin routes for projects
app.get("/api/admin/projects", requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, slug, summary, description, image_url, link_url, status, created_at, updated_at FROM projects ORDER BY created_at DESC"
    );
    return res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Error handling GET /api/admin/projects:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.post("/api/admin/projects", requireAdmin, async (req, res) => {
  const { title, slug, summary, description, imageUrl, linkUrl, status } = req.body || {};

  if (!title || !slug) {
    return res.status(400).json({ success: false, error: "title and slug are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO projects (title, slug, summary, description, image_url, link_url, status)
       VALUES ($1, $2, $3, $4, $5, $6, COALESCE($7, 'draft'))
       RETURNING id, title, slug, summary, description, image_url, link_url, status, created_at, updated_at`,
      [title, slug, summary || null, description || null, imageUrl || null, linkUrl || null, status || null]
    );

    return res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error handling POST /api/admin/projects:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.put("/api/admin/projects/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, slug, summary, description, imageUrl, linkUrl, status } = req.body || {};

  try {
    const result = await pool.query(
      `UPDATE projects
       SET title = COALESCE($1, title),
           slug = COALESCE($2, slug),
           summary = COALESCE($3, summary),
           description = COALESCE($4, description),
           image_url = COALESCE($5, image_url),
           link_url = COALESCE($6, link_url),
           status = COALESCE($7, status),
           updated_at = NOW()
       WHERE id = $8
       RETURNING id, title, slug, summary, description, image_url, link_url, status, created_at, updated_at`,
      [title ?? null, slug ?? null, summary ?? null, description ?? null, imageUrl ?? null, linkUrl ?? null, status ?? null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }

    return res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error handling PUT /api/admin/projects/:id:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.delete("/api/admin/projects/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM projects WHERE id = $1 RETURNING id", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Error handling DELETE /api/admin/projects/:id:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Admin routes for blog posts
app.get("/api/admin/blogs", requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, slug, excerpt, content, cover_image_url, status, published_at, created_at, updated_at FROM blog_posts ORDER BY COALESCE(published_at, created_at) DESC"
    );
    return res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Error handling GET /api/admin/blogs:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.post("/api/admin/blogs", requireAdmin, async (req, res) => {
  const { title, slug, excerpt, content, coverImageUrl, status, publishedAt } = req.body || {};

  if (!title || !slug || !content) {
    return res.status(400).json({ success: false, error: "title, slug and content are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, status, published_at)
       VALUES ($1, $2, $3, $4, $5, COALESCE($6, 'draft'), $7)
       RETURNING id, title, slug, excerpt, content, cover_image_url, status, published_at, created_at, updated_at`,
      [title, slug, excerpt || null, content, coverImageUrl || null, status || null, publishedAt || null]
    );

    return res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error handling POST /api/admin/blogs:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.put("/api/admin/blogs/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, slug, excerpt, content, coverImageUrl, status, publishedAt } = req.body || {};

  try {
    const result = await pool.query(
      `UPDATE blog_posts
       SET title = COALESCE($1, title),
           slug = COALESCE($2, slug),
           excerpt = COALESCE($3, excerpt),
           content = COALESCE($4, content),
           cover_image_url = COALESCE($5, cover_image_url),
           status = COALESCE($6, status),
           published_at = COALESCE($7, published_at),
           updated_at = NOW()
       WHERE id = $8
       RETURNING id, title, slug, excerpt, content, cover_image_url, status, published_at, created_at, updated_at`,
      [title ?? null, slug ?? null, excerpt ?? null, content ?? null, coverImageUrl ?? null, status ?? null, publishedAt ?? null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Blog post not found" });
    }

    return res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error handling PUT /api/admin/blogs/:id:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.delete("/api/admin/blogs/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM blog_posts WHERE id = $1 RETURNING id", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Blog post not found" });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Error handling DELETE /api/admin/blogs/:id:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

ensureSchema()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database schema", err);
    process.exit(1);
  });
