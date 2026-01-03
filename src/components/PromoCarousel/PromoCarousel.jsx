import { useEffect, useMemo, useState } from "react";
import "./PromoCarousel.css";
import defaultImage from "../../assets/images/image-default.png";

export default function PromoCarousel({ items = [], autoPlay = true, intervalMs = 4000 }) {
  const slides = useMemo(() => items.filter(Boolean), [items]);
  const [index, setIndex] = useState(0);

  const total = slides.length;

  const goNext = () => {
    if (total === 0) return;
    setIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    if (total === 0) return;
    setIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const id = setInterval(goNext, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, intervalMs, total]);

  if (total === 0) return null;

  return (
    <section className="promo-wrap" aria-label="Top promociones">
      <div className="promo-head">
        <h2>Top Promociones</h2>
        <div className="promo-actions">
          <button className="promo-btn" onClick={goPrev} aria-label="Anterior">
            ‹
          </button>
          <button className="promo-btn" onClick={goNext} aria-label="Siguiente">
            ›
          </button>
        </div>
      </div>

      <div className="promo-viewport">
        <div
            className="promo-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
            >
            {slides.map((p) => (
                <article className="promo-slide" key={p.id}>
                <img
                    className="promo-img"
                    src={p.image || defaultImage}
                    alt={p.title}
                    onError={(e) => {
                    e.currentTarget.src = defaultImage;
                    }}
                />

                <div className="promo-content">
                    <span className="promo-badge">TOP</span>
                    <h3 className="promo-title">{p.title}</h3>
                    <p className="promo-subtitle">{p.subtitle}</p>
                    <button className="promo-cta" type="button">
                    {p.cta}
                    </button>
                </div>
                </article>
            ))}
            </div>
      </div>

      <div className="promo-dots" role="tablist" aria-label="Indicadores de promociones">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Ir a promoción ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
