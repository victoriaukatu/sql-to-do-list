const express = require('express');
const PORT = 5000;
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));



app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });
  