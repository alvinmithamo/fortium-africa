import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import projectsHero from "@/assets/projects-hero.jpg";
import { apiUrl } from "@/lib/api";
import { demoProjects } from "@/data/demoProjects";
import { Project } from "@/types/project";
import img1 from "../assets/projects/MCWT/MWCT-4.jpg"
import img2 from "../assets/projects/MCWT/MWCT-10.jpg"
import img3 from "../assets/projects/MCWT/MWCT-22.jpg"
import img4 from "../assets/projects/MCWT/MWCT-24.jpg"
// Gallery images - replace these with your actual image imports
const galleryImages = [
 img1, img2, img3, img4
];

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

        const demoProject = demoProjects.find(p => p.slug === slug);
        if (demoProject) {
          setProject(demoProject);
          setLoading(false);
          return;
        }

        const res = await fetch(apiUrl(`/api/projects/${slug}`));
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
      {/* Hero Section with Project Title */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={project.image_url || projectsHero}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 pb-16 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <div className="inline-block bg-[#F6A229] px-4 py-1 mb-4">
                <span className="text-white font-semibold">Agricultural</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {project.title}
              </h1>
            </div>
            <Link 
              to="/projects" 
              className="flex items-center gap-2 text-white hover:text-[#F6A229] transition-colors border border-white/30 hover:border-[#F6A229] px-6 py-3 rounded-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Projects</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Project Details */}
            <div className="lg:col-span-1">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-4">Date</h3>
                <p className="text-gray-900">2023</p>
              </div>
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-4">Location</h3>
                <p className="text-gray-900">Kenya</p>
              </div>
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-4">Product</h3>
                <p className="text-gray-900">Solar PV</p>
              </div>
              <div className="pb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-4">Service</h3>
                <p className="text-gray-900">EPC</p>
              </div>
            </div>

            {/* Right Column - Project Description */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Solar PV Plant</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  The Aqunion Romansbaai project is a 1.2MW solar PV plant developed by Fortium Africa in partnership with Aqunion, a leading South African agricultural company. This project represents a significant step forward in sustainable energy solutions for the agricultural sector.
                </p>
                <p className="mb-4">
                  The solar plant features state-of-the-art photovoltaic technology, designed to maximize energy production while minimizing environmental impact. The system is expected to generate approximately 2,200 MWh of clean energy annually, significantly reducing the farm's carbon footprint and operational costs.
                </p>
                <p className="mb-4">
                  Our team handled the entire project lifecycle, from initial feasibility studies and system design to engineering, procurement, and construction (EPC). The plant was commissioned in 2023 and has been operating at peak efficiency since its launch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Interested in a Similar Project?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help with your renewable energy needs. Our team of experts is ready to bring sustainable solutions to your business.
          </p>
          <Link to="/contact">
            <Button className="bg-[#F6A229] hover:bg-[#e6951d] text-white px-8 py-6 text-lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
