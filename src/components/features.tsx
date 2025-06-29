import { Calendar, Utensils, CreditCard, Shield, Clock, Users } from 'lucide-react';

export default function Features() {
  const features = [
    { 
      title: "Easy Booking", 
      description: "Book chefs with just a few clicks through our intuitive platform.",
      icon: Calendar,
      color: "text-orange-400"
    },
    { 
      title: "Diverse Cuisines", 
      description: "Access chefs with specialties in various cuisines from around the world.",
      icon: Utensils,
      color: "text-orange-500"
    },
    { 
      title: "Secure Payments", 
      description: "Fast and secure online payment integration with multiple options.",
      icon: CreditCard,
      color: "text-orange-600"
    },
    { 
      title: "Verified Chefs", 
      description: "All our chefs are thoroughly vetted and background checked.",
      icon: Shield,
      color: "text-orange-700"
    },
    { 
      title: "Quick Response", 
      description: "Get responses from chefs within minutes, not hours.",
      icon: Clock,
      color: "text-orange-500"
    },
    { 
      title: "Community Reviews", 
      description: "Read authentic reviews from real customers and clients.",
      icon: Users,
      color: "text-orange-600"
    },
  ];

  return (
    <section className="bg-gradient-to-br from-brand-light to-orange-50 py-20 px-4 font-body" id="features">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-heading text-brand mb-4">Our Features</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Discover what makes ChefConnect the perfect platform for connecting with professional chefs</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 group cursor-pointer transform hover:-translate-y-2"
                onClick={() => console.log(`Clicked ${feature.title}`)}
              >
                <div className={`w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-brand group-hover:text-orange-500 transition-colors">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
