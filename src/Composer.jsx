import { useState } from 'react'
import './Composer.css'


export default function Composer() {
  const [text, setText] = useState('')

  return (
    <form
      className="composer"
      onSubmit={(event) => {
        event.preventDefault()
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
      <button className="composer-button" type="submit">
        Send
      </button>



    </form>




  )
}