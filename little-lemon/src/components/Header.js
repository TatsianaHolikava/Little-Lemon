function Header() {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Main navigation">
        <a className="logo" href="#home" aria-label="Little Lemon home">
          Little Lemon
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#booking">Reservations</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
