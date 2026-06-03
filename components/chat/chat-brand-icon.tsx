import Image from "next/image";
import { cn } from "@/lib/utils";

/** Flaticon bot icon (free license; attribution in chat footer). */
export const CHATBOT_ICON_SRC = "/chatbot-bot.png";

/** Tint icon to Clykur brand orange (#ff3b1f). */
export const chatBotIconOrangeClass =
  "brightness-0 saturate-100 [filter:brightness(0)_saturate(100%)_invert(36%)_sepia(93%)_saturate(4200%)_hue-rotate(353deg)_brightness(102%)_contrast(101%)]";

type ChatBrandIconProps = {
  size?: number;
  className?: string;
  /** Apply brand orange tint (default true). */
  orange?: boolean;
};

export function ChatBrandIcon({
  size = 32,
  className,
  orange = true,
}: ChatBrandIconProps) {
  return (
    <Image
      src={CHATBOT_ICON_SRC}
      alt=""
      width={size}
      height={size}
      className={cn(
        "object-contain bg-transparent",
        orange && chatBotIconOrangeClass,
        className,
      )}
      priority={size >= 40}
      aria-hidden
    />
  );
}
