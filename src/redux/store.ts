// store.ts
import { createStore } from 'redux';
import contactsReducer from './reducer'; 

const store = createStore(contactsReducer);

export type RootState = ReturnType<typeof contactsReducer>;

export default store;
