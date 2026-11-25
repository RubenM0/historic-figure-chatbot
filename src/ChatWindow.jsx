import { useEffect, useRef } from 'react'
import './ChatWindow.css'

export default function ChatWindow({ messages = [], thinking = false }) {
  const windowRef = useRef(null)

  useEffect(() => {
    const el = windowRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, thinking])

  return (
    <section
      ref={windowRef}
      className="chat-window"
      aria-label="Messages"
      aria-live="polite"
    >
      {messages.map((m) => (
        <p
          className={
            m.role === 'figure'
              ? 'chat-message chat-message-figure'
              : 'chat-message chat-message-user'
          }
          key={m.id}
        >
          {m.text}
        </p>
      ))}
      {thinking && (
        <div
          className="chat-message chat-message-figure chat-typing"
          role="status"
          aria-label="Caesar is typing"
        >
          <span className="chat-typing-dot" />
          <span className="chat-typing-dot" />
          <span className="chat-typing-dot" />
        </div>
      )}
    </section>
  )
}
