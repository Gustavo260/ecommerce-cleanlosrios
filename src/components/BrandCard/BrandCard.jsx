import "./BrandCard.css";
import defaultLogo from "../../assets/images/image-default.png";

export default function BrandCard({ brand }) {
  const logoSrc = brand.logo || defaultLogo;

  return (
    <article className="brand-card" title={brand.name}>
      <img
        className="brand-logo"
        src={logoSrc}
        alt={brand.name}
        onError={(e) => {
          e.currentTarget.src = defaultLogo;
        }}
      />
    </article>
  );
}
