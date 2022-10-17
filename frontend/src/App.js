import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { Officer } from './Officer';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="row">
       <div className="column">
        <Officer></Officer>
       </div>
       <div className="column">
        counter1
       </div>
      </div>
      <div className="row">
       <div className="column">
         ticket request
       </div>
       <div className="column">
         monitor to notify client turn
       </div>
      </div>
    </div>
  );
}

export default App;
