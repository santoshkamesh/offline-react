import { useMemo, useState } from "react";
import DishCard from "../components/DishCard";
import menu from "../data/menu";

export default function Menu() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return menu;
    return menu.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (m.category ?? "").toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <main style={{ padding: 20 }}>
      <h1>Menu</h1>
      <div style={{ marginTop: 12, marginBottom: 12 }}>
        <input
          placeholder="Search dishes or category"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "8px 10px",
            width: "100%",
            maxWidth: 420,
            borderRadius: 6,
            border: "1px solid #ddd",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 12,
        }}
      >
        {results.map((m) => (
          <DishCard
            key={m.id}
            item={m}
            onClick={() => (location.hash = `/product/${m.id}`)}
          />
        ))}
      </div>
    </main>
  );
}
