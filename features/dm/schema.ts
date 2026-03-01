import { z } from "zod";

export const generateDMSchema = z.object({
  platform: z.enum(["INSTAGRAM", "LINKEDIN", "WHATSAPP"]),
  niche: z.string().min(2, "Niche is required").max(100),
  clientDetail: z.string().min(2, "Client Detail is required"),
  service: z.string().min(2, "Service is required"),
  tone: z.enum([
    "PROFESSIONAL",
    "CASUAL",
    "FRIENDLY",
    "DIRECT",
    "CONFIDENT",
    "LUXURY",
  ]),
  examples: z.string().max(10000).optional().nullable(),
});

export type GenerateDMInput = z.infer<typeof generateDMSchema>;
