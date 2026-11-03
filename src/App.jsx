import './App.css'
import Composer from './Composer.jsx'

function App() {
  return (
    <div>
      <h1>Historic Figure Chatbot</h1>

      <section id="bio">
        <h2 className="bio-title">Julius Caesar</h2>
        <div className="bio-copy">
          <p>Julius Ceasar on the lowkey.</p>
          <p>This is a test do not take it seriously.</p>
        </div>
      </section>
      <Composer />
    </div>
  )
}

export default App
