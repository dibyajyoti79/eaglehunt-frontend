import { useEffect, useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import emailjs from "@emailjs/browser";

const SubscribeModal = ({ closeModal, planName }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const serviceId = "service_2jff6b5";
    const templateId = "template_vebfc8q";
    const publicKey = "HD33bDqy3Co5QiXK4";
    if (!name || !contact || !amount || !plan) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: name,
          plan: plan,
          contact_number: contact,
          amount: amount,
        },
        {
          publicKey: publicKey,
        }
      );
      closeModal();
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setPlan(planName);
  }, [planName]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay z-50">
      <div className="modal shadow-lg">
        <h2 className="text-center">Your detail</h2>
        <button className="modal-close" onClick={closeModal}>
          <X />
        </button>
        <div className="space-y-4">
          <div>
            <label className="block">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="">
            <label className="block">Contact number</label>
            <input
              type={"text"}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="">
            <label className="block">Amount</label>
            <input
              type={"text"}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="">
            <label className="block">Plan</label>
            <input
              type={"text"}
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring"
              required
              readOnly
            />
          </div>
        </div>
        <p className="text-xs mt-5 ">
          By submitting this form, you agree to our{" "}
          <a
            href="/termsandcondition.html"
            target="_blank"
            className="text-blue-500"
          >
            Terms and Conditions
          </a>
        </p>
        <div className="w-full mt-4">
          <a
            href={`https://wa.me/916370500097?text=Name:%20${name}%0AContact%20Number:%20${contact}%0AAmount:%20${amount}%0APlan:%20${plan}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              onClick={handleSubmit}
              className={`bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-white w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;
