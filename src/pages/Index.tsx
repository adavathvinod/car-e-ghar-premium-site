import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import LocationBar from '@/components/LocationBar';
import ServicesGrid from '@/components/ServicesGrid';
import Stats from '@/components/Stats';
import Reviews from '@/components/Reviews';
import Gallery from '@/components/Gallery';
import CTASection from '@/components/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <LocationBar />
        <ServicesGrid />
        <Stats />
        <Gallery limit={6} />
        <Reviews />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
