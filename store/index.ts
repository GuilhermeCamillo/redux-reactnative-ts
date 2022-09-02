import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch, createSelectorHook, useStore } from "react-redux";
import { persistStore } from "redux-persist";
import { createPersistedReducer } from "./ducks";

/**
 * Starting a new store instance on client or server
 * Using configureStore, store has been configured to enable using the:
 * Redux DevTools Extension to view the history of dispatched actions and how the store state changed,
 * and has had some Redux middleware included by default.
 */
// Redux is being started on the client, adding redux-persist

const store = configureStore({
  reducer: createPersistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

// Creating custom types for our Redux
export type RootStore = ReturnType<() => typeof store>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppDispatch = RootStore["dispatch"];

/**
 * Export a hook that can be reused to resolve actions types
 */
export const useAppStore = () => useStore<RootStore>();

/**
 * Export a hook that can be reused to resolve actions types
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Export a hook that can be reused to resolve state types
 * Let the commented code in case we have to use shallowEqual
 */
export const useAppSelector = createSelectorHook();

/**
 * Redux store
 */
export default store;
