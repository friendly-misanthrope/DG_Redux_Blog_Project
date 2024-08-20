import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increaseCount, getCount } from "../features/posts/postsSlice";

const Header = () => {
  const count = useSelector(getCount);
  const dispatch = useDispatch();

  return (
    <header className="Header">
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'post'}>New Post</Link></li>
          <li><Link to={'users'}>Users</Link></li>
        </ul>
        <button onClick={() => dispatch(increaseCount())}>{count}</button>
      </nav>
    </header>
  )
}
export default Header;