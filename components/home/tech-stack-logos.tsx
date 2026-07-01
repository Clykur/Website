import type { TECH_STACK_ITEMS } from "@/lib/home-ai-native-content";
import { cn } from "@/lib/utils";

/** Local brand SVG marks in `public/tech/`. */
export const TECH_STACK_LOGO_SRC: Record<
  (typeof TECH_STACK_ITEMS)[number],
  string
> = {
  OpenAI: "/tech/openai.svg",
  Anthropic: "/tech/anthropic.svg",
  Gemini: "/tech/googlegemini.svg",
  Supabase: "/tech/supabase.svg",
  "Next.js": "/tech/nextdotjs.svg",
  React: "/tech/react.svg",
  "Node.js": "/tech/nodedotjs.svg",
  Python: "/tech/python.svg",
  Git: "/tech/git.svg",
  PostgreSQL: "/tech/postgresql.svg",
  AWS: "/tech/aws.svg",
  Vercel: "/tech/vercel.svg",
  Docker: "/tech/docker.svg",
  Kubernetes: "/tech/kubernetes.svg",
};

type TechStackLogoProps = {
  name: (typeof TECH_STACK_ITEMS)[number];
  className?: string;
};

export function TechStackLogo({ name, className }: TechStackLogoProps) {
  const src = TECH_STACK_LOGO_SRC[name];

  return (
    // eslint-disable-next-line @next/next/no-img-element -- local brand SVGs; crisp at any DPR
    <img
      src={src}
      alt=""
      width={96}
      height={24}
      loading="lazy"
      decoding="async"
      className={cn(
        "h-7 w-auto max-w-[4.5rem] object-contain object-center md:h-8 md:max-w-[5rem]",
        name === "AWS" || name === "PostgreSQL"
          ? "max-w-[3.75rem] md:max-w-[4.25rem]"
          : null,
        className,
      )}
    />
  );
}
