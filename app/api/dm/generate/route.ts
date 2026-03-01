import { generateDMSchema } from "@/features/dm/schema";
import { generateDM } from "@/lib/ai/generate-dm";
import { failure, success } from "@/lib/api-response";
import { verifyJwt } from "@/lib/auth/verify-jwt";
import { ValidationError } from "@/lib/errors";
import { validateRequest } from "@/lib/validate";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const user = await verifyJwt();
    const data = await validateRequest(req, generateDMSchema);
    const generatedDM = await generateDM(data);
    const dm = await prisma.dM.create({
      data: {
        ...data,
        generatedDM,
        userId: user.id,
      },
    });
    return NextResponse.json(success(dm), {
      status: 200,
    });
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      return NextResponse.json(failure("Validation failed", error.details), {
        status: 400,
      });
    }

    console.error(error);
    return NextResponse.json(failure("server error"), {
      status: 500,
    });
  }
}
