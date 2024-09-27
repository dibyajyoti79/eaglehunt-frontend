import { useEffect, useState } from "react";
import { Eye, EyeIcon, Loader, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/UserInfoModal.css";
import Cookies from "js-cookie";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";

const Profile = () => {
  const [expectedAmount, setExpectedAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amountOnSelectedDate, setAmountOnSelectedDate] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleLogout = () => {
    Cookies.remove("userAuthToken");
    window.location.href = "/";
    // window.location.reload();
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
    if (daysPassed <= 0)
      return { interestEarned: 0, totalAmount: investAmount };

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
  const calculateInterestTillDate = (
    date,
    investAmount,
    interestRate,
    investmentDate
  ) => {
    // Calculate the number of days passed since investment
    const daysPassed = calculateDateDifference(investmentDate, date);

    if (daysPassed <= 0)
      return { interestEarned: 0, totalAmount: investAmount };

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
    }
  }, []);
  useEffect(() => {
    if (selectedDate && userProfile) {
      const price = calculateInterestTillDate(
        selectedDate,
        userProfile.investAmount,
        userProfile.investmentPlan.interest,
        userProfile.investmentDate
      ).totalAmount;
      setAmountOnSelectedDate(price);
    }
  }, [selectedDate, userProfile]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const InvestmentPieChart = () => {
    const data = {
      labels: ["Invest Amount", "Est. Return"],
      datasets: [
        {
          //   label: "Investment Distribution",
          data: [
            userProfile.investAmount,
            expectedAmount - userProfile.investAmount,
          ],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    };

    return <Pie data={data} />;
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={50} className="animate-spin text-center" />
      </div>
    );
  }
  if (!userProfile) {
    return <div>No user profile found</div>;
  }

  return (
    <>
      <div className="flex items-center m-4 mb-0">
        <Link to="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">Profile</span>
      </div>
      <div className="max-w-4xl mx-auto p-8 space-y-12 text-white rounded-lg shadow-lg">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <img
            src={
              userProfile.profilePic.url || "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-600"
          />
          <div>
            <h2 className="text-4xl font-bold">
              {userProfile.firstName} {userProfile.lastName}
            </h2>
            {/* <p className="text-sm text-gray-400 mt-1">{userProfile.email}</p> */}
          </div>
        </div>

        {/* Investment Summary Section */}
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {/* Invest Amount Card */}
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="font-semibold text-gray-300">Invest Amount</h3>
            <p className="text-2xl text-gray-100 mt-2">
              &#x20B9; {userProfile.investAmount.toFixed(2)}
            </p>
          </div>

          {/* Current Amount Card */}
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="font-semibold text-gray-300">Current Amount</h3>
            <p className="text-2xl text-gray-100 mt-2">
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

          {/* Final Amount Card */}
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="font-semibold text-gray-300">Final Amount</h3>
            <p className="text-2xl text-gray-100 mt-2">
              &#x20B9; {expectedAmount}
            </p>
          </div>
        </div>

        {/* Investment Details Section */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-300">Phone Number:</h3>
            <p className="text-gray-100">{userProfile.phone}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-300">Email ID:</h3>
            <p className="text-gray-100">{userProfile.email}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-300">Investment Date:</h3>
            <p className="text-gray-100">{userProfile.investmentDate}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-300">Maturity Date:</h3>
            <p className="text-gray-100">{userProfile.maturityDate}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-300">Interest Rate:</h3>
            <p className="text-gray-100">
              {userProfile.investmentPlan.interest}%
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-300">Plan Duration:</h3>
            <p className="text-gray-100">
              {userProfile.investmentPlan.duration} months
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-300">UTR Number:</h3>
            <p className="text-gray-100 flex items-center gap-2">
              {userProfile.utrNo}
              <a href={userProfile.paymentReceipt.url} target="_blank">
                <Eye size={20} className="text-blue-500" />
              </a>
            </p>
          </div>

          {/* Date Picker and Amount as of Selected Date */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-300">
              Amount as of Selected Date:
            </h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="w-full p-2 border border-gray-600 rounded mt-2 bg-gray-700 text-gray-100"
              dateFormat="dd-MM-yyyy"
            />
            <p className="text-gray-100 mt-2">
              &#x20B9; {amountOnSelectedDate}
            </p>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-gray-800 p-6 rounded-lg ">
          <h3 className="font-semibold text-gray-300 mb-4">
            Investment Overview
          </h3>
          <div className="w-64 h-64 mx-auto">
            <InvestmentPieChart />
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleLogout}
            className="py-3 px-6 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
