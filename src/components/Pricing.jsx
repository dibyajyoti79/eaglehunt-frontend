import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { pricingOptions } from "../constants";
import SubscribeModal from "./SubscribeModal";

const Pricing = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
        Pricing
      </h2>
      <div className="flex flex-wrap">
        {pricingOptions.map((option, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/4 p-2 hover:scale-105 transition duration-200 hover:shadow-lg"
          >
            <div className="p-10 border border-neutral-700 rounded-xl">
              <p className="text-3xl text-center mb-4">{option.plan}</p>
              <p className="text-xl text-center mb-4">
                ({option.duration} Plan)
              </p>
              <p className="mb-8 text-center">
                <span className="text-5xl mt-6 mr-2">{option.price}</span>
                {/* <span className="text-neutral-400 tracking-tight">/Month</span> */}
              </p>
              <ul>
                {option.features.map((feature, index) => (
                  <li key={index} className="mt-8 flex items-center">
                    <CheckCircle2 />
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="relative">
                <span
                  // href={`https://wa.me/916370500097?text=I%20am%20interested%20in%20${option.plan}%20plan.`}
                  className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl hover:bg-orange-900 border border-orange-900 rounded-lg transition duration-200 cursor-pointer"
                  // target="_blank"
                  rel="noopener noreferrer"
                  // onMouseEnter={() => setIsTooltipVisible(true)}
                  // onMouseLeave={() => setIsTooltipVisible(false)}
                  onClick={() => setIsSubscribeModalOpen(true)}
                >
                  Subscribe
                </span>
                {isTooltipVisible && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 bg-gray-800 text-white text-sm rounded py-1 px-2">
                    Need to have WhatsApp installed on your device
                  </div>
                )}
                {isSubscribeModalOpen && (
                  <SubscribeModal
                    closeModal={() => setIsSubscribeModalOpen(false)}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
