import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { Sun, Droplet, Building, Users, Award, Target } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import heroImage from "@/assets/hero-home.jpg";
import logo1 from "@/assets/EN-UNHCR-White.svg"
import logo2 from "@/assets/GivePowergrey2_r.png"
import logo3 from "@/assets/KeRRA Logo.png"
import logo4 from "../assets/Mercy_Corps_Logo-removebg-preview.png"
import logo5 from "../assets/Renewable World Logo.png"
import logo6 from "../assets/UNHCR LOGO.png"

const services = [
  {
    title: "Energy Solutions",
    description: "Solar PV Systems, Mini-grids, and Energy Efficiency Solutions.",
    icon: Sun,
    link: "/services#solar",
  },
  {
    title: "Water Infrastructure",
    description: "Solar water pumping, irrigation, and desalination systems for sustainable access.",
    icon: Droplet,
    link: "/services#water",
  },
  {
    title: "Civil & Structural Works",
    description: "Design, construction, and management of resilient infrastructure.",
    icon: Building,
    link: "/services#construction",
  },
];

const stats = [
  { label: "Projects Completed", value: "30+", icon: Target },
  { label: "Years Experience", value: "7+", icon: Award },
  { label: "Expert Engineers", value: "5+", icon: Users },
  { label: "Countries Served", value: "5+", icon: Building },
];

const partners = [
  { name: "Partner 1", logo: logo1 },
  { name: "Partner 2", logo: logo2 },
  { name: "Partner 3", logo: logo3 },
  { name: "Partner 4", logo: logo4 },
  { name: "Partner 5", logo: logo5 },
  { name: "Partner 6", logo: logo6 },
]

const Home = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!carouselApi) return;

    const id = setInterval(() => {
      try {
        carouselApi.scrollNext();
      } catch (e) {
        // ignore
      }
    }, 3000);

    return () => clearInterval(id);
  }, [carouselApi]);

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Modern African Infrastructure" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/95 to-deep-navy/70" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 py-24 lg:px-8 text-center">
          <div className="max-w-3xl animate-fade-in mx-auto">
            <h1 className="text-5xl font-heading font-bold text-accent sm:text-5xl lg:text-6xl mb-6">
              Infrastructure For Modern Africa
            </h1>
            {/* <p className="text-3xl text-white/90 font-body mb-4">
              Empowering communities, industries, and nations through smart, sustainable engineering and renewable energy solutions built for Africa's future.
            </p> */}
            <p className="text-lg text-white/80 font-body mb-8 mx-auto max-w-2xl">
              Fortium Africa is a trusted Engineering, Procurement, and Construction (EPC) firm in Kenya committed to shaping Africa's future through renewable energy, solar EPC Kenya and infrastructure development solutions. From solar PV Africa projects to water systems and civil works, we design and deliver projects that drive economic growth, efficiency, and sustainability across the continent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/about-us">
                <Button size="lg" variant="secondary">
                  Learn More
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">What We Do</h2>
            {/* <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Delivering reliable, sustainable, and expertly engineered solutions across energy, water, and civil infrastructure.
            </p> */}
            <p className="text-lg text-muted-foreground font-body max-w-6xl mx-auto">
              Fortium Africa is a multidisciplinary engineering firm equipped with the resources, experience, and expertise to deliver a comprehensive range of services across the energy, water, and civil infrastructure sectors.
We offer end-to-end EPC solutions in planning, design, construction, contract supervision, and project management  ensuring that every phase of a project is executed with precision, professionalism, and long-term sustainability in mind.

            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Link key={index} to={service.link}>
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-deep-navy">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground font-body">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="py-20 bg-deep-navy text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">Our Track Record</h2>
            <p className="text-lg text-white/80 font-body max-w-2xl mx-auto">
              Our achievements speak for themselves
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Row 1 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Users className="h-10 w-10 text-accent" />
              </div>
              <span className="text-2xl font-bold mb-1">8Yrs</span>
              <span className="text-sm">Operations</span>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M12 12h.01" />
                  <path d="M17 12h.01" />
                  <path d="M7 12h.01" />
                </svg>
              </div>
              <span className="text-2xl font-bold mb-1">5+</span>
              <span className="text-sm">Mini-Grids</span>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Sun className="h-10 w-10 text-accent" />
              </div>
              <span className="text-2xl font-bold mb-1">1 Mw</span>
              <span className="text-sm">Off-grid Solar</span>
            </div>
            
            {/* Row 2 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <path d="M3 6h18" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <span className="text-2xl font-bold mb-1">8+</span>
              <span className="text-sm">Desalination Plants</span>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="M4.93 4.93l2.83 2.83" />
                  <path d="M16.24 16.24l2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="M4.93 19.07l2.83-2.83" />
                  <path d="M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <span className="text-2xl font-bold mb-1">28</span>
              <span className="text-sm">Acres Solar Irrigation</span>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <path d="M21 12H3" />
                  <path d="M6 20V4" />
                  <path d="M18 20V4" />
                  <path d="M12 20V4" />
                </svg>
              </div>
              <span className="text-2xl font-bold mb-1">6km</span>
              <span className="text-sm">Bitumen Standard Road</span>
            </div>
          </div>
        </div>
      </section>
      {/* Clients */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">Our Clients</h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Fortium Africa partners with forward-thinking clients, developers, and organizations. We take pride in delivering reliable, high-quality solutions that empower our clients to achieve their goals and create lasting impact.
            </p>
          </div>
          
            <div className="mb-12">
              <Carousel
                setApi={setCarouselApi}
                opts={{
                  align: "center",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {partners.map((partner, index) => (
                    <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                      <div className="flex items-center justify-center h-[120px] bg-muted rounded-lg p-4">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

          <div className="text-center">
            <p className="text-muted-foreground font-body">
              Join the growing list of organizations transforming Africa's infrastructure with Fortium Africa.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 ">
              <Link to="/contact">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 ">
                  Request a Quote
                </Button>
              </Link>
            </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">Featured Projects</h2>
            <p className="text-lg text-white/90 font-body max-w-2xl mx-auto">
              See how Fortium Africa's solutions are making a difference:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Energy Project */}
            <Link to="/projects" className="group relative block h-80 overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10 transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-0 flex items-end p-6 z-20">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Kakuma Solar Farm</h3>
                  <p className="text-accent font-medium mb-2">Phase: Construction</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">Design</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">Procurement</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">Construction</span>
                  </div>
                  <p className="text-white/90 text-sm">1.2 MWp Solar PV System</p>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000" 
                alt="Solar Farm Project"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            {/* Water Project */}
            <Link to="/projects" className="group relative block h-80 overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10 transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-0 flex items-end p-6 z-20">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Lodwar Water Supply</h3>
                  <p className="text-accent font-medium mb-2">Phase: Operational</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">Feasibility</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">Design</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">Implementation</span>
                  </div>
                  <p className="text-white/90 text-sm">10,000LPH Desalination Plant</p>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000" 
                alt="Water Supply Project"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            {/* Civil Project */}
            <Link to="/projects" className="group relative block h-80 overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10 transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-0 flex items-end p-6 z-20">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Nanyuki Industrial Park</h3>
                  <p className="text-accent font-medium mb-2">Phase: Design</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">Site Survey</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">Design</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">Supervision</span>
                  </div>
                  <p className="text-white/90 text-sm">5km Access Road & Drainage</p>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000" 
                alt="Civil Works Project"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </div>

          <div className="text-center">
            <Link to="/projects">
              <Button size="lg" variant="outline" className="bg-transparent border-white/20 hover:bg-white/10 hover:text-white">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Form Section */}
      <section className="py-12 bg-muted text-secondary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-heading font-bold sm:text-3xl mb-3 text-black">
                Let's Engineer Africa's Next Chapter
              </h2>
              <p className="text-base font-body text-gray-600">
                Partner with Fortium Africa to transform your vision into reality with our sustainable solutions.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
