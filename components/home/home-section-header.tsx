import { cn } from "@/lib/utils";

type HomeSectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  titleId: string;
  className?: string;
  /** Section intros beside large headings read better left-aligned. */
  descriptionAlign?: "left" | "justify";
};

export function HomeSectionHeader({
  eyebrow,
  title,
  description,
  titleId,
  className,
  descriptionAlign = "justify",
}: HomeSectionHeaderProps) {
  return (
    <header data-reveal-item className={className ?? "mb-10 md:mb-12"}>
      <div className="mb-4 flex items-center gap-4">
        <span
          className="h-px w-12 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-transparent"
          aria-hidden
        />
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/42">
          {eyebrow}
        </p>
      </div>
      <h2
        id={titleId}
        className="font-poppins text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.03em] text-foreground"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-foreground/48 md:text-base",
            descriptionAlign === "justify"
              ? "text-justify [hyphens:auto]"
              : "text-left [hyphens:manual]",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
