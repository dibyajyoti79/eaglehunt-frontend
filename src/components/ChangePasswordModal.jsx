import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const ChangePasswordModal = ({ closeModal }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const token = Cookies.get("userAuthToken");

      const response = await fetch(
        "https://eaglehunt-api.onrender.com/api/v1/user/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newPassword: password }),
        }
      );

      if (!response.ok) {
        throw new Error("Password change failed. Please contact support.");
      }
      closeModal();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay z-50">
      <div className="modal shadow-lg">
        <h2 className="text-center">Change Password</h2>
        <button className="modal-close" onClick={closeModal}>
          <X />
        </button>
        <div className="space-y-4">
          <div>
            <label className="block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring"
            />
          </div>
          <div className="relative">
            <label className="block">Confirm Password</label>
            <input
              type={isShow ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring"
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
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
