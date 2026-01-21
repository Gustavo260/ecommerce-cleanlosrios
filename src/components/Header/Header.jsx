import "./Header.css";

export default function Header() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">🧹 CleanLosRios</div>

          <ul className="nav-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO / HEADER */}
      <header id="inicio" className="header">
        <h1>Productos de limpieza</h1>
        <p>
          Sitio de ejemplo para un ecommerce de solo productos de limpieza
        </p>
      </header>
    </>
  );
}
