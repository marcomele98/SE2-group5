
import './App.css';
import TicketScreen from './components/ticketScreen'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button, FloatingLabel, Alert, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./App.css";
import API from "./API";
import Ticket from './Actors/ticket';

function App() {

  const [timeAsked, setTimeAsked] = useState();
  const [ticketNum, setTicketNum] = useState();
  const [showWaitingTime, setShow] = useState();
  const [waitingTime, setWaitingTime] = useState();
  const [ticket_service, setTicketService] = useState();
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

  const waitingTimeRequest = (event) => {
    event.preventDefault();
    setShow(true);
    getWaitingTime();
  }

  const getWaitingTime = async() => {
    const tickets = await API.getTickets();
    const services = await API.getServices();
    const counters = await API.getCounters();

    console.log(ticketNum, ticket_service);

    const ticket = tickets.filter(t => t.daily_number == ticketNum && t.service_code == ticket_service && t.served_by_counter == null)[0];

    if (ticket != undefined) {
      const required_service = services.filter(s => s.code == ticket_service)[0];

      const time_required = required_service.required_time;

      const filtered_tickets = tickets.filter(t => t.service_code == required_service.code && t.served_by_counter == null);

      const service_queue = filtered_tickets.slice(0, filtered_tickets.indexOf(ticket)).length;

      let sum_k_s = 0.0;

      const grouped = counters.reduce(function(groups, item) {
        const val = item.id
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
      }, {});

      for(const element in grouped) {
        if(grouped[element].filter(s => s.service_code == required_service.code).length > 0) {
          sum_k_s += 1.0 / grouped[element].length;
        }
      }

      console.log("Tr = ", time_required);
      console.log("Queue length = ", service_queue);
      console.log("Sum = ", sum_k_s);

      var final_result = (time_required * ((service_queue / sum_k_s) + 0.5) * 60).toFixed(2);
      console.log(final_result);

      var minutes = Math.floor(final_result / 60);
      console.log(minutes);
      var seconds = final_result % 60;
      console.log(seconds);
    
      var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
      console.log(finalTime);

      setWaitingTime(finalTime);
    }
  }

  
  function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
  }


  return (
    <div className="App">
      <div className="row">
        <div className="column_low">
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
        <div className="column_low">
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
        <div className="column_low">
         <>
            <br></br>
            { !timeAsked && <Button  onClick={() => setTimeAsked(true)}>Waiting Time</Button> }
            {
              timeAsked && 
              <Form onSubmit={waitingTimeRequest}>
                <Form.Group>
                    <Form.Label>Insert your ticket code</Form.Label>
                    <Form.Control type='text' onChange={ev => {setTicketService(ev.target.value.substring(0,1)); setTicketNum(ev.target.value.substring(1, ev.target.value.length)); }} required={true} />
                </Form.Group>
                {!showWaitingTime && <Button className="mt-3" type='submit'>Confirm</Button>}
              </Form>
            }
            {
              showWaitingTime &&
              <>
                <FloatingLabel>{waitingTime ? "Estimated waiting time: " + waitingTime + " minutes" : "Ticket number not valid"}</FloatingLabel>
                <Button type='success' onClick={() => {setShow(); setTimeAsked(); setWaitingTime();}}> Ok </Button>
              </>
              
            }
         </>
         
       </div>
      </div>
      <div className="row">
        <div className="column">
          <TicketScreen></TicketScreen>
        </div>
        <div className="column">
          
          <FloatingLabel className={"fs-4 mt-3 mx-3"}>{(lastCall == 1 && ticket1) ? "Ticket " + service1 + ticket1 + " has been called to counter 1" : (lastCall == 2 && ticket2) ? "Ticket " + service2 + ticket2 + " has been called to counter 2" : "No ticket called"}</FloatingLabel> 
        </div>
      </div>
    </div>
  );
}

export default App;
