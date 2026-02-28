import { failure, success } from "@/lib/api-response";
import { verifyJwt } from "@/lib/auth/verify-jwt";
import { clearAuthCookies } from "@/lib/cookies";
import { ValidationError } from "@/lib/errors";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const auth = await verifyJwt();
    await clearAuthCookies();

    return NextResponse.json(success("user logged out successfully"), {
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
