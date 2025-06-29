export default function Hero() {
  return (
    <section className="bg-orange-50 flex items-center justify-center text-center min-h-screen px-4 pt-20 font-body" id="hero">
      <div>
        <h1 className="text-5xl md:text-6xl font-heading text-brand mb-4">ChefConnect</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">Connecting chefs and clients seamlessly</p>
        <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition font-medium shadow-lg hover:shadow-xl">
          Get Started
        </button>
      </div>
    </section>
  );
}
