import {Net} from '@/utils/request'

// export async function login(payload) {
//   return $$.post('/user/login', payload);
// }
 
export async function login(payload) {
  return Net.post('/authenticate', payload,{afterResponse:null});
}
export async function user(payload) {
  return  Net.get('/account', payload,{afterResponse:null});
}