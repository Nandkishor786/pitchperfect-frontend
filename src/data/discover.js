export const investors = [
  {
    id: 1,
    name: "Sarah Johnson",
    firm: "Sequoia Capital",
    verified: true,
    investorType: "vc",
    industries: ["saas", "ai", "enterprise"],
    stages: ["seed", "series-a"],
    ticketSize: {
      min: 500000,
      max: 2000000,
      label: "$500K – $2M",
    },
    location: {
      city: "San Francisco",
      country: "usa",
      region: "north-america",
    },
  },

  {
    id: 2,
    name: "Michael Chen",
    firm: "Andreessen Horowitz",
    verified: true,
    investorType: "vc",
    industries: ["fintech", "web3", "infrastructure"],
    stages: ["series-a", "series-b"],
    ticketSize: {
      min: 1000000,
      max: 5000000,
      label: "$1M – $5M",
    },
    location: {
      city: "Menlo Park",
      country: "usa",
      region: "north-america",
    },
  },

  {
    id: 3,
    name: "Ankit Verma",
    firm: "100x.VC",
    verified: false,
    investorType: "micro-vc",
    industries: ["consumer", "saas", "d2c"],
    stages: ["pre-seed", "seed"],
    ticketSize: {
      min: 100000,
      max: 500000,
      label: "$100K – $500K",
    },
    location: {
      city: "Bangalore",
      country: "india",
      region: "asia",
    },
  },

  {
    id: 4,
    name: "Ritika Shah",
    firm: "Angel Network India",
    verified: true,
    investorType: "angel",
    industries: ["healthtech", "edtech"],
    stages: ["pre-seed"],
    ticketSize: {
      min: 50000,
      max: 250000,
      label: "$50K – $250K",
    },
    location: {
      city: "Mumbai",
      country: "india",
      region: "asia",
    },
  },

  {
    id: 5,
    name: "David Miller",
    firm: "Accel Partners",
    verified: true,
    investorType: "vc",
    industries: ["saas", "cloud", "enterprise"],
    stages: ["series-a", "series-b"],
    ticketSize: {
      min: 2000000,
      max: 8000000,
      label: "$2M – $8M",
    },
    location: {
      city: "New York",
      country: "usa",
      region: "north-america",
    },
  },

  {
    id: 6,
    name: "Neha Kapoor",
    firm: "Kalaari Capital",
    verified: true,
    investorType: "vc",
    industries: ["fintech", "consumer", "saas"],
    stages: ["seed", "series-a"],
    ticketSize: {
      min: 300000,
      max: 1500000,
      label: "$300K – $1.5M",
    },
    location: {
      city: "Bangalore",
      country: "india",
      region: "asia",
    },
  },

  {
    id: 7,
    name: "Rohan Mehta",
    firm: "LetsVenture",
    verified: false,
    investorType: "angel",
    industries: ["edtech", "healthtech", "saas"],
    stages: ["pre-seed", "seed"],
    ticketSize: {
      min: 25000,
      max: 150000,
      label: "$25K – $150K",
    },
    location: {
      city: "Delhi",
      country: "india",
      region: "asia",
    },
  },

  {
    id: 8,
    name: "Emily Carter",
    firm: "First Round Capital",
    verified: true,
    investorType: "vc",
    industries: ["ai", "developer-tools", "saas"],
    stages: ["seed"],
    ticketSize: {
      min: 500000,
      max: 2000000,
      label: "$500K – $2M",
    },
    location: {
      city: "San Francisco",
      country: "usa",
      region: "north-america",
    },
  },

  {
    id: 9,
    name: "Arjun Malhotra",
    firm: "Blume Ventures",
    verified: true,
    investorType: "micro-vc",
    industries: ["agritech", "climate", "sustainability"],
    stages: ["pre-seed", "seed"],
    ticketSize: {
      min: 100000,
      max: 400000,
      label: "$100K – $400K",
    },
    location: {
      city: "Mumbai",
      country: "india",
      region: "asia",
    },
  },

  {
    id: 10,
    name: "Sophia Nguyen",
    firm: "Vertex Ventures",
    verified: true,
    investorType: "vc",
    industries: ["ecommerce", "marketplace", "saas"],
    stages: ["series-a", "series-b"],
    ticketSize: {
      min: 1500000,
      max: 6000000,
      label: "$1.5M – $6M",
    },
    location: {
      city: "Singapore",
      country: "singapore",
      region: "asia",
    },
  },
];

export const startups = [
  {
    id: "startup_1",
    name: "DataFlow AI",
    tagline: "AI-powered data analytics for enterprises",
    industries: ["saas", "ai", "enterprise"],
    stage: "series-a",
    fundingAsk: {
      min: 1500000,
      max: 2500000,
      label: "$1.5M – $2.5M",
    },
    teamSize: 15,
    location: {
      city: "San Francisco",
      country: "usa",
      region: "north-america",
    },
    traction: {
      revenue: "$50K MRR",
      users: "120+ enterprises",
      growth: "12% MoM",
    },
    verified: true,
  },

  {
    id: "startup_2",
    name: "HealthTrack",
    tagline: "Personal health monitoring platform",
    industries: ["healthtech", "mobile"],
    stage: "seed",
    fundingAsk: {
      min: 400000,
      max: 600000,
      label: "$400K – $600K",
    },
    teamSize: 8,
    location: {
      city: "Boston",
      country: "usa",
      region: "north-america",
    },
    traction: {
      revenue: "$10K MRR",
      users: "25K users",
      growth: "8% MoM",
    },
    verified: false,
  },

  {
    id: "startup_3",
    name: "PayEase",
    tagline: "Cross-border payments for SMBs",
    industries: ["fintech", "payments"],
    stage: "pre-seed",
    fundingAsk: {
      min: 150000,
      max: 300000,
      label: "$150K – $300K",
    },
    teamSize: 10,
    location: {
      city: "Bangalore",
      country: "india",
      region: "asia",
    },
    traction: {
      revenue: "Pre-revenue",
      users: "Pilot customers",
      growth: "N/A",
    },
    verified: true,
  },

  {
    id: "startup_4",
    name: "CloudSecure",
    tagline: "Cloud security platform for enterprises",
    industries: ["cybersecurity", "saas"],
    stage: "series-a",
    fundingAsk: {
      min: 3000000,
      max: 5000000,
      label: "$3M – $5M",
    },
    teamSize: 22,
    location: {
      city: "London",
      country: "uk",
      region: "europe",
    },
    traction: {
      revenue: "$120K MRR",
      users: "40 enterprises",
      growth: "15% MoM",
    },
    verified: true,
  },
  {
    id: "startup_5",
    name: "CloudSecure",
    tagline: "Cloud security platform for enterprises",
    industries: ["cybersecurity", "saas"],
    stage: "series-a",
    fundingAsk: {
      min: 50000,
      max: 250000,
      label: "$50K – $250K",
    },
    teamSize: 22,
    location: {
      city: "London",
      country: "uk",
      region: "europe",
    },
    traction: {
      revenue: "$120K MRR",
      users: "40 enterprises",
      growth: "15% MoM",
    },
    verified: true,
  },
  {
    id: "startup_6",
    name: "EduSpark",
    tagline: "Personalized AI learning platform for students",
    industries: ["edtech", "ai"],
    stage: "seed",
    fundingAsk: {
      min: 300000,
      max: 700000,
      label: "$300K – $700K",
    },
    teamSize: 12,
    location: {
      city: "New York",
      country: "usa",
      region: "north-america",
    },
    traction: {
      revenue: "$20K MRR",
      users: "15K students",
      growth: "10% MoM",
    },
    verified: true,
  },

  {
    id: "startup_7",
    name: "AgroPulse",
    tagline: "Smart farming insights using IoT and AI",
    industries: ["agritech", "ai", "iot"],
    stage: "pre-seed",
    fundingAsk: {
      min: 100000,
      max: 250000,
      label: "$100K – $250K",
    },
    teamSize: 6,
    location: {
      city: "Pune",
      country: "india",
      region: "asia",
    },
    traction: {
      revenue: "Pre-revenue",
      users: "Pilot with 40 farmers",
      growth: "Early traction",
    },
    verified: false,
  },

  {
    id: "startup_8",
    name: "FinNest",
    tagline: "AI-driven personal finance management app",
    industries: ["fintech", "mobile"],
    stage: "series-a",
    fundingAsk: {
      min: 2000000,
      max: 3500000,
      label: "$2M – $3.5M",
    },
    teamSize: 18,
    location: {
      city: "Toronto",
      country: "canada",
      region: "north-america",
    },
    traction: {
      revenue: "$90K MRR",
      users: "60K users",
      growth: "18% MoM",
    },
    verified: true,
  },

  {
    id: "startup_9",
    name: "MediLink",
    tagline: "Digital health records & telemedicine platform",
    industries: ["healthtech", "saas"],
    stage: "series-b",
    fundingAsk: {
      min: 6000000,
      max: 10000000,
      label: "$6M – $10M",
    },
    teamSize: 35,
    location: {
      city: "Berlin",
      country: "germany",
      region: "europe",
    },
    traction: {
      revenue: "$250K MRR",
      users: "120 hospitals",
      growth: "22% YoY",
    },
    verified: true,
  },

  {
    id: "startup_10",
    name: "ShopSwift",
    tagline: "Headless commerce platform for D2C brands",
    industries: ["ecommerce", "saas", "d2c"],
    stage: "seed",
    fundingAsk: {
      min: 500000,
      max: 1200000,
      label: "$500K – $1.2M",
    },
    teamSize: 14,
    location: {
      city: "Bangalore",
      country: "india",
      region: "asia",
    },
    traction: {
      revenue: "$35K MRR",
      users: "90 brands",
      growth: "14% MoM",
    },
    verified: false,
  },
];
