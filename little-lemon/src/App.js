import { useReducer, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import { initializeTimes, updateTimes, submitAPI } from './utils/times';
import './App.css';

function App() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  function submitForm(formData) {
    if (submitAPI(formData)) {
      setConfirmedBooking(formData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <>
      <Header />
      <main>
        <Hero />

        <section className="info-section" id="about" aria-labelledby="about-title">
          <h2 id="about-title">Fresh Mediterranean food for every occasion</h2>
          <p>
            Little Lemon serves simple, seasonal dishes inspired by traditional Mediterranean family recipes.
            Book online and we will prepare your table for a relaxed dining experience.
          </p>
        </section>

        <section className="menu-preview" id="menu" aria-labelledby="menu-title">
          <h2 id="menu-title">Popular dishes</h2>
          <div className="cards">
            <article className="card">
              <h3>Greek Salad</h3>
              <p>Crisp lettuce, peppers, olives, feta cheese, and lemon dressing.</p>
            </article>
            <article className="card">
              <h3>Bruschetta</h3>
              <p>Grilled bread with tomatoes, basil, garlic, and olive oil.</p>
            </article>
            <article className="card">
              <h3>Lemon Dessert</h3>
              <p>A bright and sweet house dessert made with fresh lemon.</p>
            </article>
          </div>
        </section>

        <section className="booking-section" id="booking" aria-labelledby="booking-title">
          <div className="section-heading">
            <p className="eyebrow">Reservations</p>
            <h2 id="booking-title">Reserve a table</h2>
            <p>Choose your date, time, party size, and contact details to complete your booking.</p>
          </div>

          {confirmedBooking ? (
            <article className="confirmation" role="status" aria-live="polite">
              <h2>Reservation confirmed!</h2>
              <p>
                Thank you, {confirmedBooking.firstName}. Your table for {confirmedBooking.guests} guest(s)
                is reserved on {confirmedBooking.date} at {confirmedBooking.time}.
              </p>
              <p>We sent the confirmation details to {confirmedBooking.email}.</p>
              <button className="submit-button" type="button" onClick={() => setConfirmedBooking(null)}>
                Make another reservation
              </button>
            </article>
          ) : (
            <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
