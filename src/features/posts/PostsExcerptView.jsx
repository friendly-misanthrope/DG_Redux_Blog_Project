import AuthorView from "./AuthorView";
import CreatedAtView from "./CreatedAtView";
import ReactionButtonsView from "./ReactionButtonsView";

const PostsExcerptView = ({ post }) => {
  
  return (
    <article className="postsExcerpt">
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <AuthorView userId={post.userId} />
        <CreatedAtView timestamp={post.createdAt} />
      </p>
      <ReactionButtonsView post={post}/>
    </article>
  )
}

export default PostsExcerptView;