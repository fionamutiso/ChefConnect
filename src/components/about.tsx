import { Users, Award, Heart, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <section
      className="bg-gradient-to-r from-white to-orange-50 py-20 px-4 font-body"
      id="about"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading text-brand mb-6">About Us</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto">
            Culinex bridges the gap between professional chefs and clients,
            offering seamless booking, menu planning, and personalised culinary
            experiences. We believe everyone deserves access to exceptional
            culinary talent, whether it's for a special occasion, corporate
            event, or intimate dinner party.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-heading text-brand mb-4">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To democratize access to professional culinary experiences by
            connecting talented chefs with clients who appreciate exceptional
            food and service. We're building a community where passion for food
            meets convenience and quality.
          </p>
        </div>
      </div>
    </section>
  );
}
