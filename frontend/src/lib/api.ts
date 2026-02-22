const API_BASE = import.meta.env.VITE_API_URL;
console.log("API URL:", import.meta.env.VITE_API_URL);
console.log("API_BASE VALUE:", API_BASE);

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    credentials: "include", // VERY IMPORTANT
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}