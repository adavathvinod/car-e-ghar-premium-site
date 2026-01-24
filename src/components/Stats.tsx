import { Car, Star, Calendar, ThumbsUp } from 'lucide-react';

const stats = [
  { icon: Car, value: '2000+', label: 'Cars Serviced' },
  { icon: Star, value: '4.8★', label: 'Google Rating' },
  { icon: Calendar, value: '5+', label: 'Years Experience' },
  { icon: ThumbsUp, value: '100%', label: 'Customer Satisfaction' },
];

const Stats = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 via-background to-primary/10 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="stat-item group">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="stat-number">{stat.value}</div>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
