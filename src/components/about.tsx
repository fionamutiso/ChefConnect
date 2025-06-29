import { Users, Award, Heart, TrendingUp } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Users, number: "500+", label: "Professional Chefs", color: "text-orange-400" },
    { icon: Award, number: "1000+", label: "Happy Clients", color: "text-orange-500" },
    { icon: Heart, number: "98%", label: "Satisfaction Rate", color: "text-orange-600" },
    { icon: TrendingUp, number: "24/7", label: "Support Available", color: "text-orange-700" },
  ];

  return (
    <section className="bg-gradient-to-r from-white to-orange-50 py-20 px-4 font-body" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading text-brand mb-6">About Us</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto">
            ChefConnect bridges the gap between professional chefs and clients, offering seamless booking, menu planning, and personalised culinary experiences. 
            We believe everyone deserves access to exceptional culinary talent, whether it's for a special occasion, corporate event, or intimate dinner party.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 rounded-full bg-orange-50 shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-shadow ${stat.color}`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-brand mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-heading text-brand mb-4">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To democratize access to professional culinary experiences by connecting talented chefs with clients who appreciate exceptional food and service. 
            We're building a community where passion for food meets convenience and quality.
          </p>
        </div>
      </div>
    </section>
  );
}
