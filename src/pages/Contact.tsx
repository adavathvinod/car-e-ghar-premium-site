import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, MapPin, Clock, Mail, Send, Instagram } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just redirect to phone call
    window.location.href = 'tel:08977041344';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const businessHours = [
    { day: 'Sunday', hours: '9:00 AM – 8:00 PM' },
    { day: 'Monday', hours: '9:00 AM – 8:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM – 8:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM – 8:00 PM' },
    { day: 'Thursday', hours: '9:00 AM – 8:00 PM' },
    { day: 'Friday', hours: '9:00 AM – 8:00 PM' },
    { day: 'Saturday', hours: '9:00 AM – 8:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-wider mb-6">
              <span className="text-gradient-gold">CONTACT US</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to give your car the care it deserves? Get in touch with us today 
              to book your appointment.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="card-premium p-8">
                <h2 className="text-3xl font-display tracking-wider mb-6 text-gradient-gold">
                  BOOK APPOINTMENT
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Email (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Service Required</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="foam-wash">Car Foam Wash</option>
                      <option value="detailing">Interior & Exterior Detailing</option>
                      <option value="ppf">Paint Protection Film (PPF)</option>
                      <option value="ceramic">Ceramic Coating</option>
                      <option value="teflon">Teflon Coating</option>
                      <option value="denting">Denting & Painting</option>
                      <option value="other">Other Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us about your car and what you need..."
                    />
                  </div>
                  <button type="submit" className="btn-primary rounded-full w-full flex items-center justify-center gap-2">
                    <Send size={18} />
                    Submit & Call Us
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                {/* Quick Contact */}
                <div className="card-premium p-8">
                  <h3 className="text-2xl font-display tracking-wider mb-6 text-gradient-gold">
                    QUICK CONTACT
                  </h3>
                  <div className="space-y-6">
                    <a 
                      href="tel:08977041344"
                      className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Call Us</p>
                        <p className="text-lg font-semibold">089770 41344</p>
                      </div>
                    </a>
                    <a 
                      href="https://maps.google.com/?q=28,+Lakshmipuram+Colony,+Sainikpuri,+Secunderabad,+Telangana+500094"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 text-foreground hover:text-primary transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Visit Us</p>
                        <p className="font-semibold">28, Lakshmipuram Colony, Sainikpuri, Secunderabad, Telangana 500094</p>
                      </div>
                    </a>
                    <a 
                      href="https://www.instagram.com/careghar/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <Instagram className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Follow Us</p>
                        <p className="font-semibold">@careghar</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="card-premium p-8">
                  <h3 className="text-2xl font-display tracking-wider mb-6 text-gradient-gold">
                    BUSINESS HOURS
                  </h3>
                  <div className="space-y-3">
                    {businessHours.map((item, index) => (
                      <div 
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-border last:border-0"
                      >
                        <span className="text-foreground">{item.day}</span>
                        <span className="text-primary font-medium">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="rounded-xl overflow-hidden border border-primary/20" style={{ boxShadow: 'var(--shadow-gold)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.4850122903663!2d78.54976007493703!3d17.48434598341949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9b36a1b6fe87%3A0x6af45c6f748a0481!2sCar-e-Ghar!5e0!3m2!1sen!2sin!4v1769289543382!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
