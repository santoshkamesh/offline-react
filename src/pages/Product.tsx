import { useEffect, useState } from "react";
import type { Recipe } from "../types/recipe";
import menu from "../data/menu";
import { getRecipeById } from "../services/recipeService";

export default function Product({ id }: { id: number }) {
  const [item, setItem] = useState<Recipe | null>(null);

  useEffect(() => {
    const local = menu.find((m) => m.id === id);
    if (local) {
      setItem(local);
      return;
    }
    getRecipeById(id).then((r) => {
      if (r) setItem(r);
    });
  }, [id]);

  if (!item) return <main style={{ padding: 20 }}>Loading...</main>;

  function addToCart() {
    if (!item) return;
    const raw = localStorage.getItem("cart");
    const cart = raw
      ? (JSON.parse(raw) as Array<{
          id: number;
          qty: number;
          title: string;
          price: number;
          image: string;
        }>)
      : [];
    const existing = cart.find((c) => c.id === item.id);
    if (existing) existing.qty += 1;
    else
      cart.push({
        id: item.id,
        qty: 1,
        title: item.title,
        price: Number((Math.random() * 200 + 50).toFixed(0)),
        image: item.image,
      });
    localStorage.setItem("cart", JSON.stringify(cart));
    location.hash = "/order";
  }

  return (
    <main style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: 360,
            height: 260,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
        <div>
          <h1>{item.title}</h1>
          <div style={{ color: "#666" }}>{item.category}</div>
          <h3 style={{ marginTop: 12 }}>Ingredients</h3>
          <ul>
            {item.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
          <h3>Instructions</h3>
          {item.instructions.map((ins, i) => (
            <p key={i}>{ins}</p>
          ))}
          <div style={{ marginTop: 12 }}>
            <button
              onClick={addToCart}
              style={{
                padding: "10px 14px",
                background: "#e5533b",
                color: "#fff",
                border: "none",
                borderRadius: 6,
              }}
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
