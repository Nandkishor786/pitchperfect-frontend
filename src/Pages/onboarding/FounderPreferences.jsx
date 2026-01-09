import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingProgress from "./OnboardingProgress";
import { isStepValid } from "../../utils/stepValidation";
import api from "../../services/api";
import { getUserFromStorage } from "../../utils/auth";

const IndustriesData = [
  "AI & Machine Learning",
  "SaaS",
  "FinTech",
  "HealthTech",
  "EdTech",
  "E-commerce",
  "Blockchain",
  "CleanTech",
  "B2B",
  "B2C",
];
const Investor_Type = ["Angle", "VC", "Corporate"];
const Funding_stage = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"];

const reasons = ["Fundraising", "Networking", "Mentorship"];

const FounderPreferences = () => {
  const user = getUserFromStorage();

  const navigate = useNavigate();
  const totalSteps = 4;
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    industries: [],
    investors: [],
    fundingStage: "",
    ticketSize: "",
    geography: "",
    reasons: [],
    designation: "",
    startupName: "",
  });

  //to disable the contnue button in some steps
  const canContinue = isStepValid("founder", step, formData);

  // agar onboarding already complete hai → dashboard
  //Onboarding page ko sirf tab redirect karna chahiye jab:
  // preferences already completed ho
  // aur user onboarding ke first step par ho
  useEffect(() => {
    // Completed onboarding + fresh visit only
    if (user?.preferencesCompleted && step === 1) {
      navigate("/founder/dashboard", { replace: true });
    }
  }, [navigate, step, user]);
  //jab navigate reference change ho (rare case)
  //jab navigate reference change ho (rare case)

  //next handler
  const handleNext = () => {
    if (!canContinue) return;
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  //back handler
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  //Universal Toggle Function helper (checkbox multi-select)
  const toggleArrayValue = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? //kya item is field mein hai ya nahi
          prev[field].filter((v) => v !== value)
        : // Jab industry pehle se selected ho
          // (checkbox untick ho raha ho)
          [...prev[field], value],
      //Jab industry pehle select nahi ho
      // (checkbox tick ho raha ho)
    }));
  };

  /*  FINAL SUBMIT  */
  // const handleFinish = () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const updateUser = {
  //     ...user,
  //     preferencesCompleted: true,
  //     preferences: formData,
  //   };
  //   localStorage.setItem("user", JSON.stringify(updateUser));
  //   navigate("/founder/dashboard", { replace: true });
  // };

  //BACKEND
  const handleFinish = async () => {
    try {
      const res = await api.post("/onboarding/founder", {
        preferences: formData,
      });

      const updatedUserFromBackend = res.data.user;

      const existingUser = getUserFromStorage();

      const mergedUser = {
        ...existingUser, // name, email, role, token
        ...updatedUserFromBackend, // preferencesCompleted, preferences
      };

      localStorage.setItem("user", JSON.stringify(mergedUser));

      navigate("/founder/dashboard", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Founder onboarding failed");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center min-h-screen px-4 bg-gray-50 pt-16">
      {/* progress bar */}
      <OnboardingProgress step={step} totalSteps={totalSteps} />

      {/* cards */}
      <div className="border-2  w-full max-w-2xl mt-8 p-8 rounded-2xl shadow-md bg-white ">
        {/* card 1 */}
        {step === 1 && (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">
              Let’s personalize your experience
            </h2>
            <p className="text-gray-500">
              We’ll use your preferences to match you with the best investors.
            </p>

            <div className="bg-[#edf1ff] text-indigo-900 p-4 rounded-md text-sm text-left">
              <strong>Why preferences matter:</strong>Your preferences help us
              filter and recommend investors that align with your goals, saving
              you time and increasing your chances of success.
            </div>
          </div>
        )}
        {/* card 2 */}
        {step === 2 && (
          <div className="text-left space-y-1">
            <h2 className="text-2xl font-semibold">
              Tell us about your startup
            </h2>
            <p className="text-gray-600 text-base font-normal">
              Select the industries and preferences that match your startup
            </p>

            {/* industries */}
            <div>
              <h3 className="text-base font-medium py-2">
                Industries (Select all that apply)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {IndustriesData.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer hover:border-blue-500 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={formData.industries.includes(item)}
                      onChange={() => toggleArrayValue("industries", item)}
                      className="accent-blue-600"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Preferred Investor Type */}
            <div className="space-y-2">
              <h3 className="text-base font-medium">Preferred Investor Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Investor_Type.map((item) => (
                  <label
                    key={item}
                    className="border focus:outline-none px-4 py-3 rounded-xl flex items-center gap-2 hover:border-blue-500 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={formData.investors.includes(item)}
                      onChange={() => toggleArrayValue("investors", item)}
                      className="accent-blue-600 "
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Funding Stage   */}
            <div className="space-y-2">
              <h2 className="text-base font-medium ">Funding Stage </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                {Funding_stage.map((stage) => (
                  <label
                    key={stage}
                    className={`border focus:outline-none px-4 py-3 rounded-xl flex items-center gap-2 hover:border-blue-500 text-sm `}
                  >
                    <input
                      type="radio"
                      name="fundingStage"
                      value={stage}
                      checked={formData.fundingStage === stage}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          fundingStage: e.target.value,
                        }))
                      }
                    />
                    <span className="font-medium">{stage}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* ticket size and geography area  */}
            <div className="flex flex-col  gap-2">
              <label className="text-sm font-medium pt-2">
                Ticket Size Range
              </label>
              <input
                type="text"
                value={formData.ticketSize}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ticketSize: e.target.value,
                  }))
                }
                placeholder="eg., $100K - $500K"
                className="text-sm border focus:outline-none hover:border-blue-500 px-4 py-3 rounded-xl"
              />
            </div>
            <div className="flex flex-col  gap-2">
              <label className="text-sm font-medium pt-2">
                Geography Preference
              </label>
              <input
                type="text"
                value={formData.geography}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    geography: e.target.value,
                  }))
                }
                placeholder="eg., San Frasisco bay area"
                className="text-sm border focus:outline-none hover:border-blue-500 px-4 py-3 rounded-xl"
              />
            </div>
            {/* why */}
            <div>
              <h3 className="font-medium mb-3">
                Why are you joining PitchPerfect?
              </h3>
              <div className="space-y-2">
                {reasons.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition
              ${
                formData.reasons.includes(reason)
                  ? "border-indigo-600 bg-indigo-50"
                  : "hover:border-gray-400"
              }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.reasons.includes(reason)}
                      onChange={() => toggleArrayValue("reasons", reason)}
                      className="accent-indigo-600"
                    />
                    <span className="font-medium">{reason}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* card 3 */}
        {step === 3 && (
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Complete your profile</h2>
            <p className="text-base font-normal text-gray-600">
              Add a few more details to finish setting up
            </p>
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium ">Designation</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    designation: e.target.value,
                  }))
                }
                placeholder="eg., CEO,CTO"
                className="text-sm border rounded-xl px-4 py-3 focus:outline-none hover:border-blue-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-base">
                Startup Name (Optional)
              </label>
              <input
                type="text"
                placeholder="eg., NeuralStack"
                value={formData.startupName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startupName: e.target.value,
                  }))
                }
                className="text-sm border rounded-xl px-4 py-3 focus:outline-none  hover:border-blue-300"
              />
            </div>
          </div>
        )}
        {/* card 4 */}
        {step === 4 && (
          <div className="flex flex-col items-center gap-4">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-20 w-20 text-green-500"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              {" "}
              You're all set!
            </h2>
            <p className="text-base text-gray-600 text-center">
              Your profile is complete. Start discovering investors now.
            </p>
          </div>
        )}

        {/* buttons */}
        <div className="w-full pt-2">
          {/* continue-back buttons */}

          <div
            className="flex w-full justify-center gap-8 
            items-center pt-4"
          >
            {step > 1 && step < 4 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-8 py-3 rounded-lg text-black bg-white  dark:text-white hover:bg-gray-200  transition-all duration-300 w-1/2 border border-gray-400"
              >
                Back
              </button>
            )}
            {step < 4 && (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canContinue}
                className={` px-8 py-3 rounded-lg dark:text-white   transition-all duration-300 ${
                  step === 1 ? "w-full" : "w-1/2"
                } 
                ${
                  canContinue
                    ? "bg-primary hover:bg-indigo-800hover:text-white/60 text-white "
                    : "bg-indigo-400 cursor-not-allowed text-white"
                }
                `}
              >
                Continue
              </button>
            )}
          </div>

          {/* Dashboard button*/}
          {step === 4 && (
            <button
              type="button"
              onClick={handleFinish}
              className="bg-primary px-8 py-3 rounded-lg text-white dark:text-white hover:bg-indigo-800 hover:text-white/60  transition-all duration-300 w-full"
            >
              Go To Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FounderPreferences;
