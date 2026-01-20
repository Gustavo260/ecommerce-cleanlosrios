import { useEffect, useMemo, useState } from "react";

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
import { faqs } from "./components/FaqItem/faqs";
import FaqItem from "./components/FaqItem/FaqItem";

import "./App.css";

export default function App() {

  // Search bar lógica Inicio
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  useEffect(() => {
    const q = search.trim().toLowerCase();

    if (!q) {
      setLoading(false);
      setError("");
      setFilteredProducts(products);
      return;
    }

    setLoading(true);
    setError("");

    const t = setTimeout(() => {
      const result = products.filter((p) =>
        (p.name ?? "").toLowerCase().includes(q)
      );

      setFilteredProducts(result);
      setLoading(false);

      if (result.length === 0) {
        setError("No se encontraron productos con esa búsqueda.");
      }
    }, 450);

    return () => clearTimeout(t);
  }, [search]);
  // Fin bloque lógica Search bar

  // Productos visibles (máx 3)
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, 3);
  }, [filteredProducts]);

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
          <strong>{filteredProducts.length}</strong> (máx. 9)
        </div>

        <div className="nav-right">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar producto..."
            loading={loading}
            error={error}
          />
        </div>

        <div className="grid">
          {loading ? (
            <>
              <div className="product-skeleton" />
              <div className="product-skeleton" />
              <div className="product-skeleton" />
            </>
          ) : (
            visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
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

        <section id="faqs" className="faqs-section">
          <div className="section-head">
            <h2>Preguntas Frecuentes</h2>
            <p>Resolvemos tus dudas más comunes.</p>
          </div>

          <div className="faqs-list">
            {faqs.map((faq) => (
              <FaqItem key={faq.id} faq={faq} />
            ))}
          </div>
        </section>

        <section id="nosotros" className="about">
          <h2>Nosotros</h2>
          <p>Somos una empresa intermediaria de productos de limpieza entre empresas proveedoras de productos de aseo y limpieza</p>
        </section>

      </main>

      <footer className="footer">
        © {new Date().getFullYear()} CleanLosRios
      </footer>
    </>
  );
}
