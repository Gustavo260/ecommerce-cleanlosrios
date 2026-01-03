import defaultImage from "../../assets/images/image-default.png";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const imageSrc = product.image || defaultImage;

  return (
    <article className="productCard">
      <img
        className="productCard-img"
        src={imageSrc}
        alt={product.name}
        onError={(e) => {
          e.currentTarget.src = defaultImage;
        }}
      />

      <div className="productCard-body">
        <h3 className="productCard-title">{product.name}</h3>

        <p className="category">{product.category}</p>

        <p className="price">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </article>
  );
}
