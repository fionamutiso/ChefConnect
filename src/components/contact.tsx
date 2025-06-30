import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a message anytime",
      action: "hello@culinex.com",
      color: "text-orange-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      action: "+254745878083",
      color: "text-orange-600",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our office location",
      action: "Nairobi, Kenya",
      color: "text-orange-700",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create email content
    const emailSubject = encodeURIComponent(formData.subject || "Contact from Culinex Website");
    const emailBody = encodeURIComponent(`
Hello Culinex Team,

I'm reaching out through your website contact form.

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

Best regards,
${formData.name}
    `);

    // Create mailto link
    const mailtoLink = `mailto:hello@culinex.com?subject=${emailSubject}&body=${emailBody}`;

    // Open email client
    window.open(mailtoLink, '_blank');

    // Reset form after a short delay
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleContactMethodClick = (method: any) => {
    if (method.title === "Email Us") {
      window.open(`mailto:${method.action}`, '_blank');
    } else if (method.title === "Call Us") {
      window.open(`tel:${method.action}`, '_blank');
    }
  };

  return (
    <section
      className="bg-gradient-to-br from-orange-50 to-brand-light py-20 px-4 font-body"
      id="contact"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading text-brand mb-6">Contact Us</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Have questions or want to book a chef? We're here to help you create
            the perfect culinary experience.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleContactMethodClick(method)}
              >
                <div
                  className={`w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 ${method.color}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-brand">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-3">{method.description}</p>
                <p className="text-orange-500 font-medium">{method.action}</p>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <MessageCircle className="w-6 h-6 text-orange-500 mr-3" />
            <h3 className="text-2xl font-heading text-brand">
              Send us a Message
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="What can we help you with?"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                placeholder="Tell us more about your culinary needs..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center justify-center group w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Opening Email...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
