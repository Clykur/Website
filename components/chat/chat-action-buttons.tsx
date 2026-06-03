import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ChatAction, ChatRelatedPage } from "@/lib/ai/chat-types";

type ChatActionButtonsProps = {
  actions?: ChatAction[];
  relatedPages?: ChatRelatedPage[];
  className?: string;
  onQuickReply?: (text: string) => void;
  followUps?: string[];
};

export function ChatActionButtons({
  actions,
  relatedPages,
  followUps,
  className,
  onQuickReply,
}: ChatActionButtonsProps) {
  const hasActions = actions && actions.length > 0;
  const hasPages = relatedPages && relatedPages.length > 0;
  const hasFollowUps = followUps && followUps.length > 0 && onQuickReply;

  if (!hasActions && !hasPages && !hasFollowUps) return null;

  return (
    <div
      className={cn(
        "mt-3 space-y-3 border-t border-foreground/[0.06] pt-3",
        className,
      )}
    >
      {hasActions ? (
        <div className="flex flex-wrap gap-2">
          {actions!.map((action) => (
            <Link
              key={`${action.href}-${action.label}`}
              href={action.href}
              className={cn(
                "inline-flex min-h-[36px] items-center rounded-xl px-3.5 py-1.5 text-[12px] font-semibold tracking-[-0.01em] transition-transform hover:-translate-y-0.5",
                action.variant === "primary"
                  ? "bg-[#ff3b1f] text-white shadow-sm hover:bg-[#e6351c]"
                  : "border border-foreground/[0.1] bg-white/80 text-foreground/85 hover:border-foreground/[0.16]",
              )}
            >
              {action.label}
            </Link>
          ))}
        </div>
      ) : null}

      {hasPages ? (
        <div>
          <p className="mb-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground/38">
            Related pages
          </p>
          <ul className="flex flex-col gap-1">
            {relatedPages!.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-[12px] font-medium text-[#ff3b1f] underline-offset-2 hover:underline"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {hasFollowUps ? (
        <div>
          <p className="mb-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground/38">
            Suggested follow-ups
          </p>
          <div className="flex flex-wrap gap-1.5">
            {followUps!.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => onQuickReply!(q)}
                className="rounded-full border border-foreground/[0.1] bg-white/60 px-3 py-1 text-[11px] font-medium text-foreground/70 transition-colors hover:border-[#ff3b1f]/30 hover:text-[#ff3b1f]"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
