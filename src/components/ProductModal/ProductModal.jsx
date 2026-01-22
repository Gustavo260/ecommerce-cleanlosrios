import { useEffect } from "react";
import "./ProductModal.css";

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!product) return null;

  const title = product.title ?? product.name ?? "Producto";
  const category = product.category ?? "-";
  const price = product.price ?? 0;
  const shortDescription = product.shortDescription ?? "";
  const vendor = product.vendor ?? "-";

  return (
    <div className="modal-overlay" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        <h2 className="modal-title">{title}</h2>

        <p className="modal-meta">
          <span className="modal-category">{category}</span>
          <span className="modal-price">${Number(price).toLocaleString()}</span>
        </p>

        <p className="modal-vendor">
          <strong>Vendedor:</strong> {vendor}
        </p>

        <p className="modal-desc">{shortDescription}</p>
      </div>
    </div>
  );
}
