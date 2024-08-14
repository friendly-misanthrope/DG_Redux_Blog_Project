import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectPostById } from './postsSlice';
import PostAuthorView from './PostAuthorView';
import CreatedAt from './CreatedAtView';
import ReactionsView from './ReactionsView';

const SinglePostView = () => {

  const post = useSelector((state) => selectPostById(state, postId));
  const { postId } = useParams();

  if (!post) {
    return (
      <section>
        <h2>This post doesn't exist!</h2>
      </section>
    );
  }
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <PostAuthorView userId={post.userId} />
        <CreatedAt timestamp={post.createdAt} />
      </p>
      <ReactionsView post={post} />
    </article>
  )
}
export default SinglePostView;