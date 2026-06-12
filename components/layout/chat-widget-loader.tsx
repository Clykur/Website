"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChatWidgetPanel = dynamic(
  () =>
    import("@/components/ui/chat-widget").then((m) => ({
      default: m.ChatWidget,
    })),
  { ssr: false, loading: () => null },
);

/**
 * Loads the chat UI after idle or first interaction so AI SDK + markdown
 * stay off the critical path.
 */
export function ChatWidget() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const activate = () => setReady(true);

    let idleId: number | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(activate, { timeout: 4500 });
    } else {
      idleId = window.setTimeout(activate, 4500) as unknown as number;
    }

    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    events.forEach((e) =>
      window.addEventListener(e, activate, { once: true, passive: true }),
    );

    return () => {
      if (typeof idleId === "number") {
        window.cancelIdleCallback?.(idleId);
        clearTimeout(idleId);
      }
      events.forEach((e) => window.removeEventListener(e, activate));
    };
  }, [ready]);

  if (!ready) return null;
  return <ChatWidgetPanel />;
}
