"use client";

import { useEffect, useState } from "react";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("Вы не авторизованы");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Ошибка загрузки");
        const data = await res.json();
        setNews(data);
      })
      .catch(() => setError("Не удалось загрузить новости"));
  }, []);

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl mb-6 font-bold">Новости</h1>

      {news.map((item) => (
        <div key={item.id} className="border p-4 mb-4 rounded">
          <h2 className="font-bold text-xl">{item.title}</h2>
          <p className="mt-2">{item.content}</p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(item.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
