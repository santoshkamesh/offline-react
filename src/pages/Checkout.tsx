import { useState } from "react";
import { notify } from "../registerSW";

export default function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // pretend to process payment
    localStorage.removeItem("cart");
    // Notify the user that the order was placed
    notify("Order placed", {
      body: "Your order has been placed successfully.",
    });

    // Send an update after 1 minute
    setTimeout(() => {
      notify("Order update", { body: "Your order status: Preparing." });
    }, 60 * 1000);

    location.hash = "/success";
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Checkout</h1>
      <form onSubmit={submit} style={{ maxWidth: 480 }}>
        <div style={{ marginBottom: 8 }}>
          <label>Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Address</label>
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            style={{
              padding: "8px 12px",
              background: "#e5533b",
              color: "#fff",
              border: "none",
              borderRadius: 6,
            }}
          >
            Place Order
          </button>
        </div>
      </form>
    </main>
  );
}
