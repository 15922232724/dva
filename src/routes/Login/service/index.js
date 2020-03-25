import { Net } from '@/utils/request'



export async function login (payload) {
  console.log(payload)
  return Net.post('/account/authenticate', payload, { afterResponse: null });
}
export async function user (payload) {
  return Net.get('/account', payload, { afterResponse: null });
}