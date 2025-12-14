import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, HardHat } from "lucide-react";
import projectsHero from "@/assets/projects-hero.jpg";
import { apiUrl } from "@/lib/api";
import { Project } from "@/types/project";
import { demoProjects } from "@/data/demoProjects";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

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
          // Combine demo projects with fetched projects, ensuring no duplicates by ID
          const allProjects = [...demoProjects, ...(data.data as Project[])]
            .filter((project, index, self) => 
              index === self.findIndex((p) => p.id === project.id)
            );
          setProjects(allProjects);
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

          <div className="mb-8 flex flex-wrap gap-4">
            <button 
              onClick={() => setActiveFilter('all')} 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All Projects
            </button>
            <button 
              onClick={() => setActiveFilter('solar')} 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                activeFilter === 'solar' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Solar
            </button>
            <button 
              onClick={() => setActiveFilter('water')} 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                activeFilter === 'water' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Water
            </button>
            <button 
              onClick={() => setActiveFilter('civil')} 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                activeFilter === 'civil' 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Civil Works
            </button>
          </div>

          {!loading && !error && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter(project => 
                  activeFilter === 'all' || project.project_type === activeFilter
                )
                .map((project) => {
                const image = project.image_url || projectsHero;
                const statusColors = {
                  'Completed': 'bg-green-100 text-green-800',
                  'Operational': 'bg-blue-100 text-blue-800',
                  'In Progress': 'bg-yellow-100 text-yellow-800',
                  'Planned': 'bg-gray-100 text-gray-800',
                };

                return (
                  <Link key={project.id} to={`/projects/${project.slug}`}>
                    <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden group">
                      <div className="aspect-video w-full overflow-hidden relative">
                        <img
                          src={image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {project.status && (
                          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[project.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                          }`}>
                            {project.status}
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="capitalize">
                            {project.project_type || 'Project'}
                          </Badge>
                          {project.services?.slice(0, 2).map((service, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-xl font-heading font-semibold mb-3">{project.title}</h3>
                        {project.summary && (
                          <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2">
                            {project.summary}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          {project.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span className="truncate max-w-[120px]">{project.location}</span>
                            </div>
                          )}
                          {project.completion_date && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(project.completion_date).getFullYear()}</span>
                            </div>
                          )}
                        </div>
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
