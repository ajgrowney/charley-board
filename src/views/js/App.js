import '../css/App.css';
import { lastEvents } from '../../components/js/index'
function App() {
  const lastEventTimes = lastEvents({})
  return (
    <div className="App">
      <header className="App-header">
        <h1> Charley Dashboard </h1>
        {lastEventTimes}
      </header>
    </div>
  );
}

export default App;
