import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import AuthorView from "./AuthorView";
import CreatedAtView from "./CreatedAtView";
import ReactionButtonsView from "./ReactionButtonsView";

const SinglePostView = () => {
  // todo: get post ID from useParams()
  const postById = useSelector(selectPostById(state, postId));

  if (!postById) {
    return (
      <section>
        <h2>The specified post does not exist</h2>
      </section>
    )
  }
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <AuthorView userId={post.userId} />
        <CreatedAtView timestamp={post.createdAt} />
      </p>
      <ReactionButtonsView post={post} />
    </article>
  )
}

export default SinglePostView;