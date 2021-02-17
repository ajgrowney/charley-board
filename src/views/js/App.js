import '../css/App.css';
import { addEvents, lastEvents } from '../../components/js/index'
function App() {
  const lastEventTimes = lastEvents({})
  const addEventsForm = addEvents()
  return (
    <div className="App">
      <header className="App-header">
        <h1> Charley Dashboard </h1>
      </header>
      <div className="App-body">
      {lastEventTimes}
      {addEventsForm}
      </div>
    </div>
  );
}

export default App;
