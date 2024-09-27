import { useEffect, useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import emailjs from "@emailjs/browser";
import dayjs from "dayjs";

const WithdrawModal = ({ closeModal, userProfile }) => {
  const handleSubmit = async () => {
    const serviceId = "service_2jff6b5";
    const templateId = "template_w2x829w";
    const publicKey = "HD33bDqy3Co5QiXK4";
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_name: userProfile.firstName,
          to_email: userProfile.email,
        },
        {
          publicKey: publicKey,
        }
      );
      closeModal();
    } catch (error) {
      console.log("error", error);
    }
  };

  const getText = () => {
    const [day, month, year] = userProfile.investmentDate
      .split("-")
      .map(Number);
    const investmentDateObj = new Date(year, month - 1, day);
    const [day1, month1, year1] = userProfile.maturityDate
      .split("-")
      .map(Number);

    const maturityDateObj = new Date(year1, month1 - 1, day1);

    // check if the lockin period is over which is 5 months
    const lockinPeriod = dayjs(investmentDateObj).add(5, "months");
    console.log(
      "dayjs(new Date()).isBefore(lockinPeriod)",
      dayjs(new Date()).isBefore(lockinPeriod)
    );
    // chcek if the current date is before the lockin period
    if (dayjs(new Date()).isBefore(lockinPeriod)) {
      return [
        "You are currently in the lock-in period. Please wait until it ends to withdraw your investment. You will be able to withdraw 5 months from the investment date. If you still wish to proceed, please contact us at 916370500097.",
        false,
      ];
    } else if (dayjs(new Date()).isBefore(dayjs(maturityDateObj))) {
      return [
        "You are about to withdraw your investment before the maturity date. Please note that this may result in a slight loss in returns. Would you like to proceed with the withdrawal?",
        true,
      ];
    } else if (
      dayjs(new Date()).isAfter(dayjs(maturityDateObj)) ||
      dayjs(new Date()).isSame(dayjs(maturityDateObj))
    ) {
      return [
        "You have reached the maturity date and can now withdraw your investment. Are you sure you want to proceed with the withdrawal?",
        true,
      ];
    } else {
      return [
        "No withdrawal allowed at this time, Please contact us at 916370500097.",
        false,
      ];
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay z-50">
      <div className="modal shadow-lg">
        <h2 className="text-center">Please Note</h2>
        <button className="modal-close" onClick={closeModal}>
          <X />
        </button>

        <p>{getText()[0]}</p>
        <div className="w-full mt-4">
          <a
            href={`https://wa.me/916370500097?text=I want to withdraw my investment`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              onClick={handleSubmit}
              className={`bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-white w-full ${
                !getText()[1] ? "opacity-30 cursor-not-allowed" : ""
              }`}
              disabled={!getText()[1]}
            >
              Submit
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
