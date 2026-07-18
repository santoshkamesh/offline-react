import { useEffect, useState } from "react";

export default function NavBar() {
  const [route, setRoute] = useState<string>(
    location.hash.replace(/^#/, "") || "/",
  );

  useEffect(() => {
    const onHash = () => setRoute(location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const link = (to: string, label: string) => (
    <a
      href={`#${to}`}
      style={{
        margin: "0 8px",
        color: route === to ? "#e5533b" : "#222",
        textDecoration: "none",
      }}
    >
      {label}
    </a>
  );
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const read = () => {
      const raw = localStorage.getItem("cart");
      const cart = raw ? JSON.parse(raw) : [];
      setCartCount(cart.reduce((s: any, c: any) => s + (c.qty || 0), 0));
    };
    read();
    const onStorage = () => read();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        borderBottom: "1px solid #eee",
      }}
    >
      <div style={{ fontWeight: 700 }}>My Restaurant</div>
      <nav>
        {link("/", "Home")}
        {link("/menu", "Menu")}
        {link("/about", "About")}
        {link("/contact", "Contact")}
        {link("/order", `Order (${cartCount})`)}
      </nav>
    </header>
  );
}
