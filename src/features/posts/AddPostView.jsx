import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostView = () => {
  const [post, setPost] = useState({
    title: '',
    body: '',
    userId: ''
  });

  const [newPostSubmitStatus, setNewPostSubmitStatus] = useState('idle')
  const { title, body, userId } = post;
  const isValidPost = [title, body, userId].every(Boolean) && newPostSubmitStatus === 'idle';

  
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const changeHandler = (e) => {
    setPost(prevState => {return { ...prevState, [e.target.name]: e.target.value }});
  }

  const addPost = (e) => {
    e.preventDefault();
    try {
      if (isValidPost) {
        setNewPostSubmitStatus('pending');
        dispatch(addNewPost({title, body, userId})).unwrap();
        setPost({
          title: '',
          body: '',
          userId: ''
        });
      }
    } catch(e) {
      console.error('Failed to save post', e)
    } finally {
      setNewPostSubmitStatus('idle')
    }
  }

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  

  return (
    <section>
      <h2>Add New Post</h2>
      <form>
        <label htmlFor="title">Post Title: </label>
        <input type="text" name="title" value={title} onChange={changeHandler} />
        
        <label htmlFor="userId">Select Author</label>
        <select name="userId" id="userId" onChange={changeHandler}>
          <option value=""></option>
          { usersOptions }
        </select>

        <label htmlFor="body">Post Content: </label>
        <input type="text" name='body' value={body} onChange={changeHandler} />

        <button type="button" onClick={addPost} disabled={!isValidPost}>Save Post</button>
      </form>
    </section>
  );
}

export default AddPostView;