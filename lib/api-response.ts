export function success<T>(data: T) {
  return { success: true, data };
}

export function failure(message: string, details?: unknown) {
  const response: {
    success: false;
    message: string;
    details?: unknown;
  } = {
    success: false,
    message,
  };

  if (details !== undefined) {
    response.details = details;
  }

  return response;
}
