import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowLeft } from "lucide-react";
import projectsHero from "@/assets/projects-hero.jpg";

type Project = {
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
};

const ProjectDetail = () => {
  const { id: slug } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;

    async function loadProject() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/projects/${slug}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Project not found");
          }
          throw new Error("Failed to load project");
        }

        const data = await res.json();
        if (!data?.success || !data.data) {
          throw new Error("Unexpected response from server");
        }

        if (isMounted) {
          setProject(data.data as Project);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load project");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProject();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground font-body">Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">Project Not Found</h1>
        {error && <p className="text-red-600 font-body mb-4">{error}</p>}
        <Link to="/projects">
          <Button>Back to Projects</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative min-h-[500px] flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={project.image_url || projectsHero}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/70 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 pb-12 lg:px-8">
          <Link to="/projects" className="inline-flex items-center gap-2 text-white mb-6 hover:text-accent transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-body">Back to Projects</span>
          </Link>
          <Badge className="mb-4">Project</Badge>
          <h1 className="text-4xl font-heading font-bold text-white sm:text-5xl mb-4">
            {project.title}
          </h1>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="h-5 w-5" />
            <span className="text-lg font-body">{project.link_url || ""}</span>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Background */}
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold mb-4 text-primary">Overview</h2>
            <p className="text-lg font-body text-foreground leading-relaxed">
              {project.description || project.summary || "Details coming soon."}
            </p>
          </div>

          {/* Additional Details */}
          {project.link_url && (
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-4 text-primary">Reference Link</h2>
              <p className="text-lg font-body text-foreground leading-relaxed break-all">
                {project.link_url}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="bg-muted rounded-lg p-8 text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">Interested in a Similar Project?</h3>
            <p className="text-muted-foreground font-body mb-6">
              Let's discuss how we can help with your infrastructure needs
            </p>
            <Link to="/contact">
              <Button size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
