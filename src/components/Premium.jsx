import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Premium = () => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };
  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          membershipType: type,
        },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "ConnectwMe",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("PAYMENT ERROR FULL:", err);
      console.error("BACKEND MESSAGE:", err.response?.data);

      alert(err.response?.data?.message || "Payment failed");
    }
  };
  return isPremiumUser ? (
    <div className="flex justify-center mt-20">
      <h2 className="text-2xl font-bold text-green-500 bg-green-100 px-6 py-3 rounded-full shadow">
        🎉 You’re already a Premium Member
      </h2>
    </div>
  ) : (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-10 my-20">
      {/* ================= GOLD PLAN ================= */}
      <div className="relative card w-96 bg-gradient-to-br from-yellow-100 to-yellow-50 shadow-xl hover:scale-105 transition-all duration-300 border border-yellow-400">
        {/* Badge */}
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 badge badge-warning px-4 py-2 shadow-md">
          ⭐ Most Popular
        </span>

        <div className="card-body">
          <h2 className="text-3xl font-extrabold text-yellow-700 text-center">
            Gold Pass
          </h2>

          <p className="text-center text-4xl font-bold text-yellow-600 mt-2">
            ₹700
            <span className="text-base font-medium text-gray-600">
              {" "}
              / month
            </span>
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex items-center gap-3 text-success">
              ✔ Unlimited Chat Access
            </li>
            <li className="flex items-center gap-3 text-success">
              ✔ AI Smart Chatbot
            </li>
            <li className="flex items-center gap-3 text-success">
              ✔ 100 Daily Swipes
            </li>
            <li className="flex items-center gap-3 text-success">
              ✔ Priority Matches
            </li>

            <li className="opacity-50 line-through">Video Call Support</li>
          </ul>

          <button
            className="btn btn-warning btn-block mt-8 text-lg font-semibold"
            onClick={() => handleBuyClick("gold")}
          >
            Upgrade to Gold 🚀
          </button>
        </div>
      </div>

      {/* ================= SILVER PLAN ================= */}
      <div className="card w-96 bg-base-100 shadow-lg hover:scale-105 transition-all duration-300 border border-base-300">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Silver Pass</h2>

          <p className="text-center text-4xl font-bold mt-2">
            ₹300
            <span className="text-base font-medium text-gray-600">
              {" "}
              / month
            </span>
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex items-center gap-3 text-success">
              ✔ Chat Access
            </li>
            <li className="flex items-center gap-3 text-success">
              ✔ AI Chatbot
            </li>
            <li className="flex items-center gap-3 text-success">
              ✔ 30 Daily Swipes
            </li>

            <li className="opacity-50 line-through">Priority Matches</li>
            <li className="opacity-50 line-through">Unlimited Swipes</li>
          </ul>

          <button
            className="btn btn-primary btn-block mt-8 text-lg"
            onClick={() => handleBuyClick("silver")}
          >
            Choose Silver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
