// import CSS and components here
import PostsView from "./features/posts/PostsView";
import AddPostView from "./features/posts/AddPostView";
import SinglePostView from "./features/posts/SinglePostView";
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />} />
        <Route index element={<PostsView />} />
        <Route path='post'>
          <Route index element={<AddPostView />} />
          <Route path=":postId" element={<SinglePostView />} />
        </Route>
    </Routes>
  );
}

export default App;