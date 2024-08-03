import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';
import { useParams } from 'react-router-dom';

import AuthorView from './AuthorView';
import CreatedAtView from './CreatedAtView';
import ReactionButtonsView from './ReactionButtonsView';

const SinglePostView = () => {

  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>The specified post doesn't exist</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <AuthorView userId={post.userId} />
        <CreatedAtView timestamp={post.createdAt} />
      </p>
      <ReactionButtonsView post={post}/>
    </article>
  );
}

export default SinglePostView;