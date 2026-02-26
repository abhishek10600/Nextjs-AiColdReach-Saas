import { ZodType } from "zod";
import { ValidationError } from "./errors";
import { z } from "zod";
import { formatZodError } from "./format-zod-error";

export async function validateRequest<T>(
  req: Request,
  schema: ZodType<T>,
): Promise<T> {
  const body = await req.json();

  const result = schema.safeParse(body);

  if (!result.success) {
    const tree = z.treeifyError(result.error);
    const formattedError = formatZodError(tree);
    throw new ValidationError(formattedError);
  }

  return result.data;
}
