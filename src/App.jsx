import Comment from './components/Comment'
import ReplyForm from './components/ReplyForm'
import data from './data.json'
import { useState } from 'react'

function App() {
  const [currentUser] = useState(data.currentUser)
  return (
    <div className="container">
      {data.comments.map(comment => <Comment data={comment} key={comment.id} type="comment" currentUser={currentUser} />)}
      <ReplyForm currentUser={currentUser} type="comment" />
    </div>
  )
}

export default App
