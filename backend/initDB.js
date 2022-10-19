'use strict';

const dbname = "OQM.sqlite";

const sqlite = require("sqlite3");


const db = new sqlite.Database(dbname, (err) => {
  if (err) throw err;
});


//OGNI VOLTA IN CUI VOGLIO RESTETTARE IL DB LO ELIMINO E LO SCRIPT QUA SOTTO LO RIPRISTINA COME DA CONSEGA APPENA RUNNO IL SERVER
db.serialize(function () {
  db.run("PRAGMA foreign_keys = ON");
  db.run(
    'CREATE TABLE IF NOT EXISTS "Counter" (\
     "Id"	INTEGER NOT NULL UNIQUE,\
     PRIMARY KEY("Id")\
    );'
  );

  db.run(  
      'CREATE TABLE IF NOT EXISTS "Service" (\
       "Code"	TEXT NOT NULL UNIQUE,\
       "Name"	TEXT NOT NULL UNIQUE,\
       "Required_Time"	NUMERIC NOT NULL,\
        PRIMARY KEY("Code")\
    );'
  );

   db.run(
    'CREATE TABLE IF NOT EXISTS "Ticket" (\
    "Date"	TEXT NOT NULL,\
    "Service_Code"	TEXT NOT NULL,\
    "Daily_Number"	INTEGER NOT NULL,\
    "Served_By_Counter"	INTEGER,\
    FOREIGN KEY("Service_Code") REFERENCES "Service"("Code") on DELETE CASCADE,\
    FOREIGN KEY("Served_By_Counter") REFERENCES "Counter"("Id") on DELETE CASCADE,\
    PRIMARY KEY("Date","Service_Code","Daily_Number")\
    );'
   );

    db.run( 
      'CREATE TABLE IF NOT EXISTS "Served_By_Counter" (\
      "Counter_Id"	INTEGER NOT NULL,\
      "Service_Code"	TEXT NOT NULL,\
      FOREIGN KEY("Counter_Id") REFERENCES "Counter"("Id") on DELETE CASCADE,\
      FOREIGN KEY("Service_Code") REFERENCES "Service"("Code") on DELETE CASCADE,\
      PRIMARY KEY("Counter_Id","Service_Code")\
      );'
    );


    db.run(
        "INSERT OR IGNORE INTO Service(Code, Name, Required_Time)\
         VALUES ('A', 'Send parcel', 3),\
                ('B', 'Send letter', 2)"
      );
    
    db.run(
       "INSERT OR IGNORE INTO Counter(Id)\
        VALUES (1),\
              (2)"
    );

    db.run(
        "INSERT OR IGNORE INTO Served_By_Counter(Counter_Id, Service_Code)\
         VALUES (1, 'A'),\
                (1, 'B'),\
                (2, 'A')"
    );

    db.run(
      "INSERT OR IGNORE INTO Ticket(Date, Service_Code,Daily_Number,Served_By_Counter)\
       VALUES ('2022-10-17', 'A', 1, 1),\
              ('2022-10-17', 'B', 2, 1),\
              ('2022-10-17', 'A', 3, 2),\
              ('2022-10-17', 'A', 4, NULL),\
              ('2022-10-17', 'A', 5, NULL),\
              ('2022-10-17', 'B', 6, NULL),\
              ('2022-10-17', 'A', 7, NULL),\
              ('2022-10-17', 'A', 8, NULL),\
              ('2022-10-17', 'B', 9, NULL)"
  );
});