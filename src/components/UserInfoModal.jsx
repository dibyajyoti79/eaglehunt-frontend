// import { useState, useEffect } from 'react';
// import Api from '../constants/Api';
// import { X } from 'lucide-react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import "../Styles/UserInfoModal.css";

// const UserInfoModal = ({ closeModal }) => {
//     const [userData, setUserData] = useState(null);
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [amountOnSelectedDate, setAmountOnSelectedDate] = useState(0);
//     const [amountOnCurrentDate, setAmountOnCurrentDate] = useState(0);

//     useEffect(() => {
//         // Fetch user data on component mount
//         const fetchUserData = async () => {
//             const accessToken = localStorage.getItem('accessToken');
//             if (!accessToken) {
//                 console.error('Access token not found.');
//                 return;
//             }

//             try {
//                 const data = await Api.getUserDetails(accessToken);
//                 setUserData(data);
//             } catch (error) {
//                 console.error('Error fetching user details:', error);
//             }
//         };

//         fetchUserData();
//     }, []);

//     useEffect(() => {
//         if (userData) {
//             setAmountOnCurrentDate(calculateAmountFromCurrentDate());
//             setAmountOnSelectedDate(calculateAmount(selectedDate));
//         }
//     }, [userData, selectedDate]);

//     const handleLogout = () => {
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         localStorage.removeItem('emailInitial');
//         window.location.reload(); // Reload the page after logout
//     };

//     const calculateAmount = (date) => {
//         if (!userData) return 0;

//         const { amount_given, interest_rate, registered_at } = userData;

//         // Calculate months passed since the selected date
//         const selectedDateObj = new Date(date);
//         const registeredDate = new Date(registered_at);
//         const monthsPassed = Math.floor((selectedDateObj - registeredDate) / (1000 * 60 * 60 * 24 * 30));

//         // Calculate the amount based on months passed
//         const currentAmount = amount_given * Math.pow(1 + interest_rate / 100, monthsPassed);
//         return currentAmount.toFixed(2);
//     };

//     const calculateAmountFromCurrentDate = () => {
//         if (!userData) return 0;

//         const { amount_given, interest_rate, registered_at } = userData;

//         // Calculate months passed since the current date
//         const currentDate = new Date();
//         const registeredDate = new Date(registered_at);
//         const monthsPassed = Math.floor((currentDate - registeredDate) / (1000 * 60 * 60 * 24 * 30));

//         // Calculate the amount based on months passed
//         const currentAmount = amount_given * Math.pow(1 + interest_rate / 100, monthsPassed);
//         return currentAmount.toFixed(2);
//     };

//     const calculateFinalAmount = () => {
//         if (!userData) return 0;

//         const { amount_given, interest_rate, pricing_time_frame } = userData;
//         const finalAmount = amount_given * Math.pow(1 + interest_rate / 100, pricing_time_frame);
//         return finalAmount.toFixed(2);
//     };


//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay z-50">
//             <div className="modal user-info-modal shadow-lg p-6 w-full mx-4">
//                 <button className="modal-close" onClick={closeModal}>
//                     <X />
//                 </button>
//                 <h2 className="text-center text-2xl font-bold mb-4">User Information</h2>
//                 {userData ? (
//                     <>
//                         <div className="grid gap-4 md:grid-cols-2">
//                             <div className="mb-2">
//                                 <h3 className="font-semibold">Name:</h3>
//                                 <p>{userData.first_name} {userData.last_name}</p>
//                             </div>
//                             <div className="mb-2">
//                                 <h3 className="font-semibold">Email:</h3>
//                                 <p>{userData.email}</p>
//                             </div>
//                             <div className="mb-2">
//                                 <h3 className="font-semibold">Phone Number:</h3>
//                                 <p>{userData.phone_number}</p>
//                             </div>
//                             <div className="mb-2">
//                                 <h3 className="font-semibold">Base Amount:</h3>
//                                 <p>&#x20B9; {userData.amount_given.toFixed(2)}</p>
//                             </div>
//                             <div className="mb-2">
//                                 <h3 className="font-semibold">Interest Rate:</h3>
//                                 <p>{userData.interest_rate}%</p>
//                             </div>
//                             <div className="mb-2">
//                                 <h3 className="font-semibold">Pricing Time Frame:</h3>
//                                 <p>{userData.pricing_time_frame} months</p>
//                             </div>
//                             <div className="mb-4">
//                                 <h3 className="font-semibold">Current Amount:</h3>
//                                 <p>&#x20B9; {amountOnCurrentDate}</p>
//                             </div>
//                             <div className="mb-4">
//                                 <h3 className="font-semibold">Amount as of Selected Date:</h3>
//                                 <DatePicker
//                                     selected={selectedDate}
//                                     onChange={(date) => setSelectedDate(date)}
//                                     className="date-picker-input w-full p-2 border border-gray-300 rounded"
//                                     dateFormat="yyyy/MM/dd"
//                                     popperContainer={({ children }) => (
//                                         <div className="custom-datepicker-container">
//                                             {children}
//                                         </div>
//                                     )}
//                                 />

//                                 <p>&#x20B9; {amountOnSelectedDate}</p>
//                             </div>
//                             <div className="mb-4">
//                                 <h3 className="font-semibold">Final Amount:</h3>
//                                 <p>&#x20B9; {calculateFinalAmount()}</p>
//                             </div>
//                         </div>
//                         <br />
//                         <button
//                             onClick={handleLogout}
//                             className="w-full py-2 px-4 bg-orange-600 text-white rounded-md"
//                         >
//                             Logout
//                         </button>
//                     </>
//                 ) : (
//                     <>
//                         <p>Loading user data...</p>
//                         <br />
//                         <button
//                             onClick={handleLogout}
//                             className="w-full py-2 px-4 bg-orange-600 text-white rounded-md"
//                         >
//                             Logout
//                         </button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserInfoModal;





import { useState, useEffect } from 'react';
import Api from '../constants/Api';
import { X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../Styles/UserInfoModal.css";

const UserInfoModal = ({ closeModal }) => {
    const [userData, setUserData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [amountOnSelectedDate, setAmountOnSelectedDate] = useState(0);
    const [amountOnCurrentDate, setAmountOnCurrentDate] = useState(0);

    useEffect(() => {
        // Fetch user data on component mount
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found.');
                return;
            }

            try {
                const data = await Api.getUserDetails(accessToken);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (userData) {
            setAmountOnCurrentDate(calculateAmountFromCurrentDate());
            setAmountOnSelectedDate(calculateAmount(selectedDate));
        }
    }, [userData, selectedDate]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('emailInitial');
        window.location.reload(); // Reload the page after logout
    };

    const calculateAmount = (date) => {
        if (!userData) return 0;

        const { amount_given, interest_rate, registered_at } = userData;

        // Calculate months passed since the selected date
        const selectedDateObj = new Date(date);
        const registeredDate = new Date(registered_at);
        const monthsPassed = Math.floor((selectedDateObj - registeredDate) / (1000 * 60 * 60 * 24 * 30));

        // Calculate time in years (since interest rate is annual)
        const timeInYears = monthsPassed / 12;

        // Calculate simple interest and the total amount
        const simpleInterest = amount_given * (interest_rate / 100) * timeInYears;
        const totalAmount = amount_given + simpleInterest;

        return totalAmount.toFixed(2);
    };

    const calculateAmountFromCurrentDate = () => {
        if (!userData) return 0;

        const { amount_given, interest_rate, registered_at } = userData;

        // Calculate months passed since the current date
        const currentDate = new Date();
        const registeredDate = new Date(registered_at);
        const monthsPassed = Math.floor((currentDate - registeredDate) / (1000 * 60 * 60 * 24 * 30));

        // Calculate time in years (since interest rate is annual)
        const timeInYears = monthsPassed / 12;

        // Calculate simple interest and the total amount
        const simpleInterest = amount_given * (interest_rate / 100) * timeInYears;
        const totalAmount = amount_given + simpleInterest;

        return totalAmount.toFixed(2);
    };

    const calculateFinalAmount = () => {
        if (!userData) return 0;

        const { amount_given, interest_rate, pricing_time_frame } = userData;

        // Calculate time in years (since interest rate is annual)
        const timeInYears = pricing_time_frame / 12;

        // Calculate simple interest and the total amount
        const simpleInterest = amount_given * (interest_rate / 100) * timeInYears;
        const totalAmount = amount_given + simpleInterest;

        return totalAmount.toFixed(2);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay z-50">
            <div className="modal user-info-modal shadow-lg p-6 w-full mx-4">
                <button className="modal-close" onClick={closeModal}>
                    <X />
                </button>
                <h2 className="text-center text-2xl font-bold mb-4">User Information</h2>
                {userData ? (
                    <>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="mb-2">
                                <h3 className="font-semibold">Name:</h3>
                                <p>{userData.first_name} {userData.last_name}</p>
                            </div>
                            <div className="mb-2">
                                <h3 className="font-semibold">Email:</h3>
                                <p>{userData.email}</p>
                            </div>
                            <div className="mb-2">
                                <h3 className="font-semibold">Phone Number:</h3>
                                <p>{userData.phone_number}</p>
                            </div>
                            <div className="mb-2">
                                <h3 className="font-semibold">Base Amount:</h3>
                                <p>&#x20B9; {userData.amount_given.toFixed(2)}</p>
                            </div>
                            <div className="mb-2">
                                <h3 className="font-semibold">Interest Rate:</h3>
                                <p>{userData.interest_rate}%</p>
                            </div>
                            <div className="mb-2">
                                <h3 className="font-semibold">Pricing Time Frame:</h3>
                                <p>{userData.pricing_time_frame} months</p>
                            </div>
                            <div className="mb-4">
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
                                        <div className="custom-datepicker-container">
                                            {children}
                                        </div>
                                    )}
                                />

                                <p>&#x20B9; {amountOnSelectedDate}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-semibold">Final Amount:</h3>
                                <p>&#x20B9; {calculateFinalAmount()}</p>
                            </div>
                        </div>
                        <br />
                        <button
                            onClick={handleLogout}
                            className="w-full py-2 px-4 bg-orange-600 text-white rounded-md"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <p>Loading user data...</p>
                        <br />
                        <button
                            onClick={handleLogout}
                            className="w-full py-2 px-4 bg-orange-600 text-white rounded-md"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserInfoModal;
