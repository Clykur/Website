export type SeoPageKind =
  | "service"
  | "product"
  | "industry"
  | "programmatic"
  | "hub";

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoContentSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type SeoBreadcrumbItem = {
  label: string;
  href: string;
};

export type SeoRelatedLink = {
  href: string;
  label: string;
  description?: string;
};

export type SeoCaseStudyHighlight = {
  title: string;
  challenge: string;
  approach: string;
  result: string;
  metric?: string;
};

export type SeoLandingPage = {
  kind: SeoPageKind;
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  lede: string;
  keywords: string[];
  breadcrumbs: SeoBreadcrumbItem[];
  sections: SeoContentSection[];
  faqs: SeoFaqItem[];
  relatedLinks: SeoRelatedLink[];
  caseStudy?: SeoCaseStudyHighlight;
  serviceName?: string;
};
