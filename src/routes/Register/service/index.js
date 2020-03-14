import {Net} from '@/utils/request'

export async function register(payload) {
  return Net.post('/user/register', payload);
}