import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import { logger } from 'redux-logger';


export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer
  },
  middleware: ((getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  })
});