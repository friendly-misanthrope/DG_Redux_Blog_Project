
import { useSelector } from "react-redux";
import { BallTriangle } from "react-loader-spinner";
import PostsExcerpt from "./PostsExcerptView";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
} from "./postsSlice";

const PostsView = () => {

  // postsSlice selectors
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  let content;

  // Loading spinner
  if (postsStatus === "pending") {
    content = 
    <>
      <p className="loader">Loading...</p>
      <div className="loader">
        <BallTriangle 
        height={100}
        color="#61dbfb" />
      </div>
    </>
    // Render post content if fetch successful
  } else if (postsStatus === "fulfilled") {
    const orderedPosts = posts.slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
    // PostsView content if fetch not successful
  } else if (postsStatus === "rejected") {
    content = <p>{postsError}</p>;
  }

  return (
    <section>
      {content}
    </section>
  );
};

export default PostsView;