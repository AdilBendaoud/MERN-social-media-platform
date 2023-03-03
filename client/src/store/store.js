import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "root", storage, version: 1 };
const myPersistReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: { myPersistReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
