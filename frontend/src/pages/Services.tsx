import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sun, Battery, Droplet, Wrench, Building, LineChart } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import servicesHero from "@/assets/services-hero.jpg";

const Services = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={servicesHero} 
            alt="Engineering Services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/95 to-deep-navy/70" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 py-24 lg:px-8">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl font-heading font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              Our Services
            </h1>
            <p className="text-xl text-white/90 font-body">
              Explore Fortium Africa's solar EPC, energy, and engineering services driving sustainable development across Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Solar Energy Solutions */}
      <section id="solar" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-lg bg-deep-navy flex items-center justify-center">
                <Sun className="h-6 w-6 text-accent" />
              </div>
              <h2 className="text-3xl font-heading font-bold">Solar Energy Solutions</h2>
            </div>
            <p className="text-lg text-muted-foreground font-body max-w-3xl">
              As a trusted Solar EPC company in Kenya, Fortium Africa delivers reliable renewable energy systems that power homes, industries, and institutions sustainably. We design and build efficient solar PV, hybrid, and energy storage solutions that promote energy independence, cost savings, and a cleaner future for communities across Africa.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full max-w-4xl">
            <AccordionItem value="solar-pv">
              <AccordionTrigger className="text-lg font-heading">
                Solar PV Systems & BESS
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body space-y-4">
                <p>Fortium Africa specializes in the design, engineering, and installation of Solar PV and hybrid systems that deliver clean, reliable, and cost‑effective energy. Whether grid‑tied, off‑grid, or hybrid, our systems are built for optimal efficiency and long‑term performance. By integrating Battery Energy Storage Solutions (BESS), we ensure consistent power availability even during outages or low‑sunlight periods. Our solutions empower homes, industries, and institutions to achieve energy independence, reduce operational costs, and contribute to a sustainable, low‑carbon future.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="solar-pumping">
              <AccordionTrigger className="text-lg font-heading">
                Solar Water Pumping & Irrigation Systems
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body space-y-4">
                <p className="font-semibold">Reliable and sustainable pumping systems designed for both submersible and surface applications.</p>
                <p>Solar water pumps are fast becoming the equipment of choice for pumping applications in off‑grid areas that were previously powered by traditional fossil fuel generators. Our solar systems are used across the board including for community water supplies, small and large scale irrigation.</p>
                <p>Our solar pumping offers reliable and sustainable solar water pumping systems for Submersible and surface water pumping applications.</p>
                <p>With the pressure heads of up to 400m and flow capacity of up to 200m3/hr solar pumping system offers flexible designs with ability to expand the output and provision to incorporate hybrid systems utilizing solar with either grid power, generator or wind power system which allows for system automation.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mini-grids">
              <AccordionTrigger className="text-lg font-heading">
                Mini-Grid Systems
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body space-y-4">
                <p className="font-semibold">Community‑scale power solutions that include GIS design, surveying, revenue modeling, and complete EPC delivery.</p>
                <p>Fortium Africa designs and builds reliable community‑scale mini‑grids that bring clean, affordable electricity to remote and off‑grid areas. From GIS mapping, community surveys, and system design to construction and maintenance, we deliver complete EPC solutions that empower rural development. Our expert project managers ensure timely, cost‑effective implementation, while our dedicated technicians provide ongoing support to guarantee long‑term reliability and community satisfaction.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Engineering & Project Management */}
      <section id="engineering" className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-lg bg-deep-navy flex items-center justify-center">
                <LineChart className="h-6 w-6 text-accent" />
              </div>
              <h2 className="text-3xl font-heading font-bold">Engineering & Project Management Services</h2>
            </div>
            <p className="text-xl text-muted-foreground font-body max-w-3xl font-semibold mb-4">
              Engineering Precision. Managed to Perfection.
            </p>
            <p className="text-lg text-muted-foreground font-body max-w-3xl">
              Fortium Africa combines technical excellence with strategic project management to deliver high‑performing engineering solutions that meet global standards. Our multidisciplinary team of engineers, designers, and project managers ensures every phase from feasibility and design to execution and commissioning is completed on time, within budget, and to the highest quality standards.
            </p>
          </div>

          <div className="mb-12 max-w-4xl">
            <h3 className="text-2xl font-heading font-bold mb-4">Our Approach</h3>
            <p className="text-muted-foreground font-body">
              We leverage modern project management tools and methodologies to streamline workflows, manage risk, and enhance collaboration throughout the project lifecycle. Whether in energy, infrastructure, or civil works, our approach ensures precision, safety, and sustainability in every development.
            </p>
          </div>

          <h3 className="text-2xl font-heading font-bold mb-8">Key Offerings</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <Wrench className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Engineering Design, Procurement & Documentation</h3>
                <p className="text-muted-foreground font-body text-sm">
                  Detailed feasibility studies, system design, technical specifications, and comprehensive project documentation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Building className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Technical Investigations & Reporting</h3>
                <p className="text-muted-foreground font-body text-sm">
                  Site assessments, surveys, environmental impact studies, and regulatory compliance reporting.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <LineChart className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Construction Supervision & Project Management</h3>
                <p className="text-muted-foreground font-body text-sm">
                  On-site supervision, quality control, timeline and budget management, and stakeholder coordination.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Wrench className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Project Planning & Development</h3>
                <p className="text-muted-foreground font-body text-sm">
                  Strategic planning, formulation of project briefs, and development of execution roadmaps.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Construction Works */}
      <section id="construction" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-lg bg-deep-navy flex items-center justify-center">
                <Building className="h-6 w-6 text-accent" />
              </div>
              <h2 className="text-3xl font-heading font-bold">Construction Works</h2>
            </div>
            <p className="text-lg text-muted-foreground font-body max-w-3xl">
              Fortium Africa delivers professional construction services across energy, water, and civil infrastructure projects, ensuring quality, safety, and sustainability at every stage.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <Droplet className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-2xl font-heading font-semibold mb-4">Water Infrastructure</h3>
                <ul className="space-y-3 text-muted-foreground font-body">
                  <li>• Water treatment plants</li>
                  <li>• Distribution networks</li>
                  <li>• Wastewater management</li>
                  <li>• Pumping stations</li>
                  <li>• Storage reservoirs</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <Building className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-2xl font-heading font-semibold mb-4">Civil Works</h3>
                <ul className="space-y-3 text-muted-foreground font-body">
                  <li>• Roads and bridges</li>
                  <li>• Building construction</li>
                  <li>• Site development</li>
                  <li>• Structural works</li>
                  <li>• Landscaping</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">Why Choose Fortium Africa</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <div className="p-6 bg-background border border-border rounded-lg">
              <h3 className="font-heading font-semibold mb-2 text-primary">Expert Team</h3>
              <p className="text-muted-foreground font-body">50+ certified engineers and technicians</p>
            </div>
            <div className="p-6 bg-background border border-border rounded-lg">
              <h3 className="font-heading font-semibold mb-2 text-primary">Quality Guaranteed</h3>
              <p className="text-muted-foreground font-body">ISO-certified processes and materials</p>
            </div>
            <div className="p-6 bg-background border border-border rounded-lg">
              <h3 className="font-heading font-semibold mb-2 text-primary">On-Time Delivery</h3>
              <p className="text-muted-foreground font-body">98% on-schedule project completion rate</p>
            </div>
            <div className="p-6 bg-background border border-border rounded-lg">
              <h3 className="font-heading font-semibold mb-2 text-primary">Comprehensive Support</h3>
              <p className="text-muted-foreground font-body">24/7 maintenance and technical assistance</p>
            </div>
            <div className="p-6 bg-background border border-border rounded-lg">
              <h3 className="font-heading font-semibold mb-2 text-primary">Competitive Pricing</h3>
              <p className="text-muted-foreground font-body">Best value without compromising quality</p>
            </div>
            <div className="p-6 bg-background border border-border rounded-lg">
              <h3 className="font-heading font-semibold mb-2 text-primary">Sustainability First</h3>
              <p className="text-muted-foreground font-body">Environmentally responsible solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg opacity-90 font-body">
                Contact us to discuss your project requirements
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

export default Services;
