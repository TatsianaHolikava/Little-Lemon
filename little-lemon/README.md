# Little Lemon Booking App

This is a  project for the Front-End Developer Capstone peer review assignment. It implements a responsive Little Lemon restaurant table booking experience.

## Features

- Little Lemon landing page
- Functional reservation form
- Date, time, number of guests, occasion, seating preference, and contact details
- Client-side validation with meaningful error messages
- Accessible labels and ARIA attributes
- Semantic HTML structure
- Responsive layout for desktop and mobile
- Confirmation screen after successful booking
- Unit tests for booking form and available times logic

## Technologies

- React
- Create React App
- CSS
- React Testing Library

## Setup Instructions

Install dependencies:

```bash
npm install
```

Start the project locally:

```bash
npm start
```

Run tests:

```bash
npm test
```

Create production build:

```bash
npm run build
```

## Project Structure

```text
src/
  components/
    BookingForm.js
    Footer.js
    Header.js
    Hero.js
  utils/
    times.js
  App.js
  App.css
  App.test.js
  index.js
  index.css
```

## Notes for Peer Review

The booking form applies validation before submission. Required fields display meaningful error messages, and the submit button is disabled until the form is valid. The app uses semantic sections, accessible form labels, ARIA attributes, and responsive CSS.
