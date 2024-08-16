import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectPostById, updatePost } from "./postsSlice";
import UsersOptions from "./UsersOptions";


const EditPostView = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postToEdit = useSelector((state) => selectPostById(Number(state, postId)));

  if (!postToEdit) {
    return (
      <section>
        <h2>This post doesn't exist!</h2>
      </section>
    );
  }

  const [postReqStatus, setPostReqStatus] = useState('idle');
  const [editedPost, setEditedPost] = useState({
    title: postToEdit.title,
    body: postToEdit.body,
    userId: postToEdit.userId
  });

  const { title, body, userId } = editedPost;

  const postChangeHandler  = (e) => {
    setEditedPost(prevState => {return {...prevState, [e.target.name]: e.target.value}});
  }

  const postIsValid = [title, body, userId].every(Boolean) && postReqStatus === 'idle';
  
  const updatePostOnClick = (e) => {
    e.preventDefault();

    if (postIsValid) {
      try {
        setPostReqStatus('pending');
        dispatch(updatePost({title, body, userId})).unwrap();
        setEditedPost({
          title: '',
          body: '',
          userId: ''
        });
      } catch(err) {
        console.error('Unable to update post');
      } finally {
        setPostReqStatus('idle');
        navigate('/');
      }
    }
  }
  
  return (
    <section>
      <h2>Update Post</h2>
      <form>
        <label htmlFor="title">Post Title: </label>
        <input type="text"
        id="title"
        name="title"
        value={title}
        onChange={postChangeHandler} />

        <label htmlFor="userId">Author: </label>
        <select name="userId"
        id="userId"
        value={userId}
        onChange={postChangeHandler} >
          <UsersOptions />
        </select>

        <label htmlFor="body">Post Content: </label>
        <textarea
        rows="5"
        name="body"
        id="body"
        value={body}
        onChange={postChangeHandler} />

        <button
        onClick={updatePostOnClick}
        disabled={!postIsValid}>
          Update Post
        </button>
      </form>
    </section>
  );
}
export default EditPostView;