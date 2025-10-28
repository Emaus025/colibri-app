// k6/script.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

// Métricas personalizadas
const loginSuccess = new Counter('login_success');
const bookingSuccess = new Counter('booking_success');

export const options = {
  vus: 10,          // 10 usuarios virtuales
  duration: '30s',  // Duración de la prueba
};

const BASE_URL = 'https://colibri-app-backend-0eu9.onrender.com';

export default function () {
  // 1. Login
  const loginRes = http.post(
    `${BASE_URL}/api/auth/login`,
    JSON.stringify({ email: 'user@example.com' }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  const isLoginOK = check(loginRes, {
    'Login status 200': (r) => r.status === 200,
    'Login tiene token': (r) => r.json('token') !== undefined,
  });

  if (isLoginOK) {
    loginSuccess.add(1);
    const userId = loginRes.json('user.id');

    // 2. Reservar un viaje
    const bookingRes = http.post(
      `${BASE_URL}/api/bookings`,
      JSON.stringify({
        userId: userId,
        origin: 'Madrid',
        destination: 'Barcelona',
        date: '2025-11-01',
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );

    const isBookingOK = check(bookingRes, {
      'Booking status 201': (r) => r.status === 201,
    });

    if (isBookingOK) {
      bookingSuccess.add(1);
    }
  }

  sleep(1);
}