export default function Hero() {
  return (
    <section
      style={{
        padding: 40,
        textAlign: "center",
        background: "linear-gradient(90deg,#fff7f1,#fff)",
      }}
    >
      <h1 style={{ margin: 0 }}>Food Website</h1>
      <p style={{ marginTop: 8 }}>Best Food in India</p>
      <a
        href="#/menu"
        style={{
          display: "inline-block",
          marginTop: 12,
          background: "#e5533b",
          color: "#fff",
          padding: "8px 14px",
          borderRadius: 6,
          textDecoration: "none",
        }}
      >
        Order Now
      </a>
    </section>
  );
}
