'use strict';

const fs = require('fs');

const DBPath = "./OQM.sqlite";

if(fs.existsSync(DBPath))
  fs.unlinkSync(DBPath)