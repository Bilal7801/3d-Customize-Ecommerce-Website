import api from './axios';

export async function payWithCybersource(payload) {
  // Step 1: Get CSRF cookie from backend (important!)
  await api.get('/sanctum/csrf-cookie');

  // Step 2: Now post the payment payload
  return api.post('/api/cybersource/pay', payload);
}
