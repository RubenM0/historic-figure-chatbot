import './Chatbuttons.css'

export default function Chatbuttons() {
  return (
    <nav className="chat-buttons" aria-label="Chat actions">
      <button className="chat-action-button" type="button">New chat</button>
      <button className="chat-action-button" type="button">Import chat</button>
      <button className="chat-action-button" type="button">Save chat</button>
    </nav>
  )
}
