import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";
import "./ProductList.css";

export default function ProductList({ products = [], loading = false, skeletonCount = 3, onOpen }) {
  return (
    <div className="grid">
      {loading ? (
        <Loader count={skeletonCount} />
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} onOpen={onOpen} />
        ))
      )}
    </div>
  );
}
