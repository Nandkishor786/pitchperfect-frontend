// Dashboard ke liye fake (dummy) data laata hai jaise backend se aa raha ho
export const fetchFounderDashboardStats = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;

      if (success) {
        resolve({
          profileViews: 1247,
          profileViewsChange: "+12% from last month",

          pitchesSent: 24,
          pitchesThisWeek: "+3 this week",

          interestedInvestors: 8,
          newInterested: "+2 new",

          responseRate: "33%",
          responseImprovement: "+5% improvement",
        });
      } else {
        reject("Failed to fetch dashboard data");
      }
    }, 1000); // fake loading delay(800ms wait then data comes on dashboard)
  });
};

// Ye function Promise return karta hai
// Promise = “Data abhi nahi, thodi der baad milega”
// React me API calls async hote hain, isliye Promise
// Real life:
// Swiggy order → “Food aa raha hai, wait karo”
