import "./SearchBar.css";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar producto...",
  loading = false,
  error = "",
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

      <div className="searchbar-status" aria-live="polite">
        {loading && <span className="searchbar-loading">Buscando...</span>}
        {!loading && error && <span className="searchbar-error">{error}</span>}
      </div>
    </div>
  );
}
