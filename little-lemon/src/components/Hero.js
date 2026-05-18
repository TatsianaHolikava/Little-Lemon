function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow">Chicago</p>
        <h1 id="hero-title">Little Lemon</h1>
        <p>
          Fresh Mediterranean dishes, warm hospitality, and simple online table booking for your next visit.
        </p>
        <a className="primary-link" href="#booking">Reserve a table</a>
      </div>
      <div className="hero-card" aria-label="Featured restaurant image">
        <span>🍋</span>
        <p>Family-owned Mediterranean restaurant</p>
      </div>
    </section>
  );
}

export default Hero;
