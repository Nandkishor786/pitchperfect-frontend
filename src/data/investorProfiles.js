export const investorProfiles = [
  {
    userId: 1, // SAME AS CARD ID
    organizationType: "Venture Capital Fund",
    investmentType: "Equity",

    sectors: [
      "Food/Agriculture",
      "Manufacturing/Industry,",
      "Carbon Removal/Storage",
      "Waste Management",
      "Manufacturing",
      "Water/Oceans",
    ],

    returnGoals: "Seek to provide market/above market rate returns",
    alignmentWithValues: "Partial Alignment",
    totalAUM: "+ USD 500 Million",

    approachToImpact: {
      percentAUMAssessed: "100%",
      impactLead: "In house staff",
      sdgs: [
        "Zero hunger (SDG 2)",
        "Clean water and sanitation (SDG 6)",
        "Climate action (SDG 13)",
      ],
      attributingImpactShare: "Do not proportion/allocate impact in any way",
    },

    impactMethodologies: {
      preInvestmentScreen: "Other",
      ghgMethods: ["Our portfolio's footprint"],
      otherMethods: [
        "Assess environmental impact(s) beyond GHG",
        "Assess social impact(s)",
      ],
      publiclyReported: ["Realized GHG impact", "Social impacts"],
      projectionTimeframe: "6-10 years",
    },

    impactReport: "https://example.com/impact",
    website: "https://example.com",
  },
];
