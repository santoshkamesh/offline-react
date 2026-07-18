import type { Recipe } from "../types/recipe";

export default function DishCard({
  item,
  onClick,
}: {
  item: Recipe;
  onClick?: (item: Recipe) => void;
}) {
  return (
    <article
      onClick={() => onClick?.(item)}
      style={{
        border: "1px solid #eee",
        borderRadius: 8,
        padding: 12,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{
          width: "100%",
          height: 160,
          objectFit: "cover",
          borderRadius: 6,
        }}
      />
      <h3 style={{ margin: "8px 0 4px" }}>{item.title}</h3>
      <div style={{ color: "#666", marginBottom: 8 }}>
        {item.category ?? ""}
      </div>
      <div style={{ fontWeight: 700 }}>
        ₹{(Math.random() * 200 + 50).toFixed(0)}
      </div>
      <p style={{ marginTop: 8, color: "#444" }}>
        {item.instructions?.[0] ?? ""}
      </p>
    </article>
  );
}
