import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import projectsHero from "@/assets/projects-hero.jpg";
import { apiUrl } from "@/lib/api";

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

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(apiUrl("/api/projects"));
        if (!res.ok) {
          throw new Error("Failed to load projects");
        }

        const data = await res.json();
        if (!data?.success || !Array.isArray(data.data)) {
          throw new Error("Unexpected response from server");
        }

        if (isMounted) {
          setProjects(data.data as Project[]);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load projects");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={projectsHero} 
            alt="Featured Projects" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/95 to-deep-navy/70" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 py-24 lg:px-8">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl font-heading font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              Our Project Portfolio
            </h1>
            <p className="text-xl text-white/90 font-body">
              Fortium Africa's projects reflect our commitment to technical excellence, innovation, and sustainable development. From solar energy systems and water infrastructure to large‑scale civil projects, each initiative represents our dedication to delivering impactful, efficient, and lasting solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {loading && (
            <p className="text-muted-foreground font-body">Loading projects...</p>
          )}

          {error && !loading && (
            <p className="text-red-600 font-body">{error}</p>
          )}

          {!loading && !error && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const image = project.image_url || projectsHero;

                return (
                  <Link key={project.id} to={`/projects/${project.slug}`}>
                    <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-6">
                        <Badge className="mb-3">Project</Badge>
                        <h3 className="text-xl font-heading font-semibold mb-2">{project.title}</h3>
                        {project.summary && (
                          <p className="text-sm text-muted-foreground font-body mb-2">
                            {project.summary}
                          </p>
                        )}
                        {project.link_url && (
                          <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm font-body truncate max-w-[220px]">
                              {project.link_url}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
