
import './App.css';
import TicketScreen from './components/ticketScreen'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button, FloatingLabel, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./App.css";
import API from "./API";

function App() {
  const [ticket1, setTicket1] = useState(false);
  const [service1, setService1] = useState();
  const [ticket2, setTicket2] = useState(false);
  const [service2, setService2] = useState();
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [lastCall, setLastCall] = useState('');

  const nextTicket = async (counter_id) => {

    const nextService = await API.getNextService(counter_id);


    const nextTicket = await API.getNextTicketFromService(nextService[0].code);


    if (!nextTicket[0]) {
      if (counter_id == 1) {
        setError1("There are no more clients to serve!");
        setTicket1();
      }
      else
        setError2("There are no more clients to serve!");
      setTicket2();
    }
    else {
      if (counter_id == 1) {
        setLastCall(1);
        setService1(nextService[0].code);
        setTicket1(nextTicket[0].daily_number);
      }
      else {
        setLastCall(2);
        setService2(nextService[0].code);
        setTicket2(nextTicket[0].daily_number);
      }


      API.updateTicket(nextTicket[0], counter_id);
    }

  }

  return (
    <div className="App">
      <div className="row">
        <div className="column">
          <Container className={"mt-3 mx-3"}>
            <Row className={"fs-3"}>Welcome officer1!</Row>
            {ticket1 ? (
              <Row className={"fs-4"}> {"Serving ticket " + service1 + ticket1} </Row>
            ) : (
              <Row className={"fs-4"}>No Ticket</Row>
            )}
          </Container>
          <Button className={"mt-3 mx-3"} onClick={() => nextTicket(1)}>
            Next client
          </Button>
          {error1 ? <Alert variant='danger' onClose={() => setError1('')} dismissible>{error1}</Alert> : false}
        </div>
        <div className="column">
          <Container className={"mt-3 mx-3"}>
            <Row className={"fs-3"}>Welcome officer2!</Row>
            {ticket2 ? (
              <Row className={"fs-4"}> {"Serving ticket " + service2 + ticket2} </Row>
            ) : (
              <Row className={"fs-4"}>No Ticket</Row>
            )}
          </Container>
          <Button className={"mt-3 mx-3"} onClick={() => nextTicket(2)}>
            Next client
          </Button>
          {error2 ? <Alert variant='danger' onClose={() => setError2('')} dismissible>{error2}</Alert> : false}
        </div>
      </div>
      <div className="row">
        <div className="column">
          <TicketScreen></TicketScreen>
        </div>
        <div className="column">
          <FloatingLabel className={"fs-4 mt-3 mx-3"}>{lastCall == 1 ? "Ticket " + service1 + ticket1 + " has been called to counter 1" : lastCall == 2 ? "Ticket " + service2 + ticket2 + " has been called to counter 2" : ""}</FloatingLabel> 
        </div>
      </div>
    </div>
  );
}

export default App;
