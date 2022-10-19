import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./App.css";
import API from "./API";

function App() {
  const [ticket, setTicket] = useState(false);

  const nextTicket = async(counter_id) => {

    const nextService = await API.getNextService(counter_id);
    console.log(nextService);
    const nextTicket = await API.getNextTicketFromService(nextService[0].code);
    console.log(nextTicket[0]);

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
            {ticket ? (
              <Row className={"fs-4"}>Ticket Disponibile</Row>
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
            {ticket ? (
              <Row className={"fs-4"}>Ticket Disponibile</Row>
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
        <div className="column">monitor to notify client turn</div>
      </div>
    </div>
  );
}

export default App;
