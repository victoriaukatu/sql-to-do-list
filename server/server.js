const express = require('express');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const tasksRouter = require('./routes/task.router.js');

app.use('/tasks', tasksRouter);

// send back static files
app.use(express.static('server/public'));


// listen on specified port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});
