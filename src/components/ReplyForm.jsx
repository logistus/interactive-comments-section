import { useState } from 'react'

function ReplyForm({ currentUser, type, comments, parentId, setComments, setAddReply, replyTo }) {

  const [commentText, setCommentText] = useState("");

  function addReplyOrComment(e) {
    e.preventDefault();
    let newComment = {
      id: Math.random(),
      content: commentText,
      createdAt: "now",
      score: 0,
      user: currentUser,
      replies: []
    }
    if (!parentId) {
      const tempComments = [...comments, newComment]
      setCommentText("")
      setComments(tempComments)
    } else {
      let tempComments = comments.map(comment => {
        if (comment.id === parentId) {
          let newReply = {
            id: Math.floor(Math.random() * 99999),
            content: commentText,
            createdAt: "now",
            score: 0,
            replyingTo: replyTo,
            user: currentUser,
          }
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          }
        }
        return comment
      })
      setComments(tempComments)
      setAddReply(false)
    }
  }
  return (
    <div className={`reply__wrapper ${type === "reply" ? "to-reply" : ""}`}>
      <img src={currentUser.image.png} alt={currentUser.username} />
      <form className="reply-form-content" onSubmit={addReplyOrComment}>
        <textarea rows={3} className="reply__text" placeholder='Add a comment...' onChange={(e) => setCommentText(e.target.value)} value={commentText} required />
        <button type='submit'>{type === "comment" ? "SEND" : "REPLY"}</button>
      </form>
    </div>
  );
}

export default ReplyForm;