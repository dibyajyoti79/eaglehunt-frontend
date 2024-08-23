import { useState } from 'react';
import { X } from 'lucide-react';
import VerifyModal from './VerifyModal';
import Api from '../constants/Api';
import qs from 'qs';
import Swal from 'sweetalert2';

const LoginModal = ({ closeModal, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Passwords do not match!",
            background: "rgb(38,38,38)",
            color: "#ffffff",
            timer: 1500,
            showConfirmButton: false,
          });
      return;
    }

    const credentials = qs.stringify({
      username: email,
      password: password,
      grant_type: '',
    });

    try {
      const tokenResponse = await Api.getToken(credentials);

      // Store tokens in localStorage
      localStorage.setItem('accessToken', tokenResponse.access_token);
      localStorage.setItem('refreshToken', tokenResponse.refresh_token);

      // Extract and store the initial of the email
      const emailInitial = email.charAt(0).toUpperCase();
      localStorage.setItem('emailInitial', emailInitial);

      // Notify Navbar about the login success
      onLoginSuccess(emailInitial);

    //   fetchUserData();
      closeModal();

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have successfully logged in!',
        background: 'rgb(38,38,38)', // Black background
        color: '#fff', // White text
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Login failed:', error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Account is not verified or Wrong credentials",
        background: "rgb(38,38,38)",
        color: "#ffffff",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

//   const fetchUserData = async () => {
//     const accessToken = localStorage.getItem('accessToken');

//     if (!accessToken) {
//       console.error('Access token not found.');
//       return;
//     }

//     try {
//       const userDetails = await Api.getUserDetails(accessToken);
//       console.log('User Details:', userDetails);
//     } catch (error) {
//       console.error('Error fetching user details:', error);
//     }
//   };

  const openVerifyModal = () => {
    setShowVerifyModal(true);
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
            />
          </div>
          <div>
            <label className="block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="block">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={clearFields}
              className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md"
            >
              Clear
            </button>
            <button
              onClick={handleSubmit}
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-white"
            >
              Login
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-center text-gray-400">
          If you have not activated your account, please activate it first. An OTP has been sent to your email.
        </p>
        <button
          onClick={openVerifyModal}
          className="mt-4 text-orange-400 underline text-center block w-full"
        >
          Verify
        </button>
      </div>

      {showVerifyModal && (
        <VerifyModal closeModal={() => setShowVerifyModal(false)} />
      )}
    </div>
  );
};

export default LoginModal;
