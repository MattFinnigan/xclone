import { testing } from './utils/api'
import './App.css'

const fetchData = () => {
  testing()
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchData}>Fetch Data</button>
      </header>
    </div>
  )
}

export default App
