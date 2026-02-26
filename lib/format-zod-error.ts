type TreeError = {
  errors?: string[];
  properties?: Record<string, TreeError | undefined>;
};

export function formatZodError(tree: unknown) {
  const fieldErrors: Record<string, string[]> = {};

  const t = tree as TreeError;

  if (!t.properties) return fieldErrors;

  for (const key in t.properties) {
    const prop = t.properties[key];

    if (prop?.errors?.length) {
      fieldErrors[key] = prop.errors;
    }
  }

  return fieldErrors;
}
