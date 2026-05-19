import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat — Effy Yin",
  description: "AI chat assistant on Effy Yin's portfolio.",
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-dvh overflow-hidden">{children}</div>;
}
