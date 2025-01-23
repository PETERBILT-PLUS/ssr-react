import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.ts";
import { persistReducer, persistStore } from "redux-persist";
import agencySlice from "./agencySlice.ts";

// Custom storage engine for redux-persist
const storage = {
  getItem: (key: string): Promise<string | null> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined") {
        // Client-side: Use localStorage
        const value = localStorage.getItem(key);
        resolve(value);
      } else {
        // Server-side: Simulate storage (or use a server-compatible storage)
        resolve(null);
      }
    });
  },
  setItem: (key: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined") {
        // Client-side: Use localStorage
        localStorage.setItem(key, value);
      }
      resolve();
    });
  },
  removeItem: (key: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined") {
        // Client-side: Use localStorage
        localStorage.removeItem(key);
      }
      resolve();
    });
  },
};

// Combine reducers
const rootReducer = combineReducers({
  user: userSlice,
  agency: agencySlice,
});

// Persist configuration
const persistConfig = {
  key: "auth", // Key for the persisted state
  storage, // Use the custom storage engine
  version: 1, // Version of the persisted state
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const myStore = configureStore({
  reducer: {
    auth: persistedReducer, // Use the persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Create a persistor for the store
export const persistor = persistStore(myStore);

// Export the store as the default export
export default myStore;