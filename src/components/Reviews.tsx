import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Revanth Reddy',
    rating: 5,
    text: 'Friendly staff and they give best service at reasonable price. Highly recommended for car care services.',
  },
  {
    name: 'Saieshwar Chitikesi',
    rating: 5,
    text: 'Very good work and reasonable prices. My car looks brand new after their detailing service.',
  },
  {
    name: 'Rajesh Chandra',
    rating: 5,
    text: 'Did my car wash after dark and the place is well lit. Professional service and great results.',
  },
  {
    name: 'Vikram Singh',
    rating: 5,
    text: 'Best ceramic coating service in Secunderabad. The shine is incredible and the protection is top-notch.',
  },
  {
    name: 'Priya Sharma',
    rating: 5,
    text: 'Amazing interior detailing work. My car smells fresh and looks showroom ready. Will definitely return.',
  },
  {
    name: 'Arun Kumar',
    rating: 4,
    text: 'Great PPF installation. Professional team and excellent attention to detail. Highly satisfied.',
  },
];

interface ReviewsProps {
  showAll?: boolean;
}

const Reviews = ({ showAll = false }: ReviewsProps) => {
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-3xl font-bold text-primary">4.8</span>
          </div>
          <h2 className="section-title">
            <span className="text-gradient-gold">CUSTOMER REVIEWS</span>
          </h2>
          <p className="section-subtitle">
            Google Verified Reviews from our valued customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReviews.map((review, index) => (
            <div
              key={index}
              className="review-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-muted-foreground" />
                ))}
              </div>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">Google Review</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <span>Based on</span>
            <span className="text-primary font-bold">124</span>
            <span>Google Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
