import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";
import Logo from "@/assets/FORTIUM WHITE PRIMARY LOGO.svg";
const navigation = {
  company: [
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
  ],
  services: [
    { name: "Solar Energy Solutions", href: "/services#solar" },
    { name: "Engineering & PM", href: "/services#engineering" },
    { name: "Construction Works", href: "/services#construction" },
  ],
  social: [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Twitter", href: "#", icon: Twitter },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
              <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img src={Logo} alt="Fortium Africa" className="h-10 mb-2 object-contain" />
          </Link>
        </div>
            <p className="text-sm font-body mb-5 opacity-90">
              Engineering Progress. Building Africa's Sustainable Future.
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:info@fortiumafrica.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
                info@fortiumafrica.com
              </a>
              <a href="tel:+254796920233" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                +254 796 920 233
              </a>
              <a href="tel:+254715533111" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                +254 715 533 111
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4 mb-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-secondary-foreground hover:text-accent transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <Link to="/contact">
              <button className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity">
                Get In Touch
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/20">
          <p className="text-center text-sm opacity-75">
            © {new Date().getFullYear()} Fortium Africa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
