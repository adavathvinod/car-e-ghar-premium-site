import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesGrid from '@/components/ServicesGrid';
import CTASection from '@/components/CTASection';

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-wider mb-6">
              <span className="text-gradient-gold">OUR SERVICES</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From basic wash to complete car transformation. We offer premium car care services 
              using top-quality products and expert techniques.
            </p>
          </div>
        </section>

        <ServicesGrid showAll />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
