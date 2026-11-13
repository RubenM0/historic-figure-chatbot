import './App.css'
import ChatWindow from './ChatWindow.jsx'
import Composer from './Composer.jsx'

function App() {
  return (
    <div className="page">
      <h1>Historic Figure Chatbot</h1>

      <section id="bio">
        <h2 className="bio-title">Julius Caesar</h2>
      </section>
      <ChatWindow />
      <Composer />
    </div>
  )
}

export default App
