function ReplyForm({ currentUser, type }) {
  return (
    <form className={`reply__wrapper ${type === "reply" ? "to-reply" : ""}`}>
      <img src={currentUser.image.png} alt={currentUser.username} />
      <div className="reply-form-content">
        <textarea rows={3} className="reply__text" placeholder='Add a comment...' />
        <button type='submit'>{type === "comment" ? "SEND" : "REPLY"}</button>
      </div>
    </form>
  );
}

export default ReplyForm;