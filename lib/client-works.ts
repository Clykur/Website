export type ClientWork = {
  name: string;
  href: string;
  tagline: string;
  category: string;
  image: string;
};

export const CLIENT_WORKS: readonly ClientWork[] = [
  {
    name: "Yogisthaan Cafe",
    href: "https://yogisthaancafe.clykur.com",
    tagline: "A sanctuary in the middle of the city.",
    category: "Café & Wellness Experience",
    image:
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1600&q=88",
  },
  {
    name: "Pavan Travels",
    href: "https://pavantravels.vercel.app",
    tagline: "Trusted chauffeured travel with elegance.",
    category: "Travel & Transport",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=88",
  },
  {
    name: "Aurelia Visuals",
    href: "https://aureliavisuals.clykur.com",
    tagline: "We capture stories that sell.",
    category: "Photography & Branding",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=88",
  },
];
