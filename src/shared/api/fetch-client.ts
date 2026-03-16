type ApiErrorBody = { message?: string; errorCode?: number };

type FetchClientOptions = RequestInit & {
  next?: { revalidate?: number | false; tags?: string[] };
};

const parseErrorBody = async (response: Response): Promise<string> => {
  try {
    const body = (await response.json()) as ApiErrorBody;
    return body.message ?? response.statusText ?? `Ошибка ${response.status}`;
  } catch {
    return response.statusText || `Ошибка ${response.status}`;
  }
};

export const fetchWithErrorHandling = async <T>(
  url: string,
  options?: FetchClientOptions
): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const message = await parseErrorBody(response);
    throw new Error(message);
  }
  return response.json();
};
