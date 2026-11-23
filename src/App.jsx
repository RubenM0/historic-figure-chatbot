import { useRef, useState } from 'react'
import './App.css'
import ChatWindow from './ChatWindow.jsx'
import Composer from './Composer.jsx'

function App() {
  const [messages, setMessages] = useState([])
  const nextId = useRef(0)

  async function handleSend(text) {
    const id = nextId.current++
    setMessages((prev) => [...prev, { id, role: "user", text }])

    //Response from backend
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ message: text }),
    })

    const data = await response.json()
    const replyId = nextId.current++
    setMessages((prev) => [...prev, { id: replyId, role: "figure", text: data.reply }])
  }


  return (
    <div className="page">
      <h1>Historic Figure Chatbot</h1>

      <section id="bio">
        <h2 className="bio-title">Julius Caesar</h2>
      </section>
      <div className="chat-stage">
        <img
          className="chat-parchment"
          src="/images/parchment.png"
          alt=""
          aria-hidden="true"
        />
        <section className="chat-panel" aria-label="Chat">
          <Composer onSend={handleSend} />
          <ChatWindow messages={messages} />
        </section>
      </div>
    </div>
  )
}

export default App
