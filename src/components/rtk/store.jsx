import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import cartSlice from './slices/cartslise';

// تكوين persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // فقط الـ cart هو اللي هيتم حفظه
};

// دمج الـ reducers
const rootReducer = combineReducers({
  cart: cartSlice,
  // أضف أي reducers أخرى هنا
});

// تطبيق persist على الـ rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// إنشاء الـ store مع الـ persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

// إنشاء الـ persistor
export const persistor = persistStore(store);

// للتحقق من الـ state بعد الـ rehydrate
persistor.subscribe(() => {
  console.log('🔄 Persistor state:', persistor.getState());
  console.log('📊 Store state after rehydrate:', store.getState());
});