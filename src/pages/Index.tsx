import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import LocationBar from '@/components/LocationBar';
import ServicesGrid from '@/components/ServicesGrid';
import Stats from '@/components/Stats';
import Reviews from '@/components/Reviews';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import CTASection from '@/components/CTASection';
import InstagramVideos from '@/components/InstagramVideos';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <LocationBar />
        <ServicesGrid />
        <Stats />
        <InstagramVideos />
        <BeforeAfterGallery />
        <Reviews />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
