import logo from './logo.svg';
import './App.css';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';
import API from './API';

function App() {

  const [timeAsked, setTimeAsked] = useState();
  const [ticketNum, setTicketNum] = useState();
  const [showWaitingTime, setShow] = useState();
  const [waitingTime, setWaitingTime] = useState();
  const [ticket_service, setTicketService] = useState();

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

      const service_queue = tickets.filter(t => t.service_code == required_service.code && t.served_by_counter == null).length;

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

      const final_result = time_required * ((service_queue / sum_k_s) + 0.5);

      setWaitingTime(final_result);
    }
  }


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
         <>
            <br></br>
            { !timeAsked && <Button variant='info' onClick={() => setTimeAsked(true)}>Waiting Time</Button> }
            {
              timeAsked && 
              <Form onSubmit={waitingTimeRequest}>
                <Form.Group>
                    <Form.Label>ticket number</Form.Label>
                    <Form.Control type='text' onChange={ev => {setTicketService(ev.target.value.substring(0,1)); setTicketNum(ev.target.value.substring(1, ev.target.value.length)); }} required={true} />
                </Form.Group>
                {!showWaitingTime && <Button className="mt-3" type='submit'>Confirm</Button>}
              </Form>
            }
            {
              showWaitingTime &&
              <>
                <FloatingLabel>{waitingTime ? "Estimated waiting time: " + waitingTime : "Ticket number not valid"}</FloatingLabel>
                <Button type='success' onClick={() => {setShow(); setTimeAsked(); setWaitingTime();}}> Ok </Button>
              </>
              
            }
         </>
         
       </div>
      </div>
    </div>
  );
}

export default App;
