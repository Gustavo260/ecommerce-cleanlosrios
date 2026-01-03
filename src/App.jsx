import { useMemo, useState } from "react";

// Importación de componentes
import SearchBar from "./components/SearchBar/SearchBar";
import PromoCarousel from "./components/PromoCarousel/PromoCarousel";
import { promotions } from "./components/PromoCarousel/promotions";
import { products } from "./components/ProductCard/products";
import ProductCard from "./components/ProductCard/ProductCard";
import ReviewCard from "./components/ReviewCard/ReviewCard";
import { reviews } from "./components/ReviewCard/reviews";
import { brands } from "./components/BrandCard/brands";
import BrandCard from "./components/BrandCard/BrandCard";

import "./App.css";

export default function App() {

  // Search bar
  const [search, setSearch] = useState("");

  // Productos de limpieza
  const visibleProducts = useMemo(() => {
    return products.slice(0, 3);
  }, []);

  // Reviews
  const visibleReviews = useMemo(() => {
    return reviews.slice(0, 3);
  }, []);

  // Brands
  const visibleBrands = useMemo(() => brands.slice(0, 3), []);

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

        <PromoCarousel items={promotions} autoPlay={true} intervalMs={4000} />

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

        <section id="reseñas" className="reviews-section">
          <div className="section-head">
            <h2>Reseñas</h2>
          </div>

          <div className="grid">
            {visibleReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </section>

        <section id="marcas" className="brands-section">
          <div className="section-head">
            <h2>Nuestras marcas destacadas</h2>
          </div>

          <div className="brands-grid">
            {visibleBrands.map((b) => (
              <BrandCard key={b.id} brand={b} />
            ))}
          </div>
        </section>

      </main>

      <footer className="footer">
        © {new Date().getFullYear()} CleanLosRios
      </footer>
    </>
  );
}
