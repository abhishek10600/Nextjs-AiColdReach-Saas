import { failure, success } from "@/lib/api-response";
import { verifyJwt } from "@/lib/auth/verify-jwt";
import { ValidationError } from "@/lib/errors";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { id } = await verifyJwt();
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(failure("user not found"), {
        status: 200,
      });
    }

    return NextResponse.json(
      success({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      }),
      {
        status: 200,
      },
    );
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
