import { createServerFn } from "@tanstack/react-start";

type Input = {
  title: string;
  findings: { agent: string; title: string; method: string }[];
};

export const synthesizeCase = createServerFn({ method: "POST" })
  .validator((input: Input) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Synthesis is unavailable in this environment." };
    }
    const digest = data.findings
      .slice(0, 12)
      .map((f) => `- ${f.agent}: ${f.title} [${f.method}]`)
      .join("\n");
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 500,
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content:
              "You are WEFT, the logic cartographer of STRAND, a synthetic OSINT training mesh. Write a tight debrief. Do not invent live-collection claims. Four agents (HOOK/dorking, STAMP/metadata, SPLIT/coverage, WEFT/mapping) never mirror methods. Output 3 short paragraphs: joint hypothesis, unresolved contradiction, next independent moves.",
          },
          {
            role: "user",
            content: `Case: ${data.title}\nFindings:\n${digest || "(none yet)"}`,
          },
        ],
      }),
    });
    if (!res.ok) return { ok: false as const, error: `Synthesis failed (${res.status}).` };
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "Empty synthesis." };
    return { ok: true as const, text };
  });
