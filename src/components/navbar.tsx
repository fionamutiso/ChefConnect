import { Menu, Search, ChefHat, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDashboard = () => {
    const path = user?.role === 'chef' ? '/chef-dashboard' : '/client-dashboard';
    navigate(path);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50 font-body">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <ChefHat className="w-8 h-8 text-orange-500 mr-2" />
            <h1 className="text-2xl font-heading text-brand">Culinex</h1>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 text-brand">
            <li>
              <a
                href="#about"
                className="hover:text-orange-500 transition-colors duration-200 font-medium"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="hover:text-orange-500 transition-colors duration-200 font-medium"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-orange-500 transition-colors duration-200 font-medium"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-orange-500 transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </button>
            {user ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleDashboard}
                  className="flex items-center text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium"
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleGetStarted}
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search chefs, cuisines..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white border-t border-gray-200 py-4">
            <ul className="space-y-4">
              <li>
                <a
                  href="#about"
                  className="block py-2 text-brand hover:text-orange-500 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="block py-2 text-brand hover:text-orange-500 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block py-2 text-brand hover:text-orange-500 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
              {user ? (
                <>
                  <li className="pt-4 border-t border-gray-200">
                    <button 
                      onClick={() => {
                        handleDashboard();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium py-3"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium py-3"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => {
                      handleGetStarted();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                  >
                    Get Started
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
