"use strict"

function Ticket (date, service_code, daily_number, served_by_counter) {
    this.date = date;
    this.service_code = service_code;
    this.daily_number = daily_number;
    this.served_by_counter = served_by_counter;
}

exports.Ticket = Ticket;