import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

const Contact = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-deep-navy to-primary py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl font-heading font-bold text-white sm:text-5xl mb-6">
              Let's Engineer Africa's Sustainable Future Together
            </h1>
            <p className="text-xl text-white/90 font-body">
              Get in touch with our team to discuss your infrastructure needs
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-8">Get In Touch</h2>
              
              <div className="space-y-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold mb-2">Email</h3>
                        <a href="mailto:info@fortiumafrica.com" className="text-muted-foreground hover:text-primary transition-colors font-body">
                          info@fortiumafrica.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold mb-2">Phone</h3>
                        <div className="space-y-1">
                          <a href="tel:+254796920233" className="block text-muted-foreground hover:text-primary transition-colors font-body">
                            +254 796 920 233
                          </a>
                          <a href="tel:+254715533111" className="block text-muted-foreground hover:text-primary transition-colors font-body">
                            +254 715 533 111
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold mb-2">Office Location</h3>
                        <p className="text-muted-foreground font-body">
                          Nairobi, Kenya<br />
                          <a href="mailto:info@fortiumafrica.com" className="hover:text-primary transition-colors">
                            info@fortiumafrica.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-accent/10 border-accent">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold mb-2">WhatsApp Chat</h3>
                        <a 
                          href="https://wa.me/254796920233" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors font-body font-medium"
                        >
                          Start a conversation →
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Business Hours */}
              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-heading font-semibold mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm font-body">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday:</span>
                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday:</span>
                    <span className="font-medium">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-muted rounded-lg p-8">
                <h2 className="text-2xl font-heading font-bold mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-background border">
            <iframe
              title="Fortium Africa Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.858855793682!2d36.81722331504591!3d-1.2863899990626164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d4a1f5e9f9%3A0x7f5c2c4e9b2a8b!2sNairobi%20CBD%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
