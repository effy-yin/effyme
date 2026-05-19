export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

export type Conversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
};

export const STARTER_PROMPTS = [
  "What kind of frontend work do you specialize in?",
  "Walk me through your recent projects.",
  "How do you approach building a new React app?",
  "What's the best way to get in touch for a collaboration?",
] as const;
