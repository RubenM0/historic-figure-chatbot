import { useState } from 'react'
import './Composer.css'

export default function Composer({ onSend }) {
  const [text, setText] = useState('')

  return (
    <form
      className="composer"
      onSubmit={(event) => {
        event.preventDefault()
        const trimmed = text.trim()
        if (!trimmed) return
        onSend(trimmed)
        setText('')
      }}
    >
      <input
        className="composer-input"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type a message"
        aria-label="Message"
      />
      <button className="composer-button" type="submit" aria-label="Send message">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 19V5m-7 7 7-7 7 7" />
        </svg>
      </button>
    </form>
  )
}
