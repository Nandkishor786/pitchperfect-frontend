const OnboardingProgress = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className=" w-full max-w-3xl mx-auto ">
      <p className="text-sm font-medium mb-2">
        Step {step} of {totalSteps}
      </p>
      <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width:`${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default OnboardingProgress;
