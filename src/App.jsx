import { useMemo, useState } from "react";

// Importación de componentes
import SearchBar from "./components/SearchBar/SearchBar";
import { products } from "./components/ProductCard/products";
import ProductCard from "./components/ProductCard/ProductCard";

import "./App.css";

export default function App() {
  
  // Search bar
  const [search, setSearch] = useState("");

  // Productos de limpieza
  const visibleProducts = useMemo(() => {
    return products.slice(0, 3);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">🧹 CleanLosRios</div>

          <ul className="nav-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
          </ul>
        </div>

      </nav>

      <header id="inicio" className="header">
        <h1>Productos de limpieza</h1>
        <p>Sitio de ejemplo para un ecommerce de solo productos de limpieza</p>
      </header>

      <main id="productos" className="container">

        <div className="results">
          Mostrando <strong>{visibleProducts.length}</strong> de{" "}
          <strong>{products.length}</strong>
          {" "} (máx. 9)
        </div>

        <div className="nav-right">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar producto..."
          />
        </div>

        <div className="grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </main>

      <footer className="footer">
        © {new Date().getFullYear()} CleanLosRios
      </footer>
    </>
  );
}
