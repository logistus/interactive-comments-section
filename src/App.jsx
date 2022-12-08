import Comment from './components/Comment'
import ReplyForm from './components/ReplyForm'
import data from './data.json'
import { useState } from 'react'

function App() {
  const [currentUser] = useState(data.currentUser)
  const [comments, setComments] = useState(data.comments)
  return (
    < div className="container" >
      {comments.map(comment => <Comment data={comment} key={comment.id} type="comment" currentUser={currentUser} setComments={setComments} comments={comments} parentId={comment.id} />)}
      < ReplyForm currentUser={currentUser} type="comment" comments={comments} parentId={""} setComments={setComments} />
    </div >
  )
}

export default App
