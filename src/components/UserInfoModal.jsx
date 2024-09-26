import { useEffect, useState } from "react";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/UserInfoModal.css";
import Cookies from "js-cookie";

const UserInfoModal = ({ closeModal, userProfile }) => {
  const [expectedAmount, setExpectedAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amountOnSelectedDate, setAmountOnSelectedDate] = useState(0);
  const handleLogout = () => {
    Cookies.remove("userAuthToken");
    window.location.reload();
  };

  function calculateDateDifference(investmentDate, date = new Date()) {
    // Split the input date string (dd-mm-yyyy) and ensure proper type conversion
    const [day, month, year] = investmentDate.split("-").map(Number); // Ensure the values are numbers

    // Create a Date object for the investment date
    const investmentDateObj = new Date(year, month - 1, day); // month is 0-indexed in JS Date

    // Get today's date
    const today = new Date(date);

    // Calculate the difference in time (in milliseconds)
    const diffInMilliseconds = today.getTime() - investmentDateObj.getTime(); // Convert both to timestamps

    // Convert the difference to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
    let diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    // If including today, add 1 to the difference
    diffInDays += 1;

    return diffInDays;
  }
  // Function to calculate interest and total amount in INR
  const calculateInterest = (investAmount, interestRate, investmentDate) => {
    // Calculate the number of days passed since investment
    const daysPassed = calculateDateDifference(investmentDate);

    // Convert annual interest rate to daily interest rate
    const dailyInterestRate = interestRate / 365;
    console.table([
      investAmount,
      dailyInterestRate,
      daysPassed,
      investmentDate,
    ]);

    // Calculate interest earned based on days passed
    const interestEarned =
      (investAmount * dailyInterestRate * daysPassed) / 100;
    console.log("interestEarned", interestEarned);
    const totalAmount = investAmount + interestEarned;

    return {
      interestEarned: interestEarned.toFixed(2), // Keep 2 decimal places
      totalAmount: totalAmount.toFixed(2),
    };
  };
  const calculateInterestTillDate = (
    date,
    investAmount,
    interestRate,
    investmentDate
  ) => {
    // Calculate the number of days passed since investment
    const daysPassed = calculateDateDifference(investmentDate, date);

    // Convert annual interest rate to daily interest rate
    const dailyInterestRate = interestRate / 365;

    // Calculate interest earned based on days passed
    const interestEarned =
      (investAmount * dailyInterestRate * daysPassed) / 100;
    const totalAmount = investAmount + interestEarned;

    return {
      interestEarned: interestEarned.toFixed(2), // Keep 2 decimal places
      totalAmount: totalAmount.toFixed(2),
    };
  };
  useEffect(() => {
    if (userProfile) {
      const planDuration = userProfile.investmentPlan.duration;
      const interestRate = userProfile.investmentPlan.interest;

      // Calculate expected amount using simple interest formula
      const expectedAmount =
        userProfile.investAmount *
        (1 + (interestRate / 100) * (planDuration / 12));
      setExpectedAmount(expectedAmount);
    }
  }, [userProfile]);
  useEffect(() => {
    if (selectedDate) {
      const price = calculateInterestTillDate(
        selectedDate,
        userProfile.investAmount,
        userProfile.investmentPlan.interest,
        userProfile.investmentDate
      ).totalAmount;
      setAmountOnSelectedDate(price);
    }
  }, [selectedDate]);
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
            <h3 className="font-semibold">Investmen Date:</h3>
            <p>{userProfile.investmentDate}</p>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold">Maturity Date:</h3>
            <p>{userProfile.maturityDate}</p>
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
          <div className="mb-4">
            <h3 className="font-semibold">Current Amount:</h3>
            <p>
              &#x20B9;{" "}
              {
                calculateInterest(
                  userProfile.investAmount,
                  userProfile.investmentPlan.interest,
                  userProfile.investmentDate
                ).totalAmount
              }
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Amount as of Selected Date:</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="date-picker-input w-full p-2 border border-gray-300 rounded"
              dateFormat="dd-MM-yyyy"
              popperContainer={({ children }) => (
                <div className="custom-datepicker-container">{children}</div>
              )}
            />

            <p>&#x20B9; {amountOnSelectedDate}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Final Amount:</h3>
            <p>&#x20B9; {expectedAmount}</p>
          </div>
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
