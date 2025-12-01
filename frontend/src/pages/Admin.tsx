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
    <div className="min-h-screen bg-gradient-to-b from-background via-slate-950/90 to-background flex flex-col py-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl space-y-10">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Admin
              <span className="h-1 w-1 rounded-full bg-primary" />
              Control Center
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-heading font-bold tracking-tight">
              Site Management Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground font-body">
              Securely manage your <span className="font-semibold text-foreground">projects</span> and
              <span className="font-semibold text-foreground"> blog content</span> from a single, streamlined
              workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-600">Projects</p>
              <p className="mt-1 font-heading text-sm text-emerald-500">
                {projects.length || "0"} active
              </p>
            </div>
            <div className="rounded-xl border border-sky-500/40 bg-sky-500/5 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.18em] text-sky-600">Blog Posts</p>
              <p className="mt-1 font-heading text-sm text-sky-500">
                {blogs.length || "0"} total
              </p>
            </div>
          </div>
        </header>

        {/* Token Section */}
        <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm shadow-[0_18px_60px_rgba(15,23,42,0.65)]">
          <CardContent className="p-6 sm:p-7 space-y-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="admin-token" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Admin Token
                </Label>
                <Input
                  id="admin-token"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste the ADMIN_TOKEN value here"
                  className="bg-background/70 border-primary/40 focus-visible:ring-primary/80"
                />
                <p className="text-[11px] text-muted-foreground font-body">
                  This token is stored only in your browser and sent securely with each admin request.
                </p>
              </div>
              <div className="flex flex-col gap-2 md:w-40">
                <Button
                  type="button"
                  onClick={handleSaveToken}
                  className="w-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                >
                  Save & Load Data
                </Button>
                {storedTokenChecked && token && (
                  <p className="text-[11px] text-emerald-400 font-body text-center">Token loaded</p>
                )}
              </div>
            </div>
            {storedTokenChecked && !token && (
              <p className="text-xs text-muted-foreground font-body flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Enter the token configured on the server as <code>ADMIN_TOKEN</code>.
              </p>
            )}
            {error && (
              <p className="text-xs text-red-400 font-body bg-red-500/10 border border-red-500/40 rounded-md px-3 py-2">
                {error}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2.4fr)] items-start">
          <div className="space-y-8">
            {/* Create Project */}
            <Card className="border border-slate-700/70 bg-slate-950/60 backdrop-blur">
              <CardContent className="p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-heading font-semibold flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold">
                        {editingProjectId ? "UPD" : "NEW"}
                      </span>
                      <span className="text-white">{editingProjectId ? "Edit Project" : "Create Project"}</span>
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground font-body text-white">
                      Showcase your latest work. Images will be optimized and stored on the server.
                    </p>
                  </div>
                  {editingProjectId && (
                    <Button type="button" variant="outline" size="sm" onClick={cancelEditProject}>
                      Cancel Edit
                    </Button>
                  )}
                </div>
                <form onSubmit={handleCreateProject} className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-1 space-y-1.5">
                    <Label htmlFor="title" className="text-white">Title *</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="md:col-span-1 space-y-1.5">
                    <Label htmlFor="slug" className="text-white">Slug *</Label>
                    <Input
                      id="slug"
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      placeholder="my-project-slug"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <Label htmlFor="summary" className="text-white">Summary</Label>
                    <Input
                      id="summary"
                      value={form.summary}
                      onChange={(e) => setForm({ ...form, summary: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <Label htmlFor="description"className="text-white">Description</Label>
                    <Input
                      id="description"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-1 space-y-1.5">
                    <Label htmlFor="image_file"className="text-white">Project Image</Label>
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
                      <p className="mt-1 text-[11px] text-muted-foreground break-all">Current image: {form.image_url}</p>
                    )}
                  </div>
                  <div className="md:col-span-1 space-y-1.5">
                    <Label htmlFor="link_url" className="text-white">Link / Location</Label>
                    <Input
                      id="link_url"
                      value={form.link_url}
                      onChange={(e) => setForm({ ...form, link_url: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-1 space-y-1.5">
                    <Label htmlFor="status" className="text-white">Status</Label>
                    <Input
                      id="status"
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      placeholder="draft or published"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end pt-2">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="min-w-[150px] bg-emerald-500/90 hover:bg-emerald-500 text-emerald-950 font-semibold shadow-lg shadow-emerald-500/30"
                    >
                      {saving ? "Saving..." : editingProjectId ? "Save Changes" : "Create Project"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Projects List */}
            <Card className="border border-slate-700/70 bg-slate-950/60 backdrop-blur">
              <CardContent className="p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-heading font-semibold text-white">Projects</h2>
                    <p className="mt-1 text-xs text-muted-foreground font-body text-white">
                      Manage and reorder your featured work. Edit entries instantly.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => token && fetchProjects(token)}
                    disabled={!token || loading}
                  >
                    Refresh
                  </Button>
                </div>
                {loading && <p className="text-muted-foreground font-body text-sm">Loading projects...</p>}
                {!loading && projects.length === 0 && (
                  <p className="text-muted-foreground font-body text-sm">
                    No projects yet. Create your first project above.
                  </p>
                )}
                {!loading && projects.length > 0 && (
                  <div className="space-y-3">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-lg border border-slate-700/80 bg-slate-900/60 px-4 py-3 hover:border-emerald-500/60 hover:bg-slate-900/90 transition-colors text-white"
                      >
                        <div>
                          <div className="font-heading font-semibold flex flex-wrap items-center gap-2">
                            <span className="text-white">{project.title}</span>
                            <span className="text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full bg-slate-800 text-white">
                              {project.status}
                            </span>
                          </div>
                          <div className="mt-1 text-[11px] text-muted-foreground font-mono break-all text-white">
                            /projects/{project.slug}
                          </div>
                          {project.summary && (
                            <div className="text-sm text-muted-foreground font-body mt-1 max-w-xl line-clamp-2 text-white">
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
                            className="text-black"
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
          </div>

          <div className="space-y-8">
            {/* Create Blog Post */}
            <Card className="border border-slate-700/70 bg-slate-950/60 backdrop-blur">
              <CardContent className="p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-heading font-semibold flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/10 text-sky-300 text-xs font-semibold">
                        {editingBlogId ? "EDIT" : "NEW"}
                      </span>
                      <span className="text-white">{editingBlogId ? "Edit Blog Post" : "Create Blog Post"}</span>
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground font-body text-white">
                      Publish stories, updates, and thought leadership to your audience.
                    </p>
                  </div>
                  {editingBlogId && (
                    <Button type="button" variant="outline" size="sm" onClick={cancelEditBlog}>
                      Cancel Edit
                    </Button>
                  )}
                </div>
                <form onSubmit={handleCreateBlog} className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-1 space-y-1.5">
                    <Label htmlFor="blog-title" className="text-white">Title *</Label>
                    <Input
                      id="blog-title"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="md:col-span-1 space-y-1.5">
                    <Label htmlFor="blog-slug" className="text-white">Slug *</Label>
                    <Input
                      id="blog-slug"
                      value={blogForm.slug}
                      onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                      placeholder="my-blog-post"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <Label htmlFor="blog-excerpt" className="text-white">Excerpt</Label>
                    <Input
                      id="blog-excerpt"
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <Label htmlFor="blog-content" className="text-white">Content *</Label>
                    <Input
                      id="blog-content"
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      required
                    />
                  </div>
                  <div className="md:col-span-1 space-y-1.5">
                    <Label htmlFor="blog-cover" className="text-white">Cover Image</Label>
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
                      <p className="mt-1 text-[11px] text-muted-foreground break-all">Current cover: {blogForm.cover_image_url}</p>
                    )}
                  </div>
                  <div className="md:col-span-1 space-y-1.5">
                    <Label htmlFor="blog-status" className="text-white">Status</Label>
                    <Input
                      id="blog-status"
                      value={blogForm.status}
                      onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                      placeholder="draft or published"
                    />
                  </div>
                  <div className="md:col-span-1 space-y-1.5">
                    <Label htmlFor="blog-published" className="text-white">Published At (optional ISO date)</Label>
                    <Input
                      id="blog-published"
                      value={blogForm.published_at}
                      onChange={(e) => setBlogForm({ ...blogForm, published_at: e.target.value })}
                      placeholder="2025-11-28T12:00:00Z"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end pt-2">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="min-w-[150px] bg-sky-500/90 hover:bg-sky-500 text-sky-950 font-semibold shadow-lg shadow-sky-500/30"
                    >
                      {saving ? "Saving..." : editingBlogId ? "Save Changes" : "Create Blog Post"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Blog Posts List */}
            <Card className="border border-slate-700/70 bg-slate-950/60 backdrop-blur">
              <CardContent className="p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-heading font-semibold text-white">Blog Posts</h2>
                    <p className="mt-1 text-xs text-muted-foreground font-body text-white">
                      Browse and manage everything you have published or drafted.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => token && fetchBlogs(token)}
                    disabled={!token || loading}
                  >
                    Refresh
                  </Button>
                </div>
                {loading && <p className="text-muted-foreground font-body text-sm">Loading blog posts...</p>}
                {!loading && blogs.length === 0 && (
                  <p className="text-muted-foreground font-body text-sm">
                    No blog posts yet. Create your first post above.
                  </p>
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
                          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-lg border border-slate-700/80 bg-slate-900/60 px-4 py-3 hover:border-sky-500/60 hover:bg-slate-900/90 transition-colors"
                        >
                          <div>
                            <div className="font-heading font-semibold flex flex-wrap items-center gap-2">
                              <span className="text-white">{post.title}</span>
                              <span className="text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full bg-slate-800 text-white">
                                {post.status}
                              </span>
                            </div>
                            <div className="mt-1 text-[11px] text-muted-foreground font-mono break-all text-white">
                              /blog (list) – slug: {post.slug}
                            </div>
                            {date && (
                              <div className="text-[11px] text-muted-foreground font-body mt-1">Published: {date}</div>
                            )}
                            {post.excerpt && (
                              <div className="text-sm text-muted-foreground font-body mt-1 max-w-xl line-clamp-2 text-white">
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
      </div>
    </div>
  );
}

export default Admin;
