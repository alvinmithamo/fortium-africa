import "dotenv/config";
import express from "express";
import cors from "cors";
import pkg from "pg";
import { Resend } from "resend";

const { Pool } = pkg;

const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL;

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

const pool = new Pool({ connectionString: DATABASE_URL });
const resend = new Resend(RESEND_API_KEY);

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
  `);
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
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
