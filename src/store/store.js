import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Використовує localStorage
import dataSlice from './DataSlice.js';
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    dataSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
