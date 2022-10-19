import Ticket from './Actors/ticket';
import Service from './Actors/service';
import Counter from './Actors/counter';
const SERVER_URL = 'http://localhost:3001';

const getTickets = async (ticket_number) => {
    console.log("API.js");
    const response = await fetch(SERVER_URL + '/api/tickets');
    console.log(response);
    const tickets = await response.json();
    if(response.ok) {
        return tickets.map(t => new Ticket(t.date, t.service_code, t.daily_number, t.served_by_counter));
    }
    else
        throw tickets;
};

const getServices = async () => {
    const response = await fetch(SERVER_URL + '/api/services');
    const services = await response.json();
    if(response.ok) {
        return services.map(s => new Service(s.code, s.name, s.required_time));
    }
    else
        throw services;
}

const getCounters = async () => {
    const response = await fetch(SERVER_URL + '/api/counters');
    const services = await response.json();
    if(response.ok) {
        return services.map(c => new Counter(c.id, c.service_code));
    }
    else
        throw services;
}

const getNextService = async (counter_id) => {
    const response = await fetch(SERVER_URL + '/api/next_service/' + counter_id);
    const services = await response.json();
    if(response.ok) {
        return services.map(s => new Service(s.code, s.name, s.required_time));
    }
    else
        throw services;
}

const getNextTicketFromService = async (service_id) => {
    const response = await fetch(SERVER_URL + '/api/next_ticket/' + service_id );
    const tickets = await response.json();
    if(response.ok) {
        return tickets.map(t => new Ticket(t.date, t.service_code, t.daily_number, t.served_by_counter));
    }
    else
        throw tickets;
};

const updateTicket = async (ticket, counter_id) => {
    const response = await fetch(SERVER_URL + '/api/update_ticket',{
        method: 'PUT',
        body: JSON.stringify({ticket: ticket, counter_id: counter_id}),
      });
    const tickets = await response.json();
    if(response.ok) {
        resolve(null);
    }
    else
        throw tickets;
};


function updateAllCourses(courses) {
    // call: PUT /api/update-courses
    return new Promise((resolve, reject) => {
      fetch(new URL('update-courses', APIURL), {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({courses: courses}),
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((obj) => { reject(obj); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
      }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
    });
  }

const API = {getTickets, getServices, getCounters, getNextService, getNextTicketFromService, updateTicket};
export default API;