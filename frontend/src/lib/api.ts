const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function registerUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, re_password: password }),
  });

  if (!res.ok) {
    throw new Error("Ошибка регистрации");
  }
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/jwt/create/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Ошибка входа");
  }

  return res.json() as Promise<{ access: string; refresh: string }>;
}

export async function getNews(accessToken: string) {
  const res = await fetch(`${API_URL}/api/news/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Не удалось загрузить новости");
  }

  return res.json();
}
