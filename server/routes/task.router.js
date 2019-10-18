const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "tasks"`;
    pool.query(queryText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('There is an error in GET!', error);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    
})

module.exports = router