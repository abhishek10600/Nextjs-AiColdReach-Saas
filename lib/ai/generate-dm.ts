import OpenAI from "openai";
import { GenerateDMInput } from "@/features/dm/schema";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateDM(input: GenerateDMInput) {
  const prompt = `You are an elite cold DM copywriter specialized in high reply-rate outreach.

Your job is to write ONE personalized cold DM that follows this persuasion flow NATURALLY:

1. Pain — show you understand their current struggle
2. Agitation — highlight why the problem is frustrating or costly
3. Desired Future — hint at the outcome they want
4. Solution — introduce the offer naturally
5. Proof — imply credibility or results (subtle, not bragging)
6. Safety — reduce resistance or pressure
7. Action — simple low-friction CTA

IMPORTANT:
- DO NOT label the steps
- Message must feel human and conversational
- No marketing buzzwords
- No spammy phrases
- No long paragraphs
- 3–6 short lines maximum
- Personalized to the client details
- Sound like a real person typing, not AI
- Platform tone must match ${input.platform}

Context:

Platform: ${input.platform}
Niche: ${input.niche}
Client Details: ${input.clientDetail}
Offer: ${input.service}
Tone: ${input.tone}

Reference examples:
${input.examples ?? "None"}

Write only the DM message.
Do not add explanations, titles, or quotation marks.
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content ?? "";
}
