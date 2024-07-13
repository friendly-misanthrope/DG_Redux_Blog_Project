import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice";
import PostsExcerptView from "./PostsExcerptView";
import ClipLoader from 'react-spinners/ClipLoader'

const PostsView = () => {
  
  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  },[postsStatus, dispatch])

  let content;

  if (postsStatus === "pending") {
    content = 
    <div className="loader">
      <p>Content Loading...</p>
      <span>
        <ClipLoader color="#00d1ff" />
      </span>
    </div>
  } else if (postsStatus === "fulfilled") {
    const orderedPosts = allPosts.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    content = orderedPosts.map(post => {
      return <PostsExcerptView key={post.id} post={post} />
    })
  } else if (postsStatus === 'rejected') {
    content = <p>{postsError}</p>
  }
  
  return (
    <section>
      <h2>Posts:</h2>
      {content}
    </section>
  );
}

export default PostsView;