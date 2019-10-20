console.log('in client.js');

$(document).ready(function () {
    console.log('Ready to go!');
    $('#addTaskButton').on('click', handleTaskSubmit);
    $('#taskList').on('click', '.deleteButton', handleTaskDelete);
    $('#taskList').on('click', '.completeButton', updateTask);
    refreshTaskList();
});


function handleTaskSubmit() {
    console.log('Add task button has been clicked!');
    let collectTask = {};
    collectTask.task = $('#taskInput').val();
    addTask(collectTask);
    $('#taskInput').val('');
}

function addTask(newTask) {
    $.ajax({
        method: 'POST',
        url: '/tasks/',
        data: newTask
    })
        .then(function (response) {
            console.log('Received response from server:', response);
            refreshTaskList();
        })
        .catch((error) => {
            console.log('Error in POST', error);
            alert('Your new task did not add correctly. Please try again.');
            res.sendStatus(500);
        });
}

function refreshTaskList() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    })
        .then(function (response) {
            console.log('Received from server:', response);
            appendTaskList(response);
        })
        .catch((error) => {
            console.log('Error receiving updated task list', error);
        });
}

function appendTaskList(toDos) {
    $('#taskList').empty();
    for (i = 0; i < toDos.length; i++) {
        let tasks = toDos[i];
        $('#taskList').append(`
        <tr><td>${tasks.task}</td>
        <td>${tasks.status}</td>
        <td><button data-id="${tasks.id}" class="completeButton">Complete</button></td>
        <td><button data-id="${tasks.id}" class="deleteButton">Delete</button></td>
        </tr>`);
    }
}

function handleTaskDelete() {
    console.log($(this).data('id'));
    let taskID = $(this).data('id');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskID}`
    })
        .then(function () {
            console.log('Task has been deleted');
            refreshTaskList();
        })
        .catch((error) => {
            console.log('Error in DELETE', error);
            alert('Delete was not successful. Please try again.');
        })
}

function updateTask() {
    console.log($(this).data('id'));
    let taskID = $(this).data('id');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskID}`
    })
        .then(function () {
            refreshTaskList();
        })
        .catch((error) => {
            console.log('Error in updating task', error);
            alert('The task was not successfully updated. Please try again.');
        });
}