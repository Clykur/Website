import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const cardClassName =
  "rounded-xl border border-foreground/[0.08] bg-white px-6 py-6 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_12px_32px_-20px_rgba(10,10,10,0.08)] transition-colors duration-300 hover:border-foreground/[0.12] md:px-7 md:py-7";

type HomePremiumCardProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  descriptionClassName?: string;
};

export function HomePremiumCard({
  title,
  description,
  children,
  className,
  descriptionClassName,
}: HomePremiumCardProps) {
  return (
    <div className={cn(cardClassName, className)}>
      {children}
      <h3 className="font-poppins text-base font-medium leading-snug tracking-[-0.02em] text-foreground">
        {title}
      </h3>
      {description ? (
        <p
          className={cn(
            "mt-2.5 text-left text-[13px] leading-[1.75] text-foreground/50 [hyphens:manual] md:text-[14px]",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export { cardClassName as homePremiumCardClassName };
