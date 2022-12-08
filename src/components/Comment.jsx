import CommentReply from "./CommentReply";
import Dimmer from './Dimmer';
import Modal from './Modal';
import ReplyForm from "./ReplyForm";
import { useState } from 'react';

function Comment({ data, type, currentUser, setComments, comments, parentId }) {
  const [addReply, setAddReply] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [editText, setEditText] = useState("")

  function setVoteUp(data) {
    if (parentId === data.id) {
      let tempComments = comments.map(comment => {
        if (comment.id === data.id) {
          comment.score++
        }
        return comment
      })
      setComments(tempComments)
    } else {
      let tempComments = comments.map((comment) => {
        if (comment.id === parentId) {
          comment.replies.map(reply => {
            if (reply.id === data.id) {
              reply.score++
            }
            return reply
          })
        }
        return comment
      })
      setComments(tempComments)
    }
  }

  function setVoteDown(data) {
    if (parentId === data.id) {
      let tempComments = comments.map(comment => {
        if (comment.id === data.id) {
          comment.score--
        }
        return comment
      })
      setComments(tempComments)
    } else {
      let tempComments = comments.map((comment) => {
        if (comment.id === parentId) {
          comment.replies.map(reply => {
            if (reply.id === data.id) {
              reply.score--
            }
            return reply
          })
        }
        return comment
      })
      setComments(tempComments)
    }
  }

  function editComment(e) {
    e.preventDefault()
    // we are editing a comment
    if (parentId === data.id) {
      let tempComments = comments.map(comment => {
        if (comment.id == data.id) {
          comment.content = editText
        }
        return comment
      })
      setComments(tempComments)
    } else {
      let tempComments = comments.map(comment => {
        if (comment.id == parentId) {
          comment.replies.map(reply => {
            if (reply.id === data.id) {
              reply.content = editText
            }
            return reply
          })
        }
        return comment
      })
      setComments(tempComments)
    }
    setShowUpdate(false)
  }

  return (
    <>
      {showModal && <><Modal setShowModal={setShowModal} setComments={setComments} parentId={parentId} comments={comments} data={data} /><Dimmer /></>}
      <div className={`comment__wrapper ${type === 'reply' ? 'is-reply' : ''}`}>
        {type === "reply" ? <div className="reply__border__wrapper"><div className="reply__border"></div></div> : ''}
        <div className={`comment ${type === 'reply' ? 'reply' : ''}`}>
          <div className="comment__vote">
            <a href="#" className="comment__vote__up" onClick={(e) => { e.preventDefault(); setVoteUp(data); }}>
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF" /></svg>
            </a>
            <div className="comment__score">{data.score}</div>
            <a href="#" className="comment__vote__down" onClick={(e) => { e.preventDefault(); setVoteDown(data); }}>
              <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF" /></svg>
            </a>
          </div>
          <div className="comment__owner">
            <img src={data.user.image.png} alt={data.user.username} className="comment__owner__avatar" />
            <div className="comment__owner__username">
              {data.user.username}
              {currentUser.username === data.user.username ? <span className="currentUser">you</span> : ''}
            </div>
            <div className="comment__date">{data.createdAt}</div>
          </div>
          {currentUser.username === data.user.username ?
            <div className="comment__manage">
              <div className="comment__delete">
                <a href="#" onClick={(e) => { e.preventDefault(); setShowModal(true) }}><img src="./images/icon-delete.svg" alt="Delete Comment" /> Delete</a>
              </div>
              <div className="comment__edit">
                <a href="#" onClick={(e) => { e.preventDefault(); setShowUpdate(!showUpdate) }}><img src="./images/icon-edit.svg" alt="Edit Comment" /> Edit</a>
              </div>
            </div>
            : <div className="comment__reply">
              <a href="#" onClick={(e) => { e.preventDefault(); setAddReply(!addReply) }}> <img src="./images/icon-reply.svg" alt="Reply" />Reply</a>
            </div>
          }

          <div className="comment__body">
            {!showUpdate ? <div>
              {data.replyingTo ? (<span className="reply_to">@{data.replyingTo} </span>) : ''}
              {data.content}
            </div> : <form className="update-form" onSubmit={editComment}>
              <textarea defaultValue={data.content} rows={3} onChange={(e) => setEditText(e.target.value)}></textarea>
              <button type="submit">UPDATE</button>
            </form>}
          </div>
        </div>
      </div>
      {addReply ? <ReplyForm currentUser={currentUser} type={type} comments={comments} parentId={parentId} setComments={setComments} setAddReply={setAddReply} replyTo={data.user.username} /> : ''}
      {data.replies ? data.replies.map(reply => <CommentReply data={reply} key={reply.id} currentUser={currentUser} setComments={setComments} comments={comments} parentId={data.id} />) : ''}
    </>
  );
}

export default Comment;