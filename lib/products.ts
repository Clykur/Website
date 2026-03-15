/**
 * Product ecosystem data for the marketing site.
 * Category-defining software products.
 */

export interface Product {
  name: string;
  tagline: string;
  description: string;
  problem: string;
  whyItMatters: string;
  url: string;
  image: string;
  benefits: string[];
}

export const PRODUCTS: Product[] = [
  {
    name: "Cusown",
    tagline: "Smart appointment and slot booking platform",
    image: "/Product Images/Cusown.png",
    description:
      "A modern scheduling platform that helps businesses manage bookings, appointments, and customer interactions efficiently. Built for service businesses that need reliability at scale.",
    problem:
      "Service businesses lose revenue to no-shows, double-bookings, and manual scheduling. Legacy tools don't scale.",
    whyItMatters:
      "When booking runs smoothly, businesses grow. Cusown turns scheduling into a competitive advantage.",
    url: "https://cusown.clykur.com",
    benefits: [
      "Automation of bookings and slot scheduling",
      "Customer management and retention",
      "Analytics and actionable insights",
      "Scalable SaaS infrastructure",
    ],
  },
  {
    name: "FreeTrust",
    tagline: "The Trust Layer Freelancing Deserves",
    image: "/Product Images/FreeTrust.png",
    description:
      "A platform designed to improve trust between freelancers and clients through transparent credibility and reputation validation. Institutional-grade protection for the future of work.",
    problem:
      "Freelancing runs on handshakes and hope. Both sides carry counterparty risk, and the best talent pays the price.",
    whyItMatters:
      "Trust is the missing infrastructure. FreeTrust gives freelancers and clients a shared layer of verification and security.",
    url: "https://trustbuilder.clykur.com",
    benefits: [
      "Freelancer trust infrastructure and credibility validation",
      "Transparent professional profiles",
      "Trust scoring systems",
      "Future blockchain verification layer",
    ],
  },
];
