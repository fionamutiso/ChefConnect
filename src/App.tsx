import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ChefProvider } from "./contexts/ChefContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Navbar from "./components/navbar";
import Hero from "./components/herosec";
import About from "./components/about";
import Features from "./components/features";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Login from "./components/login";
import Register from "./components/register";
import ChefDashboard from "./components/ChefDashboard";
import ClientDashboard from "./components/ClientDashboard";

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
    <AuthProvider>
      <ChefProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/chef-dashboard" 
              element={
                <ProtectedRoute requiredRole="chef">
                  <ChefDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/client-dashboard" 
              element={
                <ProtectedRoute requiredRole="client">
                  <ClientDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </ChefProvider>
    </AuthProvider>
  );
}

export default App;
