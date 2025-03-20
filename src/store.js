import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { exitexamApi } from "./components/ExitExam/data/api/dataApi";

export const store = configureStore({
  reducer: { [exitexamApi.reducerPath]: exitexamApi.reducer },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exitexamApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
// const handleLogout = () => {
//   const state = store.getState().auth.token;
//   if (state === null && store.getState().auth.isAuthenticated) {
//     store.dispatch(logout());
//   }
// };
// handleLogout();
// const unsubscribe = store.subscribe(handleLogout);

// unsubscribe();
