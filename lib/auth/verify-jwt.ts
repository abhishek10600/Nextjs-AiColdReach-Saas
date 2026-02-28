import { cookies } from "next/headers";
import { verifyAccessToken } from "../jwt";
import prisma from "@/lib/prisma";
import { ValidationError } from "../errors";

export async function verifyJwt() {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new ValidationError("Unauthorized");
  }

  let decoded;

  try {
    decoded = verifyAccessToken(token);
  } catch {
    throw new ValidationError("Invalid or expired token");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: decoded.email,
    },
  });

  if (!user) {
    throw new ValidationError("Unauthorized");
  }

  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  };
}
