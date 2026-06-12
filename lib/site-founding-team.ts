export type FoundingTeamMember = {
  id: string;
  name: string;
  role: string;
  linkedIn: string;
  imageSrc: string;
  imageAlt: string;
  /** Tailwind object-position for portrait crop */
  imagePosition?: string;
};

export const CLYKUR_FOUNDING_TEAM: FoundingTeamMember[] = [
  {
    id: "chandu-kalluru",
    name: "Chandu Kalluru",
    role: "Founder",
    linkedIn: "https://www.linkedin.com/in/chandu-kalluru/",
    imageSrc: "/images/founding-team/chandu-kalluru.jpg",
    imageAlt: "Chandu Kalluru, Founder of Clykur",
    imagePosition: "center 22%",
  },
  {
    id: "karthik-naramala",
    name: "Karthik Naramala",
    role: "Co-founder",
    linkedIn: "https://www.linkedin.com/in/venkata-karthik-naramala/",
    imageSrc: "/images/founding-team/karthik-naramala.jpg",
    imageAlt: "Karthik Naramala, Co-founder of Clykur",
    imagePosition: "center 8%",
  },
];
