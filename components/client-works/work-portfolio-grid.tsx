import { WorkProjectCard } from "@/components/client-works/work-project-card";
import type { ClientWork } from "@/lib/client-works";

type WorkPortfolioGridProps = {
  works: readonly ClientWork[];
};

export function WorkPortfolioGrid({ works }: WorkPortfolioGridProps) {
  return (
    <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
      {works.map((work, index) => (
        <li key={work.href} data-reveal-item className="min-w-0">
          <WorkProjectCard
            work={work}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            priority={index < 6}
          />
        </li>
      ))}
    </ul>
  );
}
