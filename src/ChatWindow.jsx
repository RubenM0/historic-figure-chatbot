import { useEffect, useRef } from 'react'
import './ChatWindow.css'

export default function ChatWindow({ messages = [] }) {
  const windowRef = useRef(null)

  useEffect(() => {
    const el = windowRef.current
    if (el) el.scrollTop = 0
  }, [messages])

  return (
    <section
      ref={windowRef}
      className="chat-window"
      aria-label="Messages"
      aria-live="polite"
    >
      {messages.slice().reverse().map((m) => (
        <p
          className={m.role === 'figure' ? 'chat-message chat-message-figure' : 'chat-message'}
          key={m.id}
        >
          {m.text}
        </p>
      ))}
    </section>
  )
}
