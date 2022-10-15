"use strict"

const db = require('../Queries/service');

class Service {

    constructor() {}

    async getAllServices(){
        return await db.getAllServicesFromBD();
    }

}

module.exports = Service;