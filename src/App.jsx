// import CSS and components here
import PostsView from "./features/posts/PostsView";
import AddPostView from "./features/posts/AddPostView";

const App = () => {
  return (
    <div className='App'>
      <AddPostView />
      <PostsView />
    </div>
  );
}

export default App;