import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowLeft } from "lucide-react";
import projectsHero from "@/assets/projects-hero.jpg";

// Project data
const projectsData: Record<string, any> = {
  "solar-commercial-nairobi": {
    name: "Commercial Solar Installation - Nairobi",
    sector: "Solar Energy",
    location: "Nairobi, Kenya",
    capacity: "500 kWp",
    image: projectsHero,
    background: "A leading commercial complex in Nairobi required a reliable, sustainable power solution to reduce energy costs and carbon footprint while ensuring uninterrupted operations.",
    challenge: "High electricity costs, frequent power outages, and the need to meet corporate sustainability targets while maintaining 24/7 operations for tenants.",
    solution: "We designed and installed a 500 kWp grid-tied solar PV system with smart monitoring, optimized for the building's energy consumption patterns. The system includes inverters with grid-support capabilities and real-time performance tracking.",
    results: [
      "60% reduction in grid electricity consumption",
      "Annual savings of $85,000 in energy costs",
      "280 tons of CO2 emissions avoided annually",
      "ROI period of 4.5 years",
      "99.8% system uptime over 12 months",
    ],
  },
  "water-treatment-kampala": {
    name: "Water Treatment Facility - Kampala",
    sector: "Water Infrastructure",
    location: "Kampala, Uganda",
    capacity: "10,000 m³/day",
    image: projectsHero,
    background: "Growing urban population in Kampala required expansion of water treatment capacity to ensure clean, safe drinking water for 50,000+ residents.",
    challenge: "Limited existing infrastructure, strict water quality standards, and need for energy-efficient operation in a region with unreliable power supply.",
    solution: "Complete design and construction of a modern water treatment plant featuring multi-stage filtration, UV disinfection, and solar-powered pumping systems. Automated control systems ensure optimal treatment efficiency.",
    results: [
      "10,000 m³/day clean water production",
      "Serves 50,000+ residents",
      "Exceeds WHO water quality standards",
      "40% energy cost reduction via solar integration",
      "Remote monitoring capabilities",
    ],
  },
  "civil-works-dar": {
    name: "Infrastructure Development - Dar es Salaam",
    sector: "Civil Engineering",
    location: "Dar es Salaam, Tanzania",
    capacity: "5km road network",
    image: projectsHero,
    background: "Urban expansion required new road infrastructure to connect residential areas with commercial districts, improving accessibility and economic activity.",
    challenge: "Complex terrain, existing utility networks, tight timeline, and need to minimize disruption to existing traffic and businesses.",
    solution: "Comprehensive civil engineering project including road construction, drainage systems, street lighting, and landscaping. Phased construction approach minimized traffic disruption.",
    results: [
      "5km of new road infrastructure",
      "Improved connectivity for 30,000+ residents",
      "Completed 2 weeks ahead of schedule",
      "Zero safety incidents",
      "Enhanced local economic activity",
    ],
  },
  "solar-hybrid-kigali": {
    name: "Solar-Diesel Hybrid System - Kigali",
    sector: "Solar Energy",
    location: "Kigali, Rwanda",
    capacity: "750 kWp + 500 kWh BESS",
    image: projectsHero,
    background: "Industrial facility required reliable power with reduced diesel dependency and lower operational costs while maintaining production continuity.",
    challenge: "Unpredictable grid availability, high diesel costs, need for seamless power switching, and requirement for 24/7 operations without interruption.",
    solution: "Integrated solar-diesel hybrid system with battery storage (BESS) featuring intelligent load management, automated switching, and predictive maintenance capabilities.",
    results: [
      "75% reduction in diesel consumption",
      "Annual fuel savings of $120,000",
      "Zero production downtime",
      "3.8-year ROI period",
      "Remote system monitoring and control",
    ],
  },
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsData[id] : null;

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">Project Not Found</h1>
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
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/70 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 pb-12 lg:px-8">
          <Link to="/projects" className="inline-flex items-center gap-2 text-white mb-6 hover:text-accent transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-body">Back to Projects</span>
          </Link>
          <Badge className="mb-4">{project.sector}</Badge>
          <h1 className="text-4xl font-heading font-bold text-white sm:text-5xl mb-4">
            {project.name}
          </h1>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="h-5 w-5" />
            <span className="text-lg font-body">{project.location}</span>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Background */}
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold mb-4 text-primary">Background</h2>
            <p className="text-lg font-body text-foreground leading-relaxed">
              {project.background}
            </p>
          </div>

          {/* Challenge */}
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold mb-4 text-primary">Challenge</h2>
            <p className="text-lg font-body text-foreground leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold mb-4 text-primary">Our Solution</h2>
            <p className="text-lg font-body text-foreground leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Results */}
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold mb-4 text-primary">Results & Impact</h2>
            <ul className="space-y-3">
              {project.results.map((result: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-lg font-body text-foreground">{result}</span>
                </li>
              ))}
            </ul>
          </div>

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
