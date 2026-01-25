import { useState } from 'react';
import { X } from 'lucide-react';
import car1 from '@/assets/car-1.png';
import car2 from '@/assets/car-2.png';
import car3 from '@/assets/car-3.png';
import car4 from '@/assets/car-4.png';
import car5 from '@/assets/car-5.png';
import bike1 from '@/assets/bike-1.png';
import foamWash from '@/assets/foam-wash.png';
import polishing from '@/assets/polishing.png';
import detailing1 from '@/assets/detailing-1.png';

const galleryImages = [
  { src: car1, alt: 'Black Safari SUV after detailing', category: 'Exterior' },
  { src: car2, alt: 'White Mercedes GLE', category: 'Exterior' },
  { src: car5, alt: 'Red Mahindra Thar', category: 'Exterior' },
  { src: detailing1, alt: 'Professional polishing', category: 'Detailing' },
  { src: foamWash, alt: 'Foam wash process', category: 'Wash' },
  { src: polishing, alt: 'Paint correction', category: 'Detailing' },
  { src: car3, alt: 'Sedan after ceramic coating', category: 'Coating' },
  { src: car4, alt: 'Thar after detailing', category: 'Exterior' },
  { src: bike1, alt: 'Royal Enfield Himalayan', category: 'Bikes' },
];

interface GalleryProps {
  limit?: number;
  hideHeader?: boolean;
}

const Gallery = ({ limit, hideHeader = false }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const displayedImages = limit ? galleryImages.slice(0, limit) : galleryImages;

  return (
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {!hideHeader && (
            <div className="text-center mb-16">
              <h2 className="section-title">
                <span className="text-gradient-gold">OUR WORK</span>
              </h2>
              <p className="section-subtitle">
                See the transformation. From dusty to dazzling, our work speaks for itself.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedImages.map((image, index) => (
              <div
                key={index}
                className="gallery-image aspect-[4/3]"
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <span className="text-xs text-primary uppercase tracking-wider">{image.category}</span>
                    <p className="text-foreground font-medium">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default Gallery;
