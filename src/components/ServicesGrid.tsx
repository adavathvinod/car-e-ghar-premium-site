import { 
  Droplets, 
  Sparkles, 
  Shield, 
  Paintbrush, 
  Car, 
  Sun, 
  Layers, 
  Palette,
  Wind,
  CircleDot,
  Lightbulb,
  Snowflake,
  Wrench,
  SprayCan
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { icon: Droplets, name: 'Car Foam Wash', description: 'Premium foam wash for a spotless clean' },
  { icon: Sparkles, name: 'Interior & Exterior Detailing', description: 'Complete detailing for a showroom finish' },
  { icon: Shield, name: 'Paint Protection Film (PPF)', description: 'Ultimate protection against scratches & chips' },
  { icon: Layers, name: 'Teflon Coating', description: 'Long-lasting shine and protection' },
  { icon: CircleDot, name: 'Ceramic Coating', description: 'Premium nano-ceramic protection' },
  { icon: Sun, name: 'Sun Films', description: 'Heat rejection & UV protection' },
  { icon: Car, name: 'Full Matting', description: 'Custom floor mats for your vehicle' },
  { icon: Palette, name: 'Car Painting', description: 'Professional paint jobs & touch-ups' },
  { icon: SprayCan, name: 'Wax Application', description: 'Premium wax for lasting shine' },
  { icon: Wind, name: 'Windshield Restoration', description: 'Crystal clear visibility' },
  { icon: Paintbrush, name: 'Tar Removal', description: 'Deep cleaning for stubborn contaminants' },
  { icon: Lightbulb, name: 'Headlight Restoration', description: 'Restore clarity & brightness' },
  { icon: Snowflake, name: 'AC Disinfector', description: 'Fresh & clean air circulation' },
  { icon: Wrench, name: 'Denting & Painting', description: 'Expert body repair services' },
];

interface ServicesGridProps {
  showAll?: boolean;
}

const ServicesGrid = ({ showAll = false }: ServicesGridProps) => {
  const displayedServices = showAll ? services : services.slice(0, 8);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="text-gradient-gold">OUR SERVICES</span>
          </h2>
          <p className="section-subtitle">
            Complete car care solutions from basic wash to premium protection. 
            We use only the best products and techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className="service-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {!showAll && (
          <div className="text-center mt-12">
            <Link to="/services" className="btn-outline-gold rounded-full">
              View All Services
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;
