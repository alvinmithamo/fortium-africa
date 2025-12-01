import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const [token, setToken] = useState<string>("");
  const [storedTokenChecked, setStoredTokenChecked] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    description: "",
    image_url: "",
    link_url: "",
    status: "draft",
  });
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image_url: "",
    status: "draft",
    published_at: "",
  });

  const uploadImageFile = async (file: File): Promise<string> => {
    if (!token) {
      throw new Error("Please set the admin token first");
    }

    const fileName = file.name;

    const dataUrl: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

    const res = await fetch("/api/admin/upload-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ fileName, dataUrl }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      const msg = data?.error || "Failed to upload image";
      throw new Error(msg);
    }

    const data = await res.json();
    if (!data?.success || !data.url) {
      throw new Error("Unexpected response from server");
    }

    return data.url as string;
  };

  useEffect(() => {
    const saved = window.localStorage.getItem("adminToken");
    if (saved) {
      setToken(saved);
      fetchProjects(saved);
      fetchBlogs(saved);
    }
    setStoredTokenChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProjects = async (adminToken: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/admin/projects", {
        headers: {
          "x-admin-token": adminToken,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized: invalid admin token");
        }
        throw new Error("Failed to load projects");
      }

      const data = await res.json();
      if (!data?.success || !Array.isArray(data.data)) {
        throw new Error("Unexpected response from server");
      }

      setProjects(data.data as Project[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async (adminToken: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/admin/blogs", {
        headers: {
          "x-admin-token": adminToken,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized: invalid admin token");
        }
        throw new Error("Failed to load blog posts");
      }

      const data = await res.json();
      if (!data?.success || !Array.isArray(data.data)) {
        throw new Error("Unexpected response from server");
      }

      setBlogs(data.data as BlogPost[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToken = () => {
    if (!token) {
      toast.error("Please enter a token");
      return;
    }

    window.localStorage.setItem("adminToken", token);
    toast.success("Admin token saved");
    fetchProjects(token);
    fetchBlogs(token);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please set the admin token first");
      return;
    }

    if (!form.title || !form.slug) {
      toast.error("Title and slug are required");
      return;
    }

    try {
      setSaving(true);
      const isEditing = editingProjectId !== null;

      const res = await fetch(
        isEditing ? `/api/admin/projects/${editingProjectId}` : "/api/admin/projects",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": token,
          },
          body: JSON.stringify({
            title: form.title,
            slug: form.slug,
            summary: form.summary || null,
            description: form.description || null,
            imageUrl: form.image_url || null,
            linkUrl: form.link_url || null,
            status: form.status || "draft",
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const msg = data?.error || (editingProjectId ? "Failed to update project" : "Failed to create project");
        throw new Error(msg);
      }

      toast.success(editingProjectId ? "Project updated" : "Project created");
      setForm({
        title: "",
        slug: "",
        summary: "",
        description: "",
        image_url: "",
        link_url: "",
        status: "draft",
      });
      setEditingProjectId(null);
      fetchProjects(token);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : editingProjectId
          ? "Failed to update project"
          : "Failed to create project"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!token) {
      toast.error("Please set the admin token first");
      return;
    }

    if (!window.confirm("Delete this project? This cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": token,
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const msg = data?.error || "Failed to delete project";
        throw new Error(msg);
      }

      toast.success("Project deleted");
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete project");
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    setForm({
      title: project.title,
      slug: project.slug,
      summary: project.summary || "",
      description: project.description || "",
      image_url: project.image_url || "",
      link_url: project.link_url || "",
      status: project.status || "draft",
    });
  };

  const cancelEditProject = () => {
    setEditingProjectId(null);
    setForm({
      title: "",
      slug: "",
      summary: "",
      description: "",
      image_url: "",
      link_url: "",
      status: "draft",
    });
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please set the admin token first");
      return;
    }

    if (!blogForm.title || !blogForm.slug || !blogForm.content) {
      toast.error("Title, slug and content are required");
      return;
    }

    try {
      setSaving(true);
      const isEditing = editingBlogId !== null;

      const res = await fetch(
        isEditing ? `/api/admin/blogs/${editingBlogId}` : "/api/admin/blogs",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": token,
          },
          body: JSON.stringify({
            title: blogForm.title,
            slug: blogForm.slug,
            excerpt: blogForm.excerpt || null,
            content: blogForm.content,
            coverImageUrl: blogForm.cover_image_url || null,
            status: blogForm.status || "draft",
            publishedAt: blogForm.published_at || null,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const msg =
          data?.error || (editingBlogId ? "Failed to update blog post" : "Failed to create blog post");
        throw new Error(msg);
      }

      toast.success(editingBlogId ? "Blog post updated" : "Blog post created");
      setBlogForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        cover_image_url: "",
        status: "draft",
        published_at: "",
      });
      setEditingBlogId(null);
      fetchBlogs(token);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : editingBlogId
          ? "Failed to update blog post"
          : "Failed to create blog post"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (!token) {
      toast.error("Please set the admin token first");
      return;
    }

    if (!window.confirm("Delete this blog post? This cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": token,
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const msg = data?.error || "Failed to delete blog post";
        throw new Error(msg);
      }

      toast.success("Blog post deleted");
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete blog post");
    }
  };

  const handleEditBlog = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setBlogForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      cover_image_url: post.cover_image_url || "",
      status: post.status || "draft",
      published_at: post.published_at || "",
    });
  };

  const cancelEditBlog = () => {
    setEditingBlogId(null);
    setBlogForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_image_url: "",
      status: "draft",
      published_at: "",
    });
  };

  return (
    <div className="flex flex-col py-10 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl space-y-10">
        <h1 className="text-3xl font-heading font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground font-body mb-6">
          Use this page to manage projects and blog posts. Keep your admin token secret.
        </p>

        {/* Token Section */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <Label htmlFor="admin-token">Admin Token</Label>
                <Input
                  id="admin-token"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste the ADMIN_TOKEN value here"
                />
              </div>
              <Button type="button" onClick={handleSaveToken}>
                Save & Load Projects
              </Button>
            </div>
            {storedTokenChecked && !token && (
              <p className="text-sm text-muted-foreground font-body">
                Enter the token configured on the server as <code>ADMIN_TOKEN</code>.
              </p>
            )}
            {error && (
              <p className="text-sm text-red-600 font-body">{error}</p>
            )}
          </CardContent>
        </Card>

        {/* Create Project */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-semibold">
                {editingProjectId ? "Edit Project" : "Create Project"}
              </h2>
              {editingProjectId && (
                <Button type="button" variant="outline" size="sm" onClick={cancelEditProject}>
                  Cancel Edit
                </Button>
              )}
            </div>
            <form onSubmit={handleCreateProject} className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-1">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="my-project-slug"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="summary">Summary</Label>
                <Input
                  id="summary"
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="image_file">Project Image</Label>
                <Input
                  id="image_file"
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const url = await uploadImageFile(file);
                      setForm((prev) => ({ ...prev, image_url: url }));
                      toast.success("Image uploaded");
                    } catch (err) {
                      toast.error(err instanceof Error ? err.message : "Failed to upload image");
                    } finally {
                      e.target.value = "";
                    }
                  }}
                />
                {form.image_url && (
                  <p className="mt-1 text-xs text-muted-foreground break-all">Current image: {form.image_url}</p>
                )}
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="link_url">Link / Location</Label>
                <Input
                  id="link_url"
                  value={form.link_url}
                  onChange={(e) => setForm({ ...form, link_url: e.target.value })}
                />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  placeholder="draft or published"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Create Project"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Projects List */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-semibold">Projects</h2>
              <Button type="button" variant="outline" onClick={() => token && fetchProjects(token)} disabled={!token || loading}>
                Refresh
              </Button>
            </div>
            {loading && <p className="text-muted-foreground font-body">Loading projects...</p>}
            {!loading && projects.length === 0 && (
              <p className="text-muted-foreground font-body">No projects yet. Create your first project above.</p>
            )}
            {!loading && projects.length > 0 && (
              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border rounded-md px-3 py-2"
                  >
                    <div>
                      <div className="font-heading font-semibold flex items-center gap-2">
                        <span>{project.title}</span>
                        <span className="text-xs uppercase tracking-wide px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {project.status}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground font-mono break-all">
                        /projects/{project.slug}
                      </div>
                      {project.summary && (
                        <div className="text-sm text-muted-foreground font-body mt-1 max-w-xl truncate">
                          {project.summary}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProject(project)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create Blog Post */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-semibold">
                {editingBlogId ? "Edit Blog Post" : "Create Blog Post"}
              </h2>
              {editingBlogId && (
                <Button type="button" variant="outline" size="sm" onClick={cancelEditBlog}>
                  Cancel Edit
                </Button>
              )}
            </div>
            <form onSubmit={handleCreateBlog} className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-1">
                <Label htmlFor="blog-title">Title *</Label>
                <Input
                  id="blog-title"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="blog-slug">Slug *</Label>
                <Input
                  id="blog-slug"
                  value={blogForm.slug}
                  onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                  placeholder="my-blog-post"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="blog-excerpt">Excerpt</Label>
                <Input
                  id="blog-excerpt"
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="blog-content">Content *</Label>
                <Input
                  id="blog-content"
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="blog-cover">Cover Image</Label>
                <Input
                  id="blog-cover"
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const url = await uploadImageFile(file);
                      setBlogForm((prev) => ({ ...prev, cover_image_url: url }));
                      toast.success("Cover image uploaded");
                    } catch (err) {
                      toast.error(err instanceof Error ? err.message : "Failed to upload image");
                    } finally {
                      e.target.value = "";
                    }
                  }}
                />
                {blogForm.cover_image_url && (
                  <p className="mt-1 text-xs text-muted-foreground break-all">Current cover: {blogForm.cover_image_url}</p>
                )}
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="blog-status">Status</Label>
                <Input
                  id="blog-status"
                  value={blogForm.status}
                  onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                  placeholder="draft or published"
                />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="blog-published">Published At (optional ISO date)</Label>
                <Input
                  id="blog-published"
                  value={blogForm.published_at}
                  onChange={(e) => setBlogForm({ ...blogForm, published_at: e.target.value })}
                  placeholder="2025-11-28T12:00:00Z"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Create Blog Post"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Blog Posts List */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-semibold">Blog Posts</h2>
              <Button
                type="button"
                variant="outline"
                onClick={() => token && fetchBlogs(token)}
                disabled={!token || loading}
              >
                Refresh
              </Button>
            </div>
            {loading && <p className="text-muted-foreground font-body">Loading blog posts...</p>}
            {!loading && blogs.length === 0 && (
              <p className="text-muted-foreground font-body">No blog posts yet. Create your first post above.</p>
            )}
            {!loading && blogs.length > 0 && (
              <div className="space-y-3">
                {blogs.map((post) => {
                  const date = post.published_at
                    ? new Date(post.published_at).toLocaleDateString()
                    : "";

                  return (
                    <div
                      key={post.id}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border rounded-md px-3 py-2"
                    >
                      <div>
                        <div className="font-heading font-semibold flex items-center gap-2">
                          <span>{post.title}</span>
                          <span className="text-xs uppercase tracking-wide px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {post.status}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground font-mono break-all">
                          /blog (list) – slug: {post.slug}
                        </div>
                        {date && (
                          <div className="text-xs text-muted-foreground font-body">Published: {date}</div>
                        )}
                        {post.excerpt && (
                          <div className="text-sm text-muted-foreground font-body mt-1 max-w-xl truncate">
                            {post.excerpt}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBlog(post)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteBlog(post.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
