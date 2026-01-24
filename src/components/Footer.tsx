import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Instagram, Mail } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Car Foam Wash',
    'Interior Detailing',
    'Ceramic Coating',
    'Paint Protection Film',
    'Teflon Coating',
    'Denting & Painting',
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <img src={logo} alt="Car-e-Ghar" className="h-16 w-auto" />
            <p className="text-muted-foreground leading-relaxed">
              Premium car care services in Secunderabad. Your trusted partner for complete car wash, detailing, and protection.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-primary text-2xl font-bold">★ 4.8</span>
              <span className="text-muted-foreground">Google Rating</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-display tracking-wider mb-6 text-gradient-gold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-display tracking-wider mb-6 text-gradient-gold">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link 
                    to="/services"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-display tracking-wider mb-6 text-gradient-gold">Contact Us</h4>
            <div className="space-y-4">
              <a 
                href="tel:08977041344"
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Phone size={20} className="text-primary mt-1 group-hover:animate-pulse" />
                <span>089770 41344</span>
              </a>
              <a 
                href="https://maps.google.com/?q=28,+Lakshmipuram+Colony,+Sainikpuri,+Secunderabad,+Telangana+500094"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <span>28, Lakshmipuram Colony, Sainikpuri, Secunderabad, Telangana 500094</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <Clock size={20} className="text-primary mt-1" />
                <div>
                  <p>Open Daily</p>
                  <p className="text-primary font-medium">9:00 AM – 8:00 PM</p>
                </div>
              </div>
              <a 
                href="https://www.instagram.com/careghar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={20} className="text-primary" />
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Car-e-Ghar. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Complete Car Care Solution | Secunderabad
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
