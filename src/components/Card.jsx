import React, { useState } from "react";
import {
  CreditCard,
  Lock,
  User,
  Calendar,
  KeyRound,
} from "lucide-react";

const Card = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [focused, setFocused] = useState("");

  const formatCardNumber = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    return cleaned.length >= 3
      ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
      : cleaned;
  };

  return (
    <div className="w-full flex justify-center px-4 py-10">

      {/* MAIN WRAPPER */}
      <div className="w-full max-w-lg">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Secure Checkout
          </h1>
          <p className="text-sm text-gray-300 flex items-center justify-center gap-2 mt-1">
            <Lock size={14} /> Visa / Card Payment • Carl Automotive
          </p>
        </div>

        {/* GLASS CARD CONTAINER */}
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-[28px] shadow-2xl p-8 space-y-6">

          {/* CARD NUMBER */}
          <div>
            <label className="text-xs text-gray-300">
              Card Number
            </label>

            <div className={`flex items-center gap-3 mt-2 px-5 py-4 rounded-2xl border transition-all
              ${focused === "number"
                ? "border-cyan-400 bg-white/15"
                : "border-white/20 bg-white/5"}`}>

              <CreditCard size={18} className="text-cyan-300" />

              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                maxLength={19}
                onFocus={() => setFocused("number")}
                onBlur={() => setFocused("")}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                className="bg-transparent outline-none w-full text-base tracking-widest text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* CARD HOLDER */}
          <div>
            <label className="text-xs text-gray-300">
              Card Holder Name
            </label>

            <div className={`flex items-center gap-3 mt-2 px-5 py-4 rounded-2xl border transition-all
              ${focused === "holder"
                ? "border-cyan-400 bg-white/15"
                : "border-white/20 bg-white/5"}`}>

              <User size={18} className="text-cyan-300" />

              <input
                type="text"
                placeholder="John Doe"
                value={cardHolder}
                onFocus={() => setFocused("holder")}
                onBlur={() => setFocused("")}
                onChange={(e) =>
                  setCardHolder(e.target.value.toUpperCase())
                }
                className="bg-transparent outline-none w-full text-base text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* EXPIRY + CVV */}
          <div className="grid grid-cols-2 gap-4">

            {/* EXPIRY */}
            <div>
              <label className="text-xs text-gray-300">
                Expiry
              </label>

              <div className={`flex items-center gap-3 mt-2 px-5 py-4 rounded-2xl border transition-all
                ${focused === "expiry"
                  ? "border-cyan-400 bg-white/15"
                  : "border-white/20 bg-white/5"}`}>

                <Calendar size={18} className="text-cyan-300" />

                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  maxLength={5}
                  onFocus={() => setFocused("expiry")}
                  onBlur={() => setFocused("")}
                  onChange={(e) =>
                    setExpiry(formatExpiry(e.target.value))
                  }
                  className="bg-transparent outline-none w-full text-base text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* CVV */}
            <div>
              <label className="text-xs text-gray-300">
                CVV
              </label>

              <div className={`flex items-center gap-3 mt-2 px-5 py-4 rounded-2xl border transition-all
                ${focused === "cvv"
                  ? "border-cyan-400 bg-white/15"
                  : "border-white/20 bg-white/5"}`}>

                <KeyRound size={18} className="text-cyan-300" />

                <input
                  type="password"
                  placeholder="***"
                  value={cvv}
                  maxLength={4}
                  onFocus={() => setFocused("cvv")}
                  onBlur={() => setFocused("")}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, ""))
                  }
                  className="bg-transparent outline-none w-full text-base text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* PAY BUTTON (FIXED UX) */}
          <button
            className="
              w-full mt-6 py-4 rounded-2xl
              bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600
              text-white font-bold text-lg
              shadow-lg shadow-cyan-500/30
              hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-300
            "
          >
            Pay Securely
          </button>

          {/* FOOTER */}
          <p className="text-center text-xs text-gray-400 pt-2">
            Secure SSL encrypted checkout • Carl Automotive
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;