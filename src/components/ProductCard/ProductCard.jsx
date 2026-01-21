import defaultImage from "../../assets/images/image-default.png";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const title = product.title ?? product.name ?? "Producto";
  const imageSrc = product.thumbnail ?? product.image ?? defaultImage;

  return (
    <article className="productCard">
      <img
        className="productCard-img"
        src={imageSrc}
        alt={title}
        onError={(e) => {
          e.currentTarget.src = defaultImage;
        }}
      />

      <div className="productCard-body">
        <h3 className="productCard-title">{title}</h3>
        <p className="category">{product.category}</p>
        <p className="price">${Number(product.price).toLocaleString()}</p>
      </div>
    </article>
  );
}