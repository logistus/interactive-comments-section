import Comment from "./Comment";
function CommentReply({ data, currentUser, setComments, comments, parentId }) {
  return (
    <Comment data={data} type="reply" currentUser={currentUser} setComments={setComments} comments={comments} parentId={parentId} />
  );
}

export default CommentReply;