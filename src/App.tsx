import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/herosec";
import About from "./components/about";
import Features from "./components/features";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Login from "./components/login";
import Register from "./components/register";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
