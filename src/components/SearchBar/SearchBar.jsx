import "./SearchBar.css";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar producto...",
}) {
  return (
    <div className="searchbar">
      <input
        className="searchbar-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
}
