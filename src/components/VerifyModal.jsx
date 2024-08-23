import { useState } from 'react';
import { X } from 'lucide-react'; // Importing the cross icon
import Swal from 'sweetalert2';
import Api from '../constants/Api'; // Import the Api module

const VerifyModal = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const clearFields = () => {
    setEmail('');
    setOtp('');
  };

  const handleVerify = async () => {
    try {
      const response = await Api.verifyAccount(email, otp); // Call the API with correct params
      if (response.status === 200 || response.data.message === 'Account verified and activated successfully') {
        Swal.fire({
            icon: 'success',
            title: 'Verification Successful',
            text: 'Your account has been verified and activated!',
            background: 'rgb(38,38,38)', // Black background
            color: '#fff', // White text
            timer: 2000,
            showConfirmButton: false,
          });
        clearFields();
        closeModal();
      } else {
        Swal.fire({
            icon: 'error',
            title: 'Verification Failed',
            text: 'Please check your OTP or email and try again.',
            background: 'rgb(38,38,38)', // Black background
            color: '#fff', // White text
            showConfirmButton: false,
          });
      }
    } catch (error) {
      console.error('Error verifying account:', error);
      Swal.fire({
        icon: 'error',
        title: 'An Error Occurred',
        text: 'There was an error during verification. Please try again.',
        background: 'rgb(38,38,38)', // Black background
        color: '#fff', // White text
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay z-50">
      <div className="modal shadow-lg">
        <h2 className="text-center">Verify OTP</h2>
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
            <label className="block">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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
              onClick={handleVerify}
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-white"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyModal;
