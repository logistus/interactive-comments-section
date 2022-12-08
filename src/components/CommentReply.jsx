import Comment from "./Comment";
function CommentReply({ data, currentUser }) {
  return (
    <Comment data={data} type="reply" currentUser={currentUser} />
  );
}

export default CommentReply;