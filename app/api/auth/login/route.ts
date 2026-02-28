import { loginSchema } from "@/features/auth/schema";
import { failure, success } from "@/lib/api-response";
import { ValidationError } from "@/lib/errors";
import { validateRequest } from "@/lib/validate";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/hash";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { setAuthCookies } from "@/lib/cookies";

export async function POST(req: Request) {
  try {
    const { email, password } = await validateRequest(req, loginSchema);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(failure("invalid credentials"), {
        status: 401,
      });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(failure("invalid credentials"), {
        status: 401,
      });
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    await setAuthCookies(accessToken, refreshToken);

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
