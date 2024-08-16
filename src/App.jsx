import AddPostView from "./features/posts/AddPostView";
import PostsView from "./features/posts/postsView";
import SinglePostView from "./features/posts/SinglePostView";
import Layout from './components/Layout';
import EditPostView from "./features/posts/EditPostView";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostsView />} />
        <Route path='post'>
          <Route index element={<AddPostView />} />
          <Route path=':postId' element={<SinglePostView />} />
          <Route path='edit/:postId' element={<EditPostView />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;