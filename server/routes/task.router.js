const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// This receives the updated table of tasks from the database
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

// This will add new tasks to the database
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('Adding this task:', newTask);
    let queryText = `INSERT INTO "tasks" ("task", "status") VALUES ($1, $2);`;
    pool.query(queryText, [newTask.task, newTask.status])
        .then(() => {
            console.log('Successful post!');
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('There is an error in POST!', error);
            res.sendStatus(500);
        })
})

// This will permanently delete tasks from the database
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

// This allows for status of tasks to be changed
router.put('/:id', (req, res) => {
    let task = req.body;
    let id = req.params.id;
    let status = req.params.status;
    let queryText = `UPDATE "tasks" SET "status" = 'true'
                    WHERE "id"=$1;`;
    pool.query(queryText, [id])
    .then(function() {
        res.sendStatus(200);
    })
    .catch(error => {
        console.log('Error with update attempt!', error);
        res.sendStatus(500);
    });

})

module.exports = router