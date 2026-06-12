export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  readingMinutes: number;
  sections: { heading: string; paragraphs: string[] }[];
};
