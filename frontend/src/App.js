<<<<<<< HEAD
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button, FloatingLabel } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./App.css";
import API from "./API";

function App() {
  const [ticket1, setTicket1] = useState(false);
  const [service1, setService1] = useState();
  const [ticket2, setTicket2] = useState(false);
  const [service2, setService2] = useState();

  const nextTicket = async(counter_id) => {

    const nextService = await API.getNextService(counter_id);
    console.log(nextService);
    
    const nextTicket = await API.getNextTicketFromService(nextService[0].code);
    console.log(nextTicket[0]);

    if(counter_id == 1) {
      setService1(nextService[0].code);
      nextTicket[0] ? setTicket1(nextTicket[0].daily_number) : setTicket1();
    }
    else {
      setService2(nextService[0].code);
      nextTicket[0] ? setTicket2(nextTicket[0].daily_number) : setTicket2();
    }
    

    API.updateTicket(nextTicket[0],counter_id);

  }

  /*useEffect(() => {
    if (dirty) {
      
    }
  }, [dirty])*/

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
          <Button className={"mt-3 mx-3"} onClick={()=> nextTicket(1)}>
            Next client
          </Button>
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
          <Button className={"mt-3 mx-3"} onClick={()=> nextTicket(2)}>
            Next client
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="column">ticket request</div>
        <div className="column"> <FloatingLabel>{ ticket1 ? "Ticket " + service1 + ticket1 + " has been called to counter 1" : ticket2 ? "Ticket " + service2 + ticket2 + " has been called to counter 2" : ""}</FloatingLabel> </div>
=======
import logo from './logo.svg';
import './App.css';

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
         ticket request
       </div>
       <div className="column">
         monitor to notify client turn
       </div>
>>>>>>> abc6fb6c6ab522e2ac9f4adf76d6adf46beda97a
      </div>
    </div>
  );
}

export default App;
