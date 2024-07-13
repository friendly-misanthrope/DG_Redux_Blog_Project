import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const ReactionButtonsView = ({ post }) => {
  const reactionEmojis = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤',
    rocket: '🚀',
    coffee: '☕'
  }

  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmojis).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
      >
      {emoji} {post.reactions[name]} &nbsp;
      </button>
    );
  });

  return <div>{reactionButtons}</div>
}

export default ReactionButtonsView;