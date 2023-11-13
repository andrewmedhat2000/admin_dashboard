import { user, resetuser } from '../types';

export function userReducer(
  state = {
    user: {},
  },
  action
) {
  switch (action.type) {
    case user:
      return { ...state, user: { ...state.user, ...action.payload } };
    case resetuser:
      return { ...state, user: {} };
    default:
      return { ...state };
  }
}
