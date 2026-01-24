import { Instagram, Play } from 'lucide-react';

const instagramReels = [
  {
    id: 1,
    embedUrl: 'https://www.instagram.com/reel/DO3vLz5kutW/embed',
    title: 'Premium Car Detailing',
  },
  {
    id: 2,
    embedUrl: 'https://www.instagram.com/reel/DGxiMQHRVDz/embed',
    title: 'Ceramic Coating Process',
  },
  {
    id: 3,
    embedUrl: 'https://www.instagram.com/reel/DSuU0hkEWdp/embed',
    title: 'Interior Deep Clean',
  },
];

const InstagramVideos = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-orange-500/20 px-6 py-2 rounded-full mb-6 border border-pink-500/30">
            <Instagram className="w-5 h-5 text-pink-400" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 font-semibold uppercase tracking-wider text-sm">
              @careghar
            </span>
          </div>
          <h2 className="section-title">
            <span className="text-gradient-gold">WATCH US</span>{' '}
            <span className="text-foreground">IN ACTION</span>
          </h2>
          <p className="section-subtitle">
            Follow our Instagram for the latest car transformations, detailing tips, and behind-the-scenes content
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {instagramReels.map((reel) => (
            <div 
              key={reel.id}
              className="relative group rounded-2xl overflow-hidden border border-border bg-card aspect-[9/16] hover:border-primary/50 transition-all duration-500"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <iframe
                src={reel.embedUrl}
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                allowTransparency
                allow="encrypted-media"
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/careghar/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30"
          >
            <Instagram className="w-5 h-5" />
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramVideos;
