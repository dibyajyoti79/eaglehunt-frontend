import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BeliefSection from "./components/BeliefSection";
import Goals from "./components/Goals";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
// import Teams from "./components/Teams";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import Profile from "./components/Profile";

const App = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminLogin = (email, password) => {
    if (email === "ehc@gmail.com" && password === "EHC@2024") {
      setIsAdminAuthenticated(true);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome to the admin panel!",
        background: "rgb(38,38,38)",
        color: "#ffffff",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Incorrect email or password. Please try again.",
        background: "rgb(38,38,38)",
        color: "#ffffff",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <Router>
      <Routes>
        {/* Base Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div className="max-w-7xl mx-auto pt-20 px-6">
                <section id="hero">
                  <HeroSection />
                </section>
                <section id="belief">
                  <BeliefSection />
                </section>
                <section id="goals">
                  <Goals />
                </section>
                <section id="pricing">
                  <Pricing />
                </section>
                <section id="testimonials">
                  <Testimonials />
                </section>
                {/* <section id="teams">
                  <Teams />
                </section> */}
                <Footer />
              </div>
            </>
          }
        />
        <Route path="/profile" element={<Profile />} />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            isAdminAuthenticated ? (
              <AdminPanel />
            ) : (
              <AdminLogin onLogin={handleAdminLogin} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
