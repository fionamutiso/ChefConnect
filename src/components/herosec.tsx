import { ChefHat, ArrowRight, Star, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <section
      className="bg-gradient-to-br from-brand-light to-orange-50 flex items-center justify-center text-center min-h-screen px-4 pt-20 font-body relative overflow-hidden"
      id="hero"
    >
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-brand-light rounded-full opacity-30 animate-pulse"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-center mb-6">
          <ChefHat className="w-16 h-16 text-orange-500 mr-4 animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-heading text-brand mb-0">
            Culinex
          </h1>
        </div>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Connecting chefs and clients seamlessly
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button 
            onClick={handleGetStarted}
            className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center group"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={scrollToAbout}
            className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center group"
            aria-label="Learn more about Culinex"
          >
            <Info className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            Learn More
          </button>
        </div>

        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-orange-500 mr-1 fill-orange-500" />
            <span>500+ Chefs</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-orange-500 mr-1 fill-orange-500" />
            <span>1000+ Happy Clients</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-orange-500 mr-1 fill-orange-500" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
