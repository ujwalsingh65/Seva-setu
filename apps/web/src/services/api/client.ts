/**
 * Base HTTP client for SevaSetu REST API communication
 * Communicates with the Express API (/api/v1)
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export interface RequestOptions extends RequestInit {
  token?: string;
}

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers = {}, ...customConfig } = options;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };

  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...customConfig,
    headers: requestHeaders,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'API request failed');
  }

  return data as T;
}
