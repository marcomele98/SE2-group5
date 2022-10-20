"use strict"

const db = require('../Queries/ticket');
const dayjs = require('dayjs');

class Ticket {

    constructor() { }

    async NewTicket(req, res) {
        var now = dayjs();
        var Date = now.format("YYYY-MM-DD");
        if (req.body.Service_Code == null) {
            return res.status(422).end();
        }
        const data = { "Date": Date, "Service_Code": req.body.Service_Code }
        const max = await db.getLastNumberTicketForService(data);
        const MaxNum = max.TicketNumber;
        var newNum;
        if (MaxNum === null) {
            newNum = 1;
        } else {
            newNum = MaxNum + 1;
        }
        try {
            const data = { "Date": Date, "Service_Code": req.body.Service_Code, "Daily_Number": newNum }
            await db.createNewTicket(data);
            const ticket = req.body.Service_Code+newNum;
            res.status(201).json(ticket);
        }
        catch (err) {
            return res.status(503).end();
        }
    }
}

module.exports = Ticket;
