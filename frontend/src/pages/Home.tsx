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
import { Sun, Droplet, Building2, Users, Award, Target } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import heroImage from "@/assets/hero-home.jpg";

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
    icon: Building2,
    link: "/services#construction",
  },
];

const stats = [
  { label: "Projects Completed", value: "30+", icon: Target },
  { label: "Years Experience", value: "7+", icon: Award },
  { label: "Expert Engineers", value: "5+", icon: Users },
  { label: "Countries Served", value: "5+", icon: Building2 },
];

const partners = [
  { name: "Partner 1", logo: "https://via.placeholder.com/200x100?text=Partner+1" },
  { name: "Partner 2", logo: "https://via.placeholder.com/200x100?text=Partner+2" },
  { name: "Partner 3", logo: "https://via.placeholder.com/200x100?text=Partner+3" },
  { name: "Partner 4", logo: "https://via.placeholder.com/200x100?text=Partner+4" },
  { name: "Partner 5", logo: "https://via.placeholder.com/200x100?text=Partner+5" },
  { name: "Partner 6", logo: "https://via.placeholder.com/200x100?text=Partner+6" },
];

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
            <h1 className="text-5xl font-heading font-bold text-white sm:text-5xl lg:text-6xl mb-6">
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
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <service.icon className="h-6 w-6 text-primary" />
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
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">Achievements in Numbers</h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
             
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-body">{stat.label}</div>
              </div>
            ))}
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
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">Featured Projects</h2>
            <p className="text-lg text-white font-body max-w-2xl mx-auto">
              See how Fortium Africa's solutions are making a difference:
            </p>
          </div>
          
          <div className="text-center text-black">
            <Link to="/projects">
              <Button size="lg" variant="outline">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Form Section */}
      <section className="py-20 bg-muted text-secondary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4 text-black">
                Let's Engineer Africa's Next Chapter
              </h2>
              <p className="text-lg opacity-90 font-body text-gray-600">
                Partner with Fortium Africa to transform your vision into reality. Whether you're planning a renewable energy project, water infrastructure, or civil engineering development, our team is ready to deliver innovative, sustainable solutions tailored to your needs.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
