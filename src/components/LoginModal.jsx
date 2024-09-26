import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const LoginModal = ({
  closeModal,
  onLoginSuccess,
  setIsChangePasswordModalOpen,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    // validate email
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      toast.error("Invalid email format");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://eaglehunt-api.onrender.com/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      const { token, firstLogin } = data.data; // Assuming the token is returned in the response

      // Store token in cookies with 15 days expiration
      Cookies.set("userAuthToken", token, { expires: 15 });

      if (firstLogin) {
        toast.success("Login successful!, please change your password");
        closeModal();
        setIsChangePasswordModalOpen(true);
      } else {
        toast.success("Login successful!");
        closeModal();
      }
      onLoginSuccess();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay z-50">
      <div className="modal shadow-lg">
        <h2 className="text-center">Login</h2>
        <button className="modal-close" onClick={closeModal}>
          <X />
        </button>
        <div className="space-y-4">
          <div>
            <label className="block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="relative">
            <label className="block">Password</label>
            <input
              type={isShow ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring"
              required
            />
            {!isShow ? (
              <Eye
                className="text-gray-400 text-sm absolute right-4 top-11 transform -translate-y-1/2 cursor-pointer"
                size={20}
                onClick={() => setIsShow(!isShow)}
              />
            ) : (
              <EyeOff
                className="text-gray-400 text-sm absolute right-4 top-11 transform -translate-y-1/2 cursor-pointer"
                size={20}
                onClick={() => setIsShow(!isShow)}
              />
            )}
          </div>
        </div>
        <div className="w-full mt-4">
          <button
            onClick={handleSubmit}
            className={`bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-white w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
