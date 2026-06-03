import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BadgeCheck,
  BookMarked,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Cloud,
  Factory,
  GalleryVerticalEnd,
  GraduationCap,
  HeartPulse,
  LayoutPanelTop,
  Mail,
  MessageCircleQuestion,
  MonitorSmartphone,
  PenLine,
  Presentation,
  Rocket,
  Route,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserRound,
  Wallet,
  Workflow,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  id: string;
  icon: LucideIcon;
};

export type NavSection = {
  /** Optional group label inside a dropdown (e.g. "Services") */
  heading?: string;
  items: NavItem[];
};

export type NavGroup = {
  type: "group";
  id: string;
  label: string;
  icon: LucideIcon;
  menuAlign: "start" | "center" | "end";
  sections: NavSection[];
};

export type NavLink = {
  type: "link";
  href: string;
  label: string;
  id: string;
};

export type NavBlock = NavGroup | NavLink;

export function flattenGroupItems(group: NavGroup): NavItem[] {
  return group.sections.flatMap((s) => s.items);
}

/** One-tap destinations on mobile */
export const MOBILE_QUICK_LINKS: NavItem[] = [
  {
    href: "/services",
    label: "Services",
    id: "quick-services",
    icon: Workflow,
  },
  {
    href: "/products",
    label: "Products",
    id: "quick-products",
    icon: LayoutPanelTop,
  },
  { href: "/work", label: "Work", id: "quick-work", icon: GalleryVerticalEnd },
  { href: "/contact", label: "Contact", id: "quick-contact", icon: Mail },
];

export const NAV_STRUCTURE: NavBlock[] = [
  {
    type: "group",
    id: "services",
    label: "Services",
    icon: Workflow,
    menuAlign: "center",
    sections: [
      {
        heading: "Services",
        items: [
          {
            href: "/services/web-development",
            label: "Web Development",
            id: "svc-web",
            icon: MonitorSmartphone,
          },
          {
            href: "/services/mobile-app-development",
            label: "Mobile App Development",
            id: "svc-mobile",
            icon: Smartphone,
          },
          {
            href: "/services/product-engineering",
            label: "Product Engineering",
            id: "svc-product",
            icon: Workflow,
          },
          {
            href: "/services/mvp-development",
            label: "MVP Development",
            id: "svc-mvp",
            icon: Rocket,
          },
          {
            href: "/services",
            label: "View All Services",
            id: "svc-all",
            icon: ArrowUpRight,
          },
        ],
      },
    ],
  },
  {
    type: "group",
    id: "products",
    label: "Products",
    icon: LayoutPanelTop,
    menuAlign: "center",
    sections: [
      {
        heading: "Products",
        items: [
          {
            href: "/products/cusown",
            label: "Cusown",
            id: "prod-cusown",
            icon: CalendarClock,
          },
          {
            href: "/products/freetrust",
            label: "FreeTrust",
            id: "prod-freetrust",
            icon: BadgeCheck,
          },
          {
            href: "/products",
            label: "View All Products",
            id: "prod-all",
            icon: ArrowUpRight,
          },
        ],
      },
    ],
  },
  {
    type: "group",
    id: "work",
    label: "Work",
    icon: GalleryVerticalEnd,
    menuAlign: "center",
    sections: [
      {
        heading: "Work",
        items: [
          {
            href: "/work",
            label: "Portfolio",
            id: "work-portfolio",
            icon: Presentation,
          },
          {
            href: "/case-studies",
            label: "Case Studies",
            id: "work-cases",
            icon: Sparkles,
          },
        ],
      },
    ],
  },
  {
    type: "group",
    id: "industries",
    label: "Industries",
    icon: Factory,
    menuAlign: "center",
    sections: [
      {
        heading: "Industries",
        items: [
          {
            href: "/industries/saas",
            label: "SaaS",
            id: "ind-saas",
            icon: Cloud,
          },
          {
            href: "/industries/startups",
            label: "Startups",
            id: "ind-startups",
            icon: Rocket,
          },
          {
            href: "/industries/healthcare",
            label: "Healthcare",
            id: "ind-health",
            icon: HeartPulse,
          },
          {
            href: "/industries/education",
            label: "Education",
            id: "ind-edu",
            icon: GraduationCap,
          },
          {
            href: "/industries/fintech",
            label: "FinTech",
            id: "ind-fintech",
            icon: Wallet,
          },
        ],
      },
    ],
  },
  {
    type: "group",
    id: "resources",
    label: "Resources",
    icon: BookMarked,
    menuAlign: "center",
    sections: [
      {
        heading: "Resources",
        items: [
          { href: "/blog", label: "Blog", id: "res-blog", icon: PenLine },
          {
            href: "/faq",
            label: "FAQ",
            id: "res-faq",
            icon: MessageCircleQuestion,
          },
          {
            href: "/process",
            label: "Process",
            id: "res-process",
            icon: Route,
          },
        ],
      },
    ],
  },
  {
    type: "group",
    id: "company",
    label: "Company",
    icon: Building2,
    menuAlign: "center",
    sections: [
      {
        heading: "Company",
        items: [
          { href: "/about", label: "About", id: "co-about", icon: UserRound },
          {
            href: "/careers",
            label: "Careers",
            id: "co-careers",
            icon: BriefcaseBusiness,
          },
          { href: "/contact", label: "Contact", id: "co-contact", icon: Mail },
        ],
      },
    ],
  },
];

export const FOOTER_LINKS = {
  services: [
    { href: "/services/web-development", label: "Web Development" },
    { href: "/services/product-engineering", label: "Product Engineering" },
    { href: "/services/mvp-development", label: "MVP Development" },
    { href: "/services", label: "All Services" },
  ],
  products: [
    { href: "/products/cusown", label: "Cusown" },
    { href: "/products/freetrust", label: "FreeTrust" },
    { href: "/products", label: "All Products" },
  ],
  resources: [
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/process", label: "Process" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/work", label: "Client Work" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/compliance", label: "Compliance" },
    { href: "/security", label: "Security" },
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/engagement-terms", label: "Engagement Terms" },
    { href: "/refund-policy", label: "Refund Policy" },
    { href: "/employment-policy", label: "Employment Policy" },
  ],
} as const;
