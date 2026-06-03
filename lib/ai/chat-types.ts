export type ChatAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type ChatRelatedPage = {
  label: string;
  href: string;
};

export type ChatMessageExtras = {
  actions?: ChatAction[];
  relatedPages?: ChatRelatedPage[];
  followUps?: string[];
};

export type StoredChatState = {
  messages: unknown[];
  metaByMessageId: Record<string, ChatMessageExtras>;
  lastIntent?: string;
};
