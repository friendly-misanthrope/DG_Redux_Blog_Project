import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from 'axios';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  posts: [],
  status: 'idle',
  error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', () => (
  axios.get(POSTS_URL)
    .then((response) => response.data)
    .catch(e => console.log(e))
));

export const addPost = createAsyncThunk('posts/addPost', (newPost) => (
  axios.post(POSTS_URL, newPost)
    .then((response) => response.data)
));

export const editPost = createAsyncThunk('posts/editPost', async (editedPost) => {
  const { id } = editedPost;
  return await axios.put(`${POSTS_URL}/${id}`, editedPost)
    .then((response) => response.data)
});

export const deletePost = createAsyncThunk('posts/deletePost', (postToDelete) => {
  const { id } = postToDelete;
  axios.delete(`${POSTS_URL}/${id}`, postToDelete)
    .then((response) => {
      if (response.status === 200) {
        return postToDelete;
      }
      return `${response.status}: ${response.statusText}`;
    });
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const {postId, reaction} = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.reactions[reaction]++;
      }
    },
    reactionRemoved(state, action) {
      const {postId, reaction} = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post && post.reactions[reaction] > 0) {
        post.reactions[reaction]--;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const posts = action.payload.map(post => {
          post.createdAt = sub(new Date(), { minutes: Math.random() * 500 }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
          }
          return post;
        });
        state.posts = state.posts.concat(posts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        action.payload.id = state.posts.length + 1;
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
      })
      .addCase(editPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId)
        if (!action.payload?.id) {
          console.error("No post ID provided, update failed\n", action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter(post => post.id !== id);
        state.posts = [...posts, action.payload]
      })
  } 
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) => 
  state.posts.posts.find(post => post.id === postId);

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const { postAdded, reactionAdded, reactionRemoved } = postsSlice.actions;
export default postsSlice.reducer;