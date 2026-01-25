import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import GalleryComponent from '@/components/Gallery';
import CTASection from '@/components/CTASection';

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-wider mb-6">
              <span className="text-gradient-gold">OUR GALLERY</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See the amazing transformations we've done. From dusty to dazzling, 
              our work speaks for itself.
            </p>
          </div>
        </section>

        {/* Before/After Section */}
        <BeforeAfterGallery />
        
        {/* Additional Work */}
        <GalleryComponent hideHeader />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
