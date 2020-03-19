import { Net } from '@/utils/request'

export async function getTableList (payload) {
  return Net.post('/authenticate', payload, { afterResponse: null });
}
