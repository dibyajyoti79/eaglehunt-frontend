import { useEffect } from "react";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/UserInfoModal.css";
import Cookies from "js-cookie";

const UserInfoModal = ({ closeModal, userProfile }) => {
  const handleLogout = () => {
    Cookies.remove("userAuthToken");
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay z-50">
      <div className="modal user-info-modal shadow-lg p-6 w-full mx-4">
        <button className="modal-close" onClick={closeModal}>
          <X />
        </button>
        <h2 className="text-center text-2xl font-bold mb-4">Profile Details</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="mb-2">
            <h3 className="font-semibold">Name:</h3>
            <p>
              {userProfile.firstName} {userProfile.lastName}
            </p>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold">Email:</h3>
            <p>{userProfile.email}</p>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold">Phone Number:</h3>
            <p>{userProfile.phone}</p>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold">Invest Amount:</h3>
            <p>&#x20B9; {userProfile.investAmount.toFixed(2)}</p>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold">Interest Rate:</h3>
            <p>{userProfile.investmentPlan.interest}%</p>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold">Plan Duration:</h3>
            <p>{userProfile.investmentPlan.duration} months</p>
          </div>
          {/* <div className="mb-4">
            <h3 className="font-semibold">Current Amount:</h3>
            <p>&#x20B9; {amountOnCurrentDate}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Amount as of Selected Date:</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="date-picker-input w-full p-2 border border-gray-300 rounded"
              dateFormat="yyyy/MM/dd"
              popperContainer={({ children }) => (
                <div className="custom-datepicker-container">{children}</div>
              )}
            />

            <p>&#x20B9; {amountOnSelectedDate}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Final Amount:</h3>
            <p>&#x20B9; {calculateFinalAmount()}</p>
          </div> */}
        </div>
        <br />
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-orange-600 text-white rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserInfoModal;
