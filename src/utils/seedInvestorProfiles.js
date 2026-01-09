//to save investorprofile mock data into local
import { investorProfiles } from "../data/investorProfiles";

export const seedInvestorProfiles = () => {
  const existing = localStorage.getItem("investorProfiles");

  if (!existing) {
    localStorage.setItem("investorProfiles", JSON.stringify(investorProfiles));
  }
};
