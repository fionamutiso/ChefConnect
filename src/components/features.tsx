export default function Features() {
  const features = [
    { title: "Easy Booking", description: "Book chefs with just a few clicks." },
    { title: "Diverse Cuisines", description: "Access chefs with specialties in various cuisines." },
    { title: "Secure Payments", description: "Fast and secure online payment integration." },
  ];

  return (
    <section className="bg-gradient-to-br from-brand-light to-orange-50 py-20 px-4 font-body" id="features">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-heading text-brand mb-12">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold mb-2 text-brand">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
