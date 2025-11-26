import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, Users } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import aboutHero from "@/assets/about-hero.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

const values = [
  {
    title: "Pursuit of Excellence",
    description: "We are committed to delivering high‑quality, timely, and precise engineering solutions.",
    icon: Award,
  },
  {
    title: "Professionalism",
    description: "Integrity, honesty, and respect guide every project. We ensure safety, economy, and value for money in all operations.",
    icon: Target,
  },
  {
    title: "Innovation",
    description: "We embrace creativity and adopt modern technology to improve service delivery, supported by continuous training.",
    icon: Eye,
  },
  {
    title: "Customer Focus",
    description: "Our clients are our priority. We strive to understand and exceed their expectations.",
    icon: Users,
  },
  {
    title: "Social Responsibility",
    description: "We are committed to environmental protection, legal compliance, and sustainable development in all our operations.",
    icon: Target,
  },
];
const partners = [
  { name: "Partner 1", logo: "https://via.placeholder.com/200x100?text=Partner+1" },
  { name: "Partner 2", logo: "https://via.placeholder.com/200x100?text=Partner+2" },
  { name: "Partner 3", logo: "https://via.placeholder.com/200x100?text=Partner+3" },
  { name: "Partner 4", logo: "https://via.placeholder.com/200x100?text=Partner+4" },
  { name: "Partner 5", logo: "https://via.placeholder.com/200x100?text=Partner+5" },
  { name: "Partner 6", logo: "https://via.placeholder.com/200x100?text=Partner+6" },
];

const teamMembers = [
  {
    name: "Eng. James Mwangi",
    role: "Managing Director & Lead Engineer",
    bio: "Provides strategic leadership across all EPC projects, ensuring technical excellence and alignment with client objectives across the region.",
  },
  {
    name: "Eng. Grace Njeri",
    role: "Head of Renewable Energy",
    bio: "Leads design and delivery of solar, hybrid and storage solutions, with a focus on reliability, safety and lifecycle performance.",
  },
  {
    name: "Eng. Daniel Otieno",
    role: "Civil & Infrastructure Lead",
    bio: "Oversees planning and execution of water, civil and structural works, integrating sustainability and cost efficiency on every project.",
  },
  {
    name: "Sarah Kendi",
    role: "Projects & Delivery Manager",
    bio: "Coordinates multidisciplinary teams, schedules and budgets to deliver projects on time, within scope, and to the highest quality standards.",
  },
  {
    name: "Michael Banda",
    role: "Commercial & Partnerships Lead",
    bio: "Develops and manages partnerships with developers, utilities and development partners, ensuring long-term value for all stakeholders.",
  },
];

const About = () => {
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
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={aboutHero} 
            alt="Fortium Africa Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/95 to-deep-navy/70" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 py-24 lg:px-8">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl font-heading font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              Engineering Progress. Building Africa's Sustainable Future.
            </h1>
            <p className="text-xl text-white/90 font-body mb-6">
              Driven by innovation, guided by integrity, Fortium Africa is transforming Africa's energy and infrastructure landscape through smart, sustainable engineering.
            </p>
            <p className="text-lg text-white/80 font-body">
              Founded in 2017, Fortium Africa Company is a multi‑disciplinary EPC and engineering firm headquartered in Nairobi, Kenya, with regional operations in Zambia and projects across Tanzania and other African nations. Since inception, Fortium Africa has successfully delivered projects in Kenya, Zambia, and Tanzania, earning recognition for technical precision, sustainability, and client satisfaction.
            </p>
            <p className="text-lg text-white/80 font-body mt-4">
              We provide end‑to‑end engineering solutions, from design and construction to project management and supervision across the energy, water, and civil infrastructure sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-lg text-foreground font-body leading-relaxed">
                To deliver innovative, sustainable, and high‑quality engineering solutions that meet our clients' needs and contribute to Africa's social and economic development.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 text-primary">Our Vision</h2>
              <p className="text-lg text-foreground font-body leading-relaxed">
                To be Africa's leading engineering and energy solutions partner, driving modernization through sustainable infrastructure, innovation, and professionalism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              What Defines Us
            </p>
            <p className="text-base text-muted-foreground font-body max-w-3xl mx-auto mt-2">
              We are guided by values that shape our operations, relationships, and impact across all projects:
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground font-body">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Partners */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">Our Impact Partners</h2>
            <p className="text-lg text-muted-foreground font-body max-w-3xl mx-auto">
              Fortium Africa collaborates with leading partners, developers, and organizations driving renewable energy Africa and sustainable infrastructure development.
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
        </div>
      </section>

      {/* Industries & Clients */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">Industries & Clients We Serve</h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Engineering Solutions for Every Sector
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="p-6 bg-background border border-border rounded-lg">
              <h3 className="font-heading font-semibold mb-2 text-primary">Renewable Energy Developers</h3>
              <p className="text-muted-foreground font-body">Solar EPC projects, hybrid systems, and BESS installations.</p>
            </div>
            <div className="p-6 bg-background border border-border rounded-lg">
              <h3 className="font-heading font-semibold mb-2 text-primary">Government Agencies & Municipalities</h3>
              <p className="text-muted-foreground font-body">Water infrastructure, street lighting, and electrification projects.</p>
            </div>
            <div className="p-6 bg-background border border-border rounded-lg">
              <h3 className="font-heading font-semibold mb-2 text-primary">Private Sector Clients</h3>
              <p className="text-muted-foreground font-body">Commercial buildings, industrial sites, and institutional facilities.</p>
            </div>
            <div className="p-6 bg-background border border-border rounded-lg">
              <h3 className="font-heading font-semibold mb-2 text-primary">NGOs & Development Partners</h3>
              <p className="text-muted-foreground font-body">Sustainable energy and water access projects for rural communities.</p>
            </div>
            <div className="p-6 bg-background border border-border rounded-lg">
              <h3 className="font-heading font-semibold mb-2 text-primary">Homeowners & Estates</h3>
              <p className="text-muted-foreground font-body">Off‑grid solar power and energy efficiency systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">Our Team</h2>
            {/* <p className="text-lg text-muted-foreground font-body max-w-3xl mx-auto mb-4">
              People Behind the Progress
            </p> */}
            <p className="text-base text-muted-foreground font-body max-w-3xl mx-auto">
              Fortium Africa's strength lies in its people, a multidisciplinary team of engineers, project managers, designers, and technical experts who bring together a wealth of experience in each phase of project execution.
            </p>
          </div>
          <div className="text-center mb-8">
            <p className="text-lg font-heading font-semibold mb-4">The Leadership</p>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">
              A cross-functional leadership team guiding strategy, delivery, and innovation across renewable energy, water, and infrastructure projects.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent>
                {teamMembers.map((member, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full shadow-sm border-border/70">
                      <CardContent className="p-6 flex flex-col items-center text-center h-full">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary font-heading text-xl">
                          {member.name
                            .split(" ")
                            .map((part) => part.charAt(0))
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <h3 className="text-xl font-heading font-semibold mb-1">{member.name}</h3>
                        <p className="text-sm uppercase tracking-wide text-primary mb-3">{member.role}</p>
                        <p className="text-sm text-muted-foreground font-body">
                          {member.bio}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-6">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted text-secondary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4 text-black">
                Let's Engineer Africa's Next Chapter
              </h2>
              <p className="text-lg opacity-90 font-body text-black">
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

export default About;
