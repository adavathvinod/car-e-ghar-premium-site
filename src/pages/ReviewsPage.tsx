import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reviews from '@/components/Reviews';
import Stats from '@/components/Stats';
import CTASection from '@/components/CTASection';

const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-wider mb-6">
              <span className="text-gradient-gold">CUSTOMER REVIEWS</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say 
              about their Car-e-Ghar experience.
            </p>
          </div>
        </section>

        <Stats />
        <Reviews showAll />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default ReviewsPage;
