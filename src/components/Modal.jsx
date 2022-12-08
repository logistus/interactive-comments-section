function Modal({ setShowModal }) {
  return (
    <div className="modal">
      <div className="modal__title">Delete comment</div>
      <div className="modal__body">
        Are you sure you want to delete this comment? This will remove the comment and can't be undone.
      </div>
      <div className="modal__footer">
        <a href="#" className="modal__button modal__button-neutral" onClick={(e) => { e.preventDefault(); setShowModal(false) }}>NO, CANCEL</a>
        <a href="#" className="modal__button modal__button-danger" onClick={(e) => { e.preventDefault(); setShowModal(false) }}>YES, DELETE</a>
      </div>
    </div>
  );
}

export default Modal;