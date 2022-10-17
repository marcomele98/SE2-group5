# SE2-group5

## Frontend: 
Developed with React

## Backend:
Developed with Express (Node.js)

### installation:

- Linux and Macos

  - cd backend

  - npm install

  - npm run resetDB
  
- Windows

  - cd backend

  - npm install
  
  - node initDB


## Database:

The DB is in the .gitignore, in order to avoid conflicts merging different branches.


We have 4 tables, Service, Ticket, Counter and Served_By_Counter.

The table Service contains the informations about a service: the code, the name and the time for the service.

The table Ticket contains the information about the tickets: the date, the service code, the daily number (because the number start from 0 every day for every different service), and the id of the counter that served the ticket (null if not served). From this table we can have the queues for all the services with a query.

The table Counter contains for the moment only the id of the counter.

The table Served_By_Counter contains the information about which services are served by which counters.

To reset de DB:
- Linux and Macos:
  - npm run resetDB
- Windows:
  - node deleteDB
  - node initDB
<br/>
To change hardcoded elements in the DB modify the file "initDB.js" and then reset de DB.

### Database structure

- Table `Ticket` contains:
  - `Date`
  - `Service_Code`
  - `Daily_Number`
  - `Served_By_Counter`

<br/>

- Table `Service` contains:
  - `Code`
  - `Name`
  - `Required_Time`
  
<br/>

- Table `Counter` contains:
  - `Id`

<br/>

- Table `Served_By_Counter` contains:
  - `Counter_Id`
  - `Service_Code`


