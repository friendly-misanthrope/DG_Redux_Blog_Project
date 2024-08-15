import PostAuthorView from "./PostAuthorView";
import CreatedAt from "./CreatedAtView";
import ReactionsView from "./ReactionsView";
import { Link } from "react-router-dom";

const PostsExcerpt = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      {
        post.body.length > 50 ?
        <p className="excerpt">{post.body.substring(0, 75)}...</p>
          : <p>{post.body}</p>
      }
      
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthorView userId={post.userId} />
        <CreatedAt timestamp={post.createdAt} />
      </p>
      <ReactionsView post={post} />
    </article>
  );
}
export default PostsExcerpt;