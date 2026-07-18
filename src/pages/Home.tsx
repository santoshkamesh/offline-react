import Hero from "../components/Hero";
import menu from "../data/menu";
import DishCard from "../components/DishCard";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <section style={{ padding: 20 }}>
        <h2>Spacial Dishes</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 12,
            marginTop: 12,
          }}
        >
          {menu.map((m) => (
            <DishCard
              key={m.id}
              item={m}
              onClick={() => (location.hash = `/product/${m.id}`)}
            />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
