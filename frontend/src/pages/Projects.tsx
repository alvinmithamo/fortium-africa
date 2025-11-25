import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import projectsHero from "@/assets/projects-hero.jpg";

// Project data
const projects = [
  {
    id: "solar-commercial-nairobi",
    name: "Commercial Solar Installation - Nairobi",
    sector: "Solar Energy",
    location: "Nairobi, Kenya",
    capacity: "500 kWp",
    image: projectsHero,
  },
  {
    id: "water-treatment-kampala",
    name: "Water Treatment Facility - Kampala",
    sector: "Water Infrastructure",
    location: "Kampala, Uganda",
    capacity: "10,000 m³/day",
    image: projectsHero,
  },
  {
    id: "civil-works-dar",
    name: "Infrastructure Development - Dar es Salaam",
    sector: "Civil Engineering",
    location: "Dar es Salaam, Tanzania",
    capacity: "5km road network",
    image: projectsHero,
  },
  {
    id: "solar-hybrid-kigali",
    name: "Solar-Diesel Hybrid System - Kigali",
    sector: "Solar Energy",
    location: "Kigali, Rwanda",
    capacity: "750 kWp + 500 kWh BESS",
    image: projectsHero,
  },
];

const Projects = () => {
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`}>
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-3">{project.sector}</Badge>
                    <h3 className="text-xl font-heading font-semibold mb-2">{project.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-body">{project.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-body">
                      Capacity: {project.capacity}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
