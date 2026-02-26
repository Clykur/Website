export const CAREERS_EMAIL = "info@clykur.com";

export type EmploymentType = "Full-time" | "Part-time" | "Contract";
export type LocationType = "Remote" | "Hybrid" | "On-site";

export interface CareerRole {
  id: string;
  title: string;
  team: string;
  employmentType: EmploymentType;
  location: LocationType;
  industry: string;
  description: string[];
  requirements: string[];
  qualifications: string[];
}

export function getApplicationEmail(role: CareerRole): { subject: string; body: string } {
  const subject = `Application: ${role.title} - Clykur`;
  const requirementLines =
    role.requirements.length > 0
      ? role.requirements.map((r, i) => `${i + 1}. ${r}: `).join("\n")
      : "";
  const body = `Hi,

I'd like to apply for the ${role.title} role at Clykur. My resume is attached.

How I meet the requirements:
${requirementLines}

Happy to discuss further.

Thanks,
[Your name]
[Your email]
[Your phone]`;
  return { subject, body };
}

export function getMailtoUrl(role: CareerRole): string {
  const { subject, body } = getApplicationEmail(role);
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const TEAMS = ["All", "Engineering", "Product", "Design", "Operations"] as const;
export const EMPLOYMENT_TYPES = ["All", "Full-time", "Part-time", "Contract"] as const;
export const LOCATIONS = ["All", "Remote", "Hybrid", "On-site"] as const;

export const ROLES: CareerRole[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    team: "Engineering",
    employmentType: "Full-time",
    location: "Remote",
    industry: "Technology, Information and Internet",
    description: [
      "This is a full-time remote role for a Software Engineer. You will design, develop, and maintain software applications with a focus on back-end development and programming.",
      "Key responsibilities include implementing object-oriented programming (OOP) concepts, working with cross-functional teams, and contributing to software solutions that align with project goals and client requirements.",
      "You will work independently in a remote environment while staying aligned with the team and delivery timelines.",
    ],
    requirements: [
      "Bachelor\u2019s degree in Computer Science, Software Engineering, or a related field",
      "1+ year hands-on experience with Next.js",
      "1+ year hands-on experience with React.js",
      "1+ year hands-on experience with Python",
      "1+ year experience with databases (SQL or NoSQL)",
      "Comfortable working in a fully remote setting",
    ],
    qualifications: [
      "Strong foundation in Computer Science: data structures, algorithms, and software design",
      "Experience in back-end web development and software development frameworks",
      "Proficiency in programming and object-oriented programming (OOP)",
      "Problem-solving mindset, analytical thinking, and collaborative teamwork",
      "Familiarity with cloud technologies and AI (plus)",
      "Ability to work independently and meet project deadlines",
    ],
  },
];
