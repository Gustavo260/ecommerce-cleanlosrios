import "./Loader.css";

export default function Loader({ count = 3, className = "" }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`product-skeleton ${className}`} />
      ))}
    </>
  );
}