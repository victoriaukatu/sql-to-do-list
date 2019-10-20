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
    let newTask = req.body;
    console.log('Adding this task:', newTask);
    let queryText = `INSERT INTO "tasks" ("task") VALUES ($1);`;
    pool.query(queryText, [newTask.task])
        .then(() => {
            console.log('Successful post!');
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('There is an error in POST!', error);
            res.sendStatus(500);
        })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let queryText = `DELETE from "tasks" where "id"=$1;`
    pool.query(queryText, [req.params.id])
        .then(() => {
            console.log('Delete has been clicked for id', id);
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('Error with delete attempt!', error);
            res.sendStatus(500);
        })
})

router.put('/', (req, res) => {
    let queryText = `UPDATE "tasks" SET "status" = Done!
                    WHERE `

})

module.exports = router