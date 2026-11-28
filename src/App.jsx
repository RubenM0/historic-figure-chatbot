import { useRef, useState } from 'react'
import './App.css'
import ChatWindow from './ChatWindow.jsx'
import Composer from './Composer.jsx'
import Settings from './Settings.jsx'

function App() {
  const [messages, setMessages] = useState([])
  const [thinking, setThinking] = useState(false)
  const nextId = useRef(0)
  const thinkingRef = useRef(false)
  const thinkingTime = 1000

  async function handleSend(text) {
    if (thinkingRef.current) return
    thinkingRef.current = true
    setThinking(true)

    const id = nextId.current++
    setMessages((prev) => [...prev, { id, role: "user", text }])

    try {
      // Hold dots until thinkingTime passes which is called at setTimeout()
      const [response] = await Promise.all([
        fetch("/api/chat", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ message: text }),
        }),
        new Promise((resolve) => setTimeout(resolve, thinkingTime)),
      ])

      if (!response.ok) return

      const data = await response.json()
      if (!data.reply) return

      const replyId = nextId.current++
      setMessages((prev) => [...prev, { id: replyId, role: "figure", text: data.reply }])
    } catch {
      // Dots clear below. Do not invent a reply.
    } finally {
      thinkingRef.current = false
      setThinking(false)
    }
  }


  return (
    <div className="page">
      <Settings />
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
          <ChatWindow messages={messages} thinking={thinking} />
          <Composer onSend={handleSend} />
        </section>
      </div>

      <img className="caesar-img" src="/images/Caesar.png" alt="Julius Caesar" />

    </div>
  )
}

export default App
