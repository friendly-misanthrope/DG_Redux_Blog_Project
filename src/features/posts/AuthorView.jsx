import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const AuthorView = ({userId}) => {
  const allUsers = useSelector(selectAllUsers);
  const author = allUsers.find(user => user.id === userId)

  return <span>by {author? author.name : 'Unknown Author'}</span>
}

export default AuthorView;