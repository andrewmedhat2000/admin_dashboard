import { createStore } from 'redux';
import mainReducer from './Reducers/rootReducer';
export const store = createStore(mainReducer);
