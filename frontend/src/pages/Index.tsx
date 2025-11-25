import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  { label: "Projects Completed", value: "150+", icon: Target },
  { label: "Years Experience", value: "15+", icon: Award },
  { label: "Expert Engineers", value: "50+", icon: Users },
  { label: "Countries Served", value: "12+", icon: Building2 },
];

const Index = () => {
  return (
    <div className="flex flex-col">
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
        
        <div className="container relative z-10 mx-auto px-4 py-24 lg:px-8">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl font-heading font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              Infrastructure For Modern Africa
            </h1>
            <p className="text-xl text-white/90 font-body mb-4">
              Empowering communities, industries, and nations through smart, sustainable engineering and renewable energy solutions built for Africa's future.
            </p>
            <p className="text-lg text-white/80 font-body mb-8 max-w-2xl">
              Fortium Africa is a trusted Engineering, Procurement, and Construction (EPC) firm in Kenya committed to shaping Africa's future through renewable energy, solar EPC Kenya and infrastructure development solutions. From solar PV Africa projects to water systems and civil works, we design and deliver projects that drive economic growth, efficiency, and sustainability across the continent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
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

      {/* What We Do Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">What We Do</h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Delivering reliable, sustainable, and expertly engineered solutions across energy, water, and civil infrastructure.
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

      {/* Track Record Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">Achievements in Numbers</h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Note: Fortium to provide the data
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

      {/* Featured Projects Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              See how Fortium Africa's solutions are making a difference:
            </p>
          </div>
          
          <div className="text-center">
            <Link to="/projects">
              <Button size="lg" variant="outline">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Form Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">
                Let's Engineer Africa's Next Chapter
              </h2>
              <p className="text-lg opacity-90 font-body">
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

export default Index;
