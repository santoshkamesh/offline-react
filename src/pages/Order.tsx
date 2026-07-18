import { useEffect, useState } from "react";

export default function Order() {
  const [cart, setCart] = useState<
    Array<{
      id: number;
      qty: number;
      title: string;
      price: number;
      image: string;
    }>
  >([]);

  useEffect(() => {
    const raw = localStorage.getItem("cart");
    setCart(raw ? JSON.parse(raw) : []);
  }, []);

  function updateQty(id: number, delta: number) {
    const next = cart.map((c) =>
      c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c,
    );
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  function removeItem(id: number) {
    const next = cart.filter((c) => c.id !== id);
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  const total = cart.reduce((s, c) => s + c.qty * c.price, 0);

  if (cart.length === 0)
    return <main style={{ padding: 20 }}>Your order is empty.</main>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Your Order</h1>
      <div style={{ display: "grid", gap: 12 }}>
        {cart.map((c) => (
          <div
            key={c.id}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              border: "1px solid #eee",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <img
              src={c.image}
              alt={c.title}
              style={{
                width: 80,
                height: 60,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{c.title}</div>
              <div>
                ₹{c.price} x {c.qty}
              </div>
            </div>
            <div>
              <button
                onClick={() => updateQty(c.id, -1)}
                style={{ marginRight: 6 }}
              >
                -
              </button>
              <button onClick={() => updateQty(c.id, 1)}>+</button>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => removeItem(c.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ fontWeight: 700 }}>Total: ₹{total.toFixed(0)}</div>
        <div style={{ marginTop: 8 }}>
          <a
            href="#/checkout"
            style={{
              padding: "8px 12px",
              background: "#e5533b",
              color: "#fff",
              borderRadius: 6,
              textDecoration: "none",
            }}
          >
            Proceed to Checkout
          </a>
        </div>
      </div>
    </main>
  );
}
