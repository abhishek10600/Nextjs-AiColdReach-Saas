import { registerSchema } from "@/features/auth/schema";
import { failure, success } from "@/lib/api-response";
import { ValidationError } from "@/lib/errors";
import { hashPassword } from "@/lib/hash";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validate";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await validateRequest(req, registerSchema);

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(failure("user already exists"), {
        status: 400,
      });
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
      },
    });

    return NextResponse.json(
      success({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      }),
      {
        status: 201,
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
