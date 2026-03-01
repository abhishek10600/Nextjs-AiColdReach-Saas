import { failure, success } from "@/lib/api-response";
import { verifyJwt } from "@/lib/auth/verify-jwt";
import { ValidationError } from "@/lib/errors";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const user = await verifyJwt();
    const dms = await prisma.dM.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(success(dms), {
      status: 200,
    });
  } catch (error) {
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
