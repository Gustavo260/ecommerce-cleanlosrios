import { useEffect, useMemo, useState, useRef } from "react";

// Importación de componentes
import Header from "./components/Header/Header"
import SearchBar from "./components/SearchBar/SearchBar";
import PromoCarousel from "./components/PromoCarousel/PromoCarousel";
import { promotions } from "./components/PromoCarousel/promotions";
import ProductList from "./components/ProductList/ProductList";
import ProductModal from "./components/ProductModal/ProductModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ReviewCard from "./components/ReviewCard/ReviewCard";
import { reviews } from "./components/ReviewCard/reviews";
import { brands } from "./components/BrandCard/brands";
import BrandCard from "./components/BrandCard/BrandCard";
import { faqs } from "./components/FaqItem/faqs";
import FaqItem from "./components/FaqItem/FaqItem";
import Footer from "./components/Footer/Footer";

import "./App.css";

export default function App() {

// Search bar lógica Inicio + API
const abortRef = useRef(null);

const [search, setSearch] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const [filteredProducts, setFilteredProducts] = useState([]);
const [total, setTotal] = useState(0);

const [selectedProduct, setSelectedProduct] = useState(null);

 // Carga inicial productos
useEffect(() => {
  const loadInitial = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:3001/products?limit=9&skip=0");
      if (!res.ok) throw new Error("Error cargando productos");

      const data = await res.json();
      setFilteredProducts(data.products ?? []);
      setTotal(data.total ?? 0);
    } catch (e) {
      setError("No pude cargar productos desde la API.");
    } finally {
      setLoading(false);
    }
  };

  loadInitial();
}, []);

// Busqueda en API
useEffect(() => {
  const q = search.trim();

  // Cancela request
  if (abortRef.current) abortRef.current.abort();
  const controller = new AbortController();
  abortRef.current = controller;

  // Carga productos iniciales si esta vacio
  if (!q) {
    const t = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:3001/products?limit=9&skip=0", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error();

        const data = await res.json();
        setFilteredProducts(data.products ?? []);
        setTotal(data.total ?? 0);
      } catch (e) {
        if (e?.name !== "AbortError") setError("Error consultando la API.");
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }

  setLoading(true);
  setError("");

  const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/products/search?q=${encodeURIComponent(q)}&limit=9&skip=0`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Error en búsqueda");

        const data = await res.json();
        const list = data.products ?? [];

        setFilteredProducts(list);
        setTotal(data.total ?? list.length);

        if (list.length === 0) {
          setError("No se encontraron productos con esa búsqueda.");
        }
      } catch (e) {
         console.error("API error:", e);
        if (e?.name !== "AbortError") {
          setError("Error consultando la API."); 
          console.error("API error:", e);
        }
      } finally {
        setLoading(false);
      }
    }, 450);

    return () => {
      clearTimeout(t);
      controller.abort();
    };
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
      <Header />

      <main id="productos" className="container">

        <PromoCarousel items={promotions} autoPlay={true} intervalMs={4000} />

        <div className="results">
          Mostrando <strong>{visibleProducts.length}</strong> de{" "}
          <strong>{total}</strong> (máx. 9)
        </div>

        <div className="nav-right">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar producto..."
            loading={loading}
          />

          <ErrorMessage message={error} />
        </div>

        <ProductList
          products={visibleProducts}
          loading={loading}
          skeletonCount={3}
          onOpen={setSelectedProduct}
        />

        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />

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

      <Footer />
    </>
  );
}
