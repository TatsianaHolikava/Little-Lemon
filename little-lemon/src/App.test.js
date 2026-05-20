import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { initializeTimes, updateTimes } from './utils/times';

test('renders the booking form heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /reserve a table/i })).toBeInTheDocument();
});

test('initializeTimes returns available booking times', () => {
  const times = initializeTimes();

  expect(Array.isArray(times)).toBe(true);
  expect(times.length).toBeGreaterThan(0);
});

test('updateTimes returns available times for selected date', () => {
  const state = ['17:00'];
  const newTimes = updateTimes(state, { type: 'date_changed', date: '2026-05-23' });

  expect(Array.isArray(newTimes)).toBe(true);
  expect(newTimes).toContain('19:00');
});

test('shows validation messages when required fields are missing', async () => {
  render(<App />);

  await userEvent.clear(screen.getByLabelText(/first name/i));
  await userEvent.clear(screen.getByLabelText(/last name/i));
  await userEvent.clear(screen.getByLabelText(/email/i));
  await userEvent.clear(screen.getByLabelText(/phone/i));

  await userEvent.click(screen.getByRole('button', { name: /submit reservation/i }));

  expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
});

test('submits a valid reservation and displays confirmation', async () => {
  render(<App />);

  await userEvent.selectOptions(screen.getByLabelText(/choose time/i), '19:00');
  await userEvent.clear(screen.getByLabelText(/first name/i));
  await userEvent.type(screen.getByLabelText(/first name/i), 'Sofia');
  await userEvent.clear(screen.getByLabelText(/last name/i));
  await userEvent.type(screen.getByLabelText(/last name/i), 'Martinez');
  await userEvent.clear(screen.getByLabelText(/email/i));
  await userEvent.type(screen.getByLabelText(/email/i), 'sofia@example.com');
  await userEvent.clear(screen.getByLabelText(/phone/i));
  await userEvent.type(screen.getByLabelText(/phone/i), '3125551234');

  await userEvent.click(screen.getByRole('button', { name: /submit reservation/i }));

  expect(screen.getByRole('heading', { name: /reservation confirmed/i })).toBeInTheDocument();
});