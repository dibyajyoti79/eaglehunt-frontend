import { Loader, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import LoginModal from "./LoginModal";
import UserInfoModal from "./UserInfoModal";
import Cookies from "js-cookie";
import ChangePasswordModal from "./ChangePasswordModal";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://eaglehunt-api.onrender.com/api/v1/user/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user profile.");
      }

      const profileData = await response.json();
      setUserProfile(profileData.data); // Set the user profile data
      console.log("User Profile:", profileData); // Log the user profile data
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("userAuthToken");
    if (token) {
      fetchUserProfile(token);
      setIsLoggedIn(true);
    }
  }, []);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLoginSuccess = () => {
    const token = Cookies.get("userAuthToken");
    if (token) {
      fetchUserProfile(token);
      setIsLoggedIn(true);
    }
  };

  const openUserInfoModal = () => {
    if (loading || !userProfile) return;
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
              {isLoggedIn ? (
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold cursor-pointer"
                  onClick={openUserInfoModal}
                >
                  {loading ? (
                    <Loader size={14} className="animate-spin" />
                  ) : (
                    userProfile && userProfile.firstName.slice(0, 1)
                  )}
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
                  <li key={index} className="py-4 text-center">
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-6">
                {isLoggedIn ? (
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold cursor-pointer"
                    onClick={openUserInfoModal}
                  >
                    {loading ? (
                      <Loader size={14} className="animate-spin" />
                    ) : (
                      userProfile && userProfile.firstName.slice(0, 1)
                    )}
                  </div>
                ) : (
                  <button
                    onClick={toggleLoginModal}
                    className="py-2 px-5 border rounded-md"
                  >
                    Sign In
                  </button>
                )}

                <div className="relative">
                  <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                    <a
                      href="#"
                      className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                    >
                      Edit
                    </a>

                    <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                      <span className="sr-only">Menu</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div
                    className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                    role="menu"
                  >
                    <div className="p-2">
                      <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                      >
                        View on Storefront
                      </a>

                      <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                      >
                        View Warehouse Info
                      </a>

                      <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                      >
                        Duplicate Product
                      </a>

                      <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                      >
                        Unpublish Product
                      </a>
                    </div>

                    <div className="p-2">
                      <form method="POST" action="#">
                        <button
                          type="submit"
                          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                          role="menuitem"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete Product
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal
          closeModal={toggleLoginModal}
          onLoginSuccess={handleLoginSuccess}
          setIsChangePasswordModalOpen={setIsChangePasswordModalOpen}
        />
      )}
      {/* Login Modal */}
      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          closeModal={() => setIsChangePasswordModalOpen(false)}
        />
      )}
      {/* User Info Modal */}
      {/* {isUserInfoModalOpen && (
        <UserInfoModal
          closeModal={() => setIsUserInfoModalOpen(false)}
          userProfile={userProfile}
        />
      )} */}
    </>
  );
};

export default Navbar;
