export default function Navbar() {
  return (
    <nav className="bg-white shadow fixed w-full z-10 font-body">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-heading text-brand">ChefConnect</h1>
        <ul className="hidden md:flex space-x-6 text-brand">
          <li><a href="#about" className="hover:text-orange-500 transition-colors duration-200">About</a></li>
          <li><a href="#features" className="hover:text-orange-500 transition-colors duration-200">Features</a></li>
          <li><a href="#testimonials" className="hover:text-orange-500 transition-colors duration-200">Testimonials</a></li>
          <li><a href="#contact" className="hover:text-orange-500 transition-colors duration-200">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
