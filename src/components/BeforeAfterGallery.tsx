import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Before images
import beforeWash from '@/assets/gallery/before-wash.jpg';
import beforePPF from '@/assets/gallery/before-ppf.jpg';
import beforeCeramic from '@/assets/gallery/before-ceramic.jpg';
import beforeInterior from '@/assets/gallery/before-interior.jpg';
import beforeHeadlight from '@/assets/gallery/before-headlight.jpg';
import beforeDenting from '@/assets/gallery/before-denting.jpg';

// After images
import afterWash from '@/assets/gallery/after-wash.jpg';
import afterPPF from '@/assets/gallery/after-ppf.jpg';
import afterCeramic from '@/assets/gallery/after-ceramic.jpg';
import afterInterior from '@/assets/gallery/after-interior.jpg';
import afterHeadlight from '@/assets/gallery/after-headlight.jpg';
import afterDenting from '@/assets/gallery/after-denting.jpg';

const beforeAfterItems = [
  {
    title: 'Car Foam Wash',
    before: beforeWash,
    after: afterWash,
    description: 'Deep cleaning removes all dirt and grime'
  },
  {
    title: 'Paint Protection Film (PPF)',
    before: beforePPF,
    after: afterPPF,
    description: 'Ultimate protection against scratches and chips'
  },
  {
    title: 'Ceramic Coating',
    before: beforeCeramic,
    after: afterCeramic,
    description: 'Mirror-like shine with long-lasting protection'
  },
  {
    title: 'Interior Detailing',
    before: beforeInterior,
    after: afterInterior,
    description: 'Complete interior restoration and cleaning'
  },
  {
    title: 'Headlight Restoration',
    before: beforeHeadlight,
    after: afterHeadlight,
    description: 'Crystal clear visibility restored'
  },
  {
    title: 'Denting & Painting',
    before: beforeDenting,
    after: afterDenting,
    description: 'Professional body repair and refinishing'
  },
];

interface BeforeAfterGalleryProps {
  hideHeader?: boolean;
}

const BeforeAfterGallery = ({ hideHeader = false }: BeforeAfterGalleryProps) => {
  const [selectedItem, setSelectedItem] = useState<typeof beforeAfterItems[0] | null>(null);
  const [showAfter, setShowAfter] = useState(false);

  const openLightbox = (item: typeof beforeAfterItems[0]) => {
    setSelectedItem(item);
    setShowAfter(false);
  };

  return (
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {!hideHeader && (
            <div className="text-center mb-16">
              <h2 className="section-title">
                <span className="text-gradient-gold">TRANSFORMATIONS</span>
              </h2>
              <p className="section-subtitle">
                See the difference our services make. Before and after results that speak for themselves.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfterItems.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => openLightbox(item)}
              >
                {/* Card */}
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                  {/* Before/After Images Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* Before Image */}
                    <div className="absolute inset-0 w-1/2 overflow-hidden">
                      <img 
                        src={item.before} 
                        alt={`Before ${item.title}`}
                        className="w-[200%] h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white font-semibold text-xs uppercase">Before</span>
                      </div>
                    </div>
                    
                    {/* After Image */}
                    <div className="absolute inset-0 left-1/2 w-1/2 overflow-hidden">
                      <img 
                        src={item.after} 
                        alt={`After ${item.title}`}
                        className="w-[200%] h-full object-cover object-right transition-transform duration-700 group-hover:scale-105"
                        style={{ marginLeft: '-100%' }}
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white font-semibold text-xs uppercase">After</span>
                      </div>
                    </div>

                    {/* Divider Line */}
                    <div className="absolute inset-y-0 left-1/2 w-1 bg-primary -translate-x-1/2 z-10">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <ChevronLeft size={12} className="text-primary-foreground -ml-0.5" />
                        <ChevronRight size={12} className="text-primary-foreground -mr-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                    <span className="inline-block mt-3 text-primary text-sm font-medium">
                      Click to view full comparison →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button 
            className="absolute top-4 right-4 p-2 text-foreground hover:text-primary transition-colors z-20"
            onClick={() => setSelectedItem(null)}
          >
            <X size={32} />
          </button>
          
          <div 
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-display text-gradient-gold mb-2">
                {selectedItem.title}
              </h3>
              <p className="text-muted-foreground">{selectedItem.description}</p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  !showAfter 
                    ? 'bg-red-500 text-white' 
                    : 'bg-card text-muted-foreground hover:text-foreground border border-border'
                }`}
                onClick={() => setShowAfter(false)}
              >
                BEFORE
              </button>
              <button
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  showAfter 
                    ? 'bg-green-500 text-white' 
                    : 'bg-card text-muted-foreground hover:text-foreground border border-border'
                }`}
                onClick={() => setShowAfter(true)}
              >
                AFTER
              </button>
            </div>

            {/* Image */}
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={showAfter ? selectedItem.after : selectedItem.before}
                alt={`${showAfter ? 'After' : 'Before'} ${selectedItem.title}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className={`absolute top-4 left-4 ${showAfter ? 'bg-green-500/90' : 'bg-red-500/90'} backdrop-blur-sm px-4 py-2 rounded-full`}>
                <span className="text-white font-semibold text-sm uppercase">
                  {showAfter ? 'After' : 'Before'}
                </span>
              </div>
            </div>

            <p className="text-center text-muted-foreground mt-4 text-sm">
              Click the buttons above to toggle between before and after
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BeforeAfterGallery;