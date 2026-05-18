import { useState } from 'react';

const today = new Date().toISOString().split('T')[0];

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [formData, setFormData] = useState({
    date: today,
    time: availableTimes[0] || '',
    guests: '2',
    occasion: 'Birthday',
    seating: 'Indoor',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  function validate(values) {
    const newErrors = {};

    if (!values.date) {
      newErrors.date = 'Please choose a reservation date.';
    } else if (values.date < today) {
      newErrors.date = 'Reservation date cannot be in the past.';
    }

    if (!values.time) {
      newErrors.time = 'Please choose a reservation time.';
    }

    const guestsNumber = Number(values.guests);
    if (!guestsNumber || guestsNumber < 1 || guestsNumber > 10) {
      newErrors.guests = 'Please choose between 1 and 10 guests.';
    }

    if (!values.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }

    if (!values.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }

    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!/^\d{10,}$/.test(values.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number with at least 10 digits.';
    }

    return newErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));

    if (name === 'date') {
      dispatch({ type: 'date_changed', date: value });
      setFormData((currentData) => ({
        ...currentData,
        date: value,
        time: ''
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      submitForm(formData);
    }
  }

  const isFormValid = Object.keys(validate(formData)).length === 0;

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate aria-label="Reserve a table form">
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="date">Choose date</label>
          <input
            id="date"
            name="date"
            type="date"
            min={today}
            value={formData.date}
            onChange={handleChange}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'date-error' : undefined}
            required
          />
          {errors.date && <p className="error" id="date-error">{errors.date}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="time">Choose time</label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={errors.time ? 'time-error' : undefined}
            required
          >
            <option value="">Select a time</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          {errors.time && <p className="error" id="time-error">{errors.time}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="guests">Number of guests</label>
          <input
            id="guests"
            name="guests"
            type="number"
            min="1"
            max="10"
            value={formData.guests}
            onChange={handleChange}
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? 'guests-error' : undefined}
            required
          />
          {errors.guests && <p className="error" id="guests-error">{errors.guests}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="occasion">Occasion</label>
          <select id="occasion" name="occasion" value={formData.occasion} onChange={handleChange}>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Date night</option>
            <option>Business meal</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <fieldset>
        <legend>Seating preference</legend>
        <div className="radio-row">
          <label>
            <input
              type="radio"
              name="seating"
              value="Indoor"
              checked={formData.seating === 'Indoor'}
              onChange={handleChange}
            />
            Indoor
          </label>
          <label>
            <input
              type="radio"
              name="seating"
              value="Outdoor"
              checked={formData.seating === 'Outdoor'}
              onChange={handleChange}
            />
            Outdoor
          </label>
        </div>
      </fieldset>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            required
          />
          {errors.firstName && <p className="error" id="firstName-error">{errors.firstName}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            required
          />
          {errors.lastName && <p className="error" id="lastName-error">{errors.lastName}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
          />
          {errors.email && <p className="error" id="email-error">{errors.email}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            required
          />
          {errors.phone && <p className="error" id="phone-error">{errors.phone}</p>}
        </div>
      </div>

      <button className="submit-button" type="submit" disabled={!isFormValid} aria-label="Submit reservation">
        Reserve a table
      </button>
    </form>
  );
}

export default BookingForm;
