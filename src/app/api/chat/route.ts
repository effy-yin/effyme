import type { ChatMessage } from "@/app/chat/types";

export const runtime = "edge";

type ChatRequestBody = {
  messages: Pick<ChatMessage, "role" | "content">[];
};

function sseChunk(content: string): string {
  return `data: ${JSON.stringify({ content })}\n\n`;
}

function demoReply(userMessage: string): string {
  const text = userMessage.toLowerCase();

  if (text.includes("project") || text.includes("portfolio") || text.includes("work")) {
    return "Effy has shipped products across Web3, fintech, and AI — including DAOSquare (venture DAO infrastructure), MuseX (creator & DAO collaboration), Palingen (options visualization), and CognitiveView (AI governance SaaS). You can browse case studies on the Works section of effyme, or ask me to compare stacks across those builds.";
  }

  if (
    text.includes("react") ||
    text.includes("typescript") ||
    text.includes("stack") ||
    text.includes("frontend")
  ) {
    return "The typical stack is React + TypeScript, modern Next.js, and Tailwind for UI. Effy focuses on clear component architecture, accessible interactions, and performance — especially for dashboards, data visualization, and product surfaces where design and engineering need to stay in sync.";
  }

  if (
    text.includes("hire") ||
    text.includes("contact") ||
    text.includes("collab") ||
    text.includes("email")
  ) {
    return "For collaborations, reach out via the site’s “Chat with me” button or email effy.yin@gmail.com with a short brief: timeline, product stage, and what you need help with (UI build, dashboard, web3 dApp frontend, etc.).";
  }

  return "Thanks for your message. This chat UI is running in demo mode — add an OPENAI_API_KEY environment variable to connect a live model. Until then, I can still help with questions about Effy’s frontend work, projects, and how to get in touch.";
}

function streamText(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      for (let index = 0; index < text.length; index += 4) {
        controller.enqueue(encoder.encode(sseChunk(text.slice(index, index + 4))));
        await new Promise((resolve) => setTimeout(resolve, 16));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

async function streamOpenAI(
  messages: ChatRequestBody["messages"],
): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  if (!apiKey) {
    const lastUser =
      [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    return streamText(demoReply(lastUser));
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant on Effy Yin's portfolio site. Answer concisely about frontend engineering, projects (DAOSquare, MuseX, Palingen, CognitiveView), and collaboration. Be warm and professional.",
        },
        ...messages.filter((m) => m.role !== "system"),
      ],
      stream: true,
      temperature: 0.7,
    }),
  });

  if (!response.ok || !response.body) {
    const detail = await response.text().catch(() => "");
    return streamText(
      `Something went wrong talking to the model (${response.status}). ${detail.slice(0, 120)}`,
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      const reader = response.body!.getReader();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") continue;

            try {
              const json = JSON.parse(payload) as {
                choices?: { delta?: { content?: string } }[];
              };
              const content = json.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(encoder.encode(sseChunk(content)));
              }
            } catch {
              // ignore malformed chunks
            }
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}

export async function POST(request: Request) {
  let body: ChatRequestBody;

  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = body.messages?.filter(
    (m) => m.role && typeof m.content === "string" && m.content.trim(),
  );

  if (!messages?.length) {
    return Response.json({ error: "Messages are required" }, { status: 400 });
  }

  const stream = await streamOpenAI(messages);

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
