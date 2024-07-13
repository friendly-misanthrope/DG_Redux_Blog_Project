import { parseISO, formatDistanceToNow } from "date-fns";

const CreatedAtView = ({timestamp}) => {
  let createdAt = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timeAgo = formatDistanceToNow(date);
    createdAt = `${timeAgo} ago`;
  }

  return (
    <span title={parseISO(timestamp)}>
      &nbsp; <i>{createdAt}</i>
    </span>
  );
}

export default CreatedAtView;
