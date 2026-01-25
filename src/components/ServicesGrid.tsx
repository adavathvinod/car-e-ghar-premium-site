import { Link } from 'react-router-dom';

// Import service images
import foamWashImg from '@/assets/services/foam-wash.jpg';
import detailingImg from '@/assets/services/detailing.jpg';
import ppfImg from '@/assets/services/ppf.jpg';
import teflonImg from '@/assets/services/teflon.jpg';
import ceramicImg from '@/assets/services/ceramic.jpg';
import sunfilmImg from '@/assets/services/sunfilm.jpg';
import mattingImg from '@/assets/services/matting.jpg';
import paintingImg from '@/assets/services/painting.jpg';
import waxImg from '@/assets/services/wax.jpg';
import windshieldImg from '@/assets/services/windshield.jpg';
import tarRemovalImg from '@/assets/services/tar-removal.jpg';
import headlightImg from '@/assets/services/headlight.jpg';
import acDisinfectImg from '@/assets/services/ac-disinfect.jpg';
import dentingImg from '@/assets/services/denting.jpg';

const services = [
  { 
    name: 'Car Foam Wash', 
    description: 'Premium foam wash for a spotless clean', 
    image: foamWashImg,
    price: '₹299',
    priceNote: 'onwards'
  },
  { 
    name: 'Interior & Exterior Detailing', 
    description: 'Complete detailing for a showroom finish', 
    image: detailingImg,
    price: '₹1,999',
    priceNote: 'onwards'
  },
  { 
    name: 'Paint Protection Film (PPF)', 
    description: 'Ultimate protection against scratches & chips', 
    image: ppfImg,
    price: '₹15,000',
    priceNote: 'onwards'
  },
  { 
    name: 'Teflon Coating', 
    description: 'Long-lasting shine and protection', 
    image: teflonImg,
    price: '₹1,499',
    priceNote: 'onwards'
  },
  { 
    name: 'Ceramic Coating', 
    description: 'Premium nano-ceramic protection', 
    image: ceramicImg,
    price: '₹8,999',
    priceNote: 'onwards'
  },
  { 
    name: 'Sun Films', 
    description: 'Heat rejection & UV protection', 
    image: sunfilmImg,
    price: '₹2,499',
    priceNote: 'onwards'
  },
  { 
    name: 'Full Matting', 
    description: 'Custom floor mats for your vehicle', 
    image: mattingImg,
    price: '₹1,999',
    priceNote: 'onwards'
  },
  { 
    name: 'Car Painting', 
    description: 'Professional paint jobs & touch-ups', 
    image: paintingImg,
    price: '₹5,000',
    priceNote: 'per panel'
  },
  { 
    name: 'Wax Application', 
    description: 'Premium wax for lasting shine', 
    image: waxImg,
    price: '₹799',
    priceNote: 'onwards'
  },
  { 
    name: 'Windshield Restoration', 
    description: 'Crystal clear visibility', 
    image: windshieldImg,
    price: '₹999',
    priceNote: 'onwards'
  },
  { 
    name: 'Tar Removal', 
    description: 'Deep cleaning for stubborn contaminants', 
    image: tarRemovalImg,
    price: '₹499',
    priceNote: 'onwards'
  },
  { 
    name: 'Headlight Restoration', 
    description: 'Restore clarity & brightness', 
    image: headlightImg,
    price: '₹599',
    priceNote: 'per pair'
  },
  { 
    name: 'AC Disinfector', 
    description: 'Fresh & clean air circulation', 
    image: acDisinfectImg,
    price: '₹399',
    priceNote: 'onwards'
  },
  { 
    name: 'Denting & Painting', 
    description: 'Expert body repair services', 
    image: dentingImg,
    price: '₹2,500',
    priceNote: 'per panel'
  },
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
          {displayedServices.map((service, index) => (
            <div
              key={service.name}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-primary-foreground font-bold text-sm">{service.price}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {service.priceNote}
                  </span>
                  <a 
                    href="tel:08977041344"
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Book Now →
                  </a>
                </div>
              </div>
            </div>
          ))}
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
