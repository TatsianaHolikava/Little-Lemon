export function fetchAPI(date) {
  const selectedDate = new Date(date);
  const day = selectedDate.getDay();

  if (Number.isNaN(selectedDate.getTime())) {
    return [];
  }

  const weekdayTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];
  const weekendTimes = ['16:00', '17:30', '19:00', '20:30', '22:00'];

  return day === 0 || day === 6 ? weekendTimes : weekdayTimes;
}

export function submitAPI(formData) {
  return Boolean(formData.date && formData.time && formData.guests);
}

export function initializeTimes() {
  const today = new Date().toISOString().split('T')[0];
  return fetchAPI(today);
}

export function updateTimes(state, action) {
  switch (action.type) {
    case 'date_changed':
      return fetchAPI(action.date);
    default:
      return state;
  }
}
