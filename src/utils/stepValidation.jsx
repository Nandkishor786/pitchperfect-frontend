// continue button of prefences diables rahe tab users kuch fileds fil nahi karata

export const isStepValid = (role, step, formData) => {
   if (step === 1) return true;

  // FOUNDER RULES
  if (role === "founder") {
    if (step === 2) {
      return (
        formData.industries.length > 0 &&
        formData.fundingStage !== "" &&
        formData.reasons.length > 0
      );
    }

    if (step === 3) {
      return formData.designation.trim() !== "";
    }
  }

  //  INVESTOR RULES
  if (role === "investor") {
    if (step === 2) {
      return (
        formData.industries.length > 0 &&
        formData.startupStage.length > 0 &&
        formData.goals.length > 0
      );
    }

    if (step === 3) {
      return (
        formData.designation.trim() !== "" && formData.firmName.trim() !== ""
      );
    }
  }

  return true;
};
