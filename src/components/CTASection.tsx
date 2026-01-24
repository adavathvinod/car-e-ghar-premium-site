import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-primary/20 via-card to-primary/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-float">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-wider mb-6">
            READY TO GIVE YOUR CAR A{' '}
            <span className="text-gradient-gold">SHOWROOM SHINE?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Book your appointment today and experience the Car-e-Ghar difference. 
            Premium care at honest prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:08977041344"
              className="btn-primary rounded-full text-lg"
            >
              Call Now: 089770 41344
            </a>
            <Link 
              to="/contact"
              className="btn-outline-gold rounded-full text-lg"
            >
              Book Online
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
