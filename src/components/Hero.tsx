import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';

const slides = [
  {
    image: hero1,
    title: 'COMPLETE CAR CARE SOLUTION',
    subtitle: 'Premium Wash, Protection & Detailing',
    cta: 'Book Appointment',
  },
  {
    image: hero2,
    title: 'PREMIUM DETAILING EXPERTS',
    subtitle: 'Your Car, Our Passion',
    cta: 'View Services',
  },
  {
    image: hero3,
    title: 'SHOWROOM SHINE GUARANTEED',
    subtitle: 'Ceramic Coating • PPF • Interior Care',
    cta: 'Explore Gallery',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div 
            className={`transition-all duration-700 ${
              isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display tracking-wider mb-6 text-gradient-gold">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-2xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:08977041344"
                className="btn-primary rounded-full"
              >
                Book Appointment
              </a>
              <Link 
                to="/services"
                className="btn-outline-gold rounded-full"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full glass border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
      >
        <ChevronLeft size={28} className="text-foreground group-hover:text-primary transition-colors" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full glass border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
      >
        <ChevronRight size={28} className="text-foreground group-hover:text-primary transition-colors" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-primary w-8' 
                : 'bg-foreground/30 hover:bg-foreground/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-muted-foreground text-sm">
        <span className="rotate-90 origin-center translate-x-8">SCROLL</span>
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
