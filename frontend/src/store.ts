import { configureStore } from "@reduxjs/toolkit";
import { userSignInReducer } from "./reducers/userReducer";
// ...

const store = configureStore({
  reducer: {
    userSignInReducer,
  },
});

export default store;
// composeWithDevTools(applyMiddleware(...middleware))

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
