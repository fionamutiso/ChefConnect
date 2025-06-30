import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Contact", href: "#contact" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ];

  const handleEmailClick = () => {
    window.open('mailto:hello@culinex.com', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('tel:+254745878083', '_blank');
  };

  return (
    <footer className="bg-orange-500 text-white py-12 font-body">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-heading mb-4">Culinex</h3>
            <p className="text-orange-100">
              Connecting talented chefs with clients who appreciate exceptional
              culinary experiences. Your journey to extraordinary dining starts
              here.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-orange-300" />
                <button
                  onClick={handleEmailClick}
                  className="text-orange-100 hover:text-white transition-colors duration-200 hover:underline"
                >
                  hello@culinex.com
                </button>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-orange-300" />
                <button
                  onClick={handlePhoneClick}
                  className="text-orange-100 hover:text-white transition-colors duration-200 hover:underline"
                >
                  +254745878083
                </button>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-orange-300" />
                <span className="text-orange-100">Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-orange-100 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-600 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Culinex. All rights reserved.
          </p>
          <p className="text-orange-100 text-sm mt-2">
            Made with love for food lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
