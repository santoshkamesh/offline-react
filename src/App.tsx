import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import { askNotificationPermission } from "./registerSW";

function RouteSwitch({ route }: { route: string }) {
  if (route === "/menu") return <Menu />;
  if (route === "/about") return <About />;
  if (route === "/contact") return <Contact />;
  if (route === "/order") return <Order />;
  if (route === "/checkout") return <Checkout />;
  if (route === "/success") return <Success />;
  if (route.startsWith("/product/")) {
    const parts = route.split("/");
    const id = Number(parts[2]);
    return <Product id={id} />;
  }
  return <Home />;
}

export default function App() {
  const [route, setRoute] = useState<string>(
    location.hash.replace(/^#/, "") || "/",
  );

  useEffect(() => {
    const onHash = () => setRoute(location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    // Request notification permission once on app load
    askNotificationPermission().then((p) => {
      console.log("Notification permission:", p);
    });
  }, []);

  return (
    <div>
      <NavBar />
      <RouteSwitch route={route} />
    </div>
  );
}
