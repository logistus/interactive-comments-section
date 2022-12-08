function Modal({ setShowModal, setComments, parentId, comments, data }) {
  function deleteComment(data) {
    if (parentId == data.id) {
      let tempComments = comments.filter(comment => comment.id !== data.id)
      setComments(tempComments)
    } else {
      let tempComments = comments.map((comment) => {
        if (comment.id === parentId) {
          const tempReplies = comment.replies.filter(reply => reply.id !== data.id)
          comment.replies = tempReplies
        }
        return comment
      })
      setComments(tempComments)
    }
  }
  return (
    <div className="modal">
      <div className="modal__title">Delete comment</div>
      <div className="modal__body">
        Are you sure you want to delete this comment? This will remove the comment and can't be undone.
      </div>
      <div className="modal__footer">
        <a href="#" className="modal__button modal__button-neutral" onClick={(e) => { e.preventDefault(); setShowModal(false) }}>NO, CANCEL</a>
        <a href="#" className="modal__button modal__button-danger" onClick={(e) => { e.preventDefault(); setShowModal(false); deleteComment(data) }}>YES, DELETE</a>
      </div>
    </div>
  );
}

export default Modal;