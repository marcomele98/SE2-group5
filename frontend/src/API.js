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

const API = {getTickets, getServices, getCounters};
export default API;