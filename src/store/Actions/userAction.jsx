import { user, resetuser } from '../types';
export function setuser(data) {
  return {
    type: user,
    payload: data,
  };
}

export function resetusers(data) {
  return {
    type: resetuser,
    payload: data,
  };
}
