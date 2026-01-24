import { MapPin, Navigation } from 'lucide-react';

const LocationBar = () => {
  return (
    <section className="bg-primary/10 border-y border-primary/20 py-4">
      <div className="container mx-auto px-4">
        <a 
          href="https://maps.google.com/?q=28,+Lakshmipuram+Colony,+Sainikpuri,+Secunderabad,+Telangana+500094"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col md:flex-row items-center justify-center gap-4 text-center group"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-foreground font-medium">Visit Us:</span>
          </div>
          <span className="text-muted-foreground group-hover:text-primary transition-colors">
            28, Lakshmipuram Colony, Sainikpuri, Secunderabad, Telangana 500094
          </span>
          <div className="flex items-center gap-1 text-primary">
            <Navigation className="w-4 h-4" />
            <span className="text-sm font-medium">Get Directions</span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default LocationBar;
