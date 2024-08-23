import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import LoginModal from "./LoginModal";
import UserInfoModal from "./UserInfoModal";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [emailInitial, setEmailInitial] = useState('');

  useEffect(() => {
    // Retrieve the email initial from localStorage on component mount
    const storedEmailInitial = localStorage.getItem('emailInitial');
    setEmailInitial(storedEmailInitial || '');
  }, []);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLoginSuccess = (initial) => {
    setEmailInitial(initial);
  };

  const openUserInfoModal = () => {
    setIsUserInfoModalOpen(true);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="container px-4 mx-auto relative lg:text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-shrink-0">
              <a>
                <img className="h-10" src={logo} alt="Logo" />
              </a>
            </div>
            <ul className="hidden lg:flex ml-14 space-x-12">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="hidden lg:flex justify-center space-x-12 items-center px-4">
              {emailInitial ? (
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold cursor-pointer"
                  onClick={openUserInfoModal}
                >
                  {emailInitial}
                </div>
              ) : (
                <button
                  onClick={toggleLoginModal}
                  className="py-2 px-3 border rounded-md"
                >
                  Sign In
                </button>
              )}
            </div>
            <div className="lg:hidden md:flex flex-col justify-end">
              <button onClick={toggleNavbar}>
                {mobileDrawerOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
          {mobileDrawerOpen && (
            <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
              <ul>
                {navItems.map((item, index) => (
                  <li key={index} className="py-4">
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-6">
                {emailInitial ? (
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold cursor-pointer"
                    onClick={openUserInfoModal}
                  >
                    {emailInitial}
                  </div>
                ) : (
                  <button
                    onClick={toggleLoginModal}
                    className="py-2 px-5 border rounded-md"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal closeModal={toggleLoginModal} onLoginSuccess={handleLoginSuccess} />
      )}

      {/* User Info Modal */}
      {isUserInfoModalOpen && (
        <UserInfoModal closeModal={() => setIsUserInfoModalOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
