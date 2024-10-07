import {
  BotMessageSquare,
  Fingerprint,
  ShieldHalf,
  Scale,
  GlobeLock,
  ShieldCheck,
  Lock,
  Lightbulb,
  Eye,
} from "lucide-react";

// import user1 from "../assets/profile-pictures/user1.jpg";
// import user2 from "../assets/profile-pictures/user2.jpg";
// import user3 from "../assets/profile-pictures/user3.jpg";
// import user4 from "../assets/profile-pictures/user4.jpg";
// import user5 from "../assets/profile-pictures/user5.jpg";
// import user6 from "../assets/profile-pictures/user6.jpg";

import teamMember1 from "../assets/teamMember1.png";
import teamMember2 from "../assets/teamMember2.png";
import teamMember3 from "../assets/teamMember3.png";

export const navItems = [
  { label: "Belief", href: "#belief" },
  { label: "Goals", href: "#goals" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  // { label: "Teams", href: "#teams" },
];

export const testimonials = [
  {
    user: "Jagannath Behera",
    company: "Stellar Solutions",
    image: teamMember1,
    text: "I invested ₹20,000 with Eagle Hunt Capitalist for 6 months and received ₹22,400 back, a 12% return exactly as promised. A fantastic way to grow my savings in a smooth manner!",
  },
  {
    user: "Biswajit Chakraborty",
    company: "Blue Horizon Technologies",
    image: teamMember2,
    text: "Last year, I invested ₹30,000 with Eagle Hunt Capitalist for 12 months. My investment grew to ₹37,500 at a 25% return. Their service and support made my experience remarkable and easy!",
  },
  {
    user: "Tushar Mahuri",
    company: "Finable",
    image: teamMember3,
    text: "I took a leap and invested ₹40,000 for 2 years with Eagle Hunt Capitalist. My investment grew to ₹62,000, a 55% return. The growth exceeded expectations and proved their expertise!",
  },
  {
    user: "Ankita Roy",
    company: "NextWave Innovations",
    image: teamMember3,
    text: "I decided to invest ₹50,000 with Eagle Hunt Capitalist for 3 years, and my return was ₹85,000, a 70% growth. Their professionalism and consistent results are truly commendable!",
  },
  {
    user: "Rahul Sharma",
    company: "TechSphere Solutions",
    image: teamMember3,
    text: "Eagle Hunt Capitalist helped me grow my investment of ₹60,000  over 4 years, an 80% return. I couldn't be more satisfied with their strategic approach and expertise!",
  },
];

export const beliefs = [
  {
    icon: <Fingerprint />, // Represents uniqueness and integrity
    text: "Integrity",
    description:
      "Uphold honesty and transparency in all dealings, ensuring trust and reliability in every transaction.",
  },
  {
    icon: <ShieldCheck />, // Represents responsibility and accountability
    text: "Accountability",
    description:
      "Take responsibility for all actions and decisions, maintaining high ethical standards and delivering on promises.",
  },
  {
    icon: <BotMessageSquare />, // Represents communication and client-centricity
    text: "Client-Centricity",
    description:
      "Prioritize the interests of clients, offering personalized advice and solutions that align with their financial goals.",
  },
  {
    icon: <Eye />, // Represents energy and transparency
    text: "Transparency",
    description:
      "Maintain clear and open communication with clients and stakeholders, providing them with all necessary information to make informed decisions.",
  },
  {
    icon: <GlobeLock />, // Represents security and stewardship
    text: "Stewardship",
    description:
      "Manage resources responsibly, considering the long-term impact on clients, communities, and the environment.",
  },
  {
    icon: <ShieldHalf />, // Represents protection and professionalism
    text: "Professionalism",
    description:
      "Commit to continuous learning and development, ensuring high levels of expertise, competence, and ethical conduct.",
  },
  {
    icon: <Scale />, // Represents fairness and balance
    text: "Fairness",
    description:
      "Treat all clients, partners, and employees with equity, ensuring equal opportunities and unbiased decision-making.",
  },
  {
    icon: <Lock />, // Represents security and confidentiality
    text: "Confidentiality",
    description:
      "Safeguard client information with the utmost discretion, respecting their privacy and protecting their financial data.",
  },
  {
    icon: <Lightbulb />, // Represents creativity and innovation
    text: "Innovation",
    description:
      "Encourage forward-thinking and creativity to provide clients with cutting-edge financial solutions while adhering to ethical standards.",
  },
];

export const checklistItems = [
  {
    title: "Mission",
    description:
      "Empower individuals and institutions with trusted, innovative, and personalized investment solutions that build lasting wealth. We uphold the highest standards of integrity, accountability, and client-centric service, ensuring every decision is aligned with our commitment to excellence and long-term success. Our mission is to guide clients towards financial growth while maintaining transparency and ethical conduct.",
  },
  {
    title: "Vision",
    description:
      "Aspire to be the leading global investment company, known for our unwavering commitment to ethical practices, client satisfaction, and sustainable growth. We aim to shape a more prosperous future for our clients and the communities we serve, ensuring every action contributes to long-term success and positive impact. Our dedication to excellence drives us to set new industry standards.",
  },
];

export const pricingOptions = [
  {
    plan: "Bronze",
    duration: "6 Month",
    price: "12% ROI",
    features: [
      "Private Investment Management",
      "Dedicated Account Manager",
      "Monthly Performance Reports",
      "24/7 Customer Support",
    ],
  },
  {
    plan: "Silver",
    duration: "12 Month",
    price: "25% ROI",
    features: [
      "Private Investment Management",
      "Dedicated Account Manager",
      "Monthly Performance Reports",
      "Exclusive Market Insights",
    ],
  },
  {
    plan: "Gold",
    duration: "18 Month",
    price: "38% ROI",
    features: [
      "Private Investment Management",
      "Priority Account Handling",
      "Quarterly Performance Reviews",
      "Personalized Investment Strategies",
    ],
  },
  {
    plan: "Diamond",
    duration: "24 Month",
    price: "55% ROI",
    features: [
      "Private Investment Management",
      "Complete VIP Account Access",
      "Quarterly Performance Reviews",
      "Comprehensive Financial Planning",
    ],
  },
];

export const teams = [
  {
    name: "Alice Johnson",
    position: "CEO & Founder",
    image: teamMember1,
    bio: "Alice is the visionary behind our company, leading with passion and a commitment to excellence. With over 15 years of experience in the industry, she ensures our company stays ahead of the curve.",
    social: {
      linkedin: "https://www.linkedin.com/in/alicejohnson",
      facebook: "https://www.facebook.com/alicejohnson",
      twitter: "https://twitter.com/alicejohnson",
      instagram: "https://www.instagram.com/alicejohnson",
    },
  },
  {
    name: "Michael Brown",
    position: "Chief Financial Officer",
    image: teamMember2,
    bio: "Michael oversees the financial operations, bringing a wealth of knowledge in strategic planning and financial management. His expertise is crucial in driving our financial growth.",
    social: {
      linkedin: "https://www.linkedin.com/in/michaelbrown",
      facebook: "https://www.facebook.com/michaelbrown",
      twitter: "https://twitter.com/michaelbrown",
      instagram: "https://www.instagram.com/michaelbrown",
    },
  },
  {
    name: "Sarah Williams",
    position: "Head of Marketing",
    image: teamMember3,
    bio: "Sarah leads our marketing team with creativity and innovation, ensuring our brand reaches the right audience with the right message. Her strategies have consistently delivered impressive results.",
    social: {
      linkedin: "https://www.linkedin.com/in/sarahwilliams",
      facebook: "https://www.facebook.com/sarahwilliams",
      twitter: "https://twitter.com/sarahwilliams",
      instagram: "https://www.instagram.com/sarahwilliams",
    },
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
