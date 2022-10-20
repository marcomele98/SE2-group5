import './App.css';
import TicketScreen from './components/ticketScreen'

function App() {
  return (
    <div className="App">
      <div className="row">
       <div className="column">
        counter1
       </div>
       <div className="column">
        counter1
       </div>
      </div>
      <div className="row">
       <div className="column">
         <TicketScreen></TicketScreen>
        </div>
       <div className="column">
         monitor to notify client turn
       </div>
      </div>
    </div>
  );
}

export default App;
