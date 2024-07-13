import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', () => {
  return axios.get(POSTS_URL)
    .then(response => response.data)
});

export const addNewPost = createAsyncThunk('posts/addNewPost', (newPost) => {
  return axios.post(POSTS_URL, newPost)
    .then(response => response.data);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, body, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            createdAt: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          }
        }
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.reactions[reaction]++;
      }
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        let min = 1;
        const loadedPosts = action.payload.map(post => {
          post.createdAt = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
          }
          return post;
        })
        state.posts = state.posts.concat(loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'rejected';
        state.posts = [];
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.createdAt = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
        }
        state.posts.push(action.payload);
      });
  }
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError= (state) => state.posts.error;
export const { postAdded, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;