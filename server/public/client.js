console.log('in client.js');

// runs on page load and handles event listeners
$(document).ready(function () {
    console.log('Ready to go!');
    $('#addTaskButton').on('click', handleTaskSubmit);
    $('#taskList').on('click', '.deleteButton', handleTaskDelete);
    $('#taskList').on('click', '.completeButton', updateTask);
    refreshTaskList();
});

// When 'Add Task' button is clicked this function collects inputs from user and runs POST function
function handleTaskSubmit() {
    console.log('Add task button has been clicked!');
    let collectTask = {};
    collectTask.task = $('#taskInput').val();
    collectTask.status = $('#statusInput').val();
    addTask(collectTask);
    $('#taskInput').val('');
}

// Send user inputs to the database
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

// Get updated table information and refresh the browser page 
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

// Append the table information to the DOM
function appendTaskList(toDos) {
    $('#taskList').empty();
    for (i = 0; i < toDos.length; i++) {
        let tasks = toDos[i];
        if(tasks.status == true){
           color = `<tr data-id="${tasks.id}" class="green">`;
        }
        else if(tasks.status == false) {
            color = `<tr data-id="${tasks.id}">`
        }
        $('#taskList').append(`
        <tr id="${color}">
        <td>${tasks.task}</td>
        <td>${tasks.status}</td>
        <td><button data-id="${tasks.id}" class="completeButton">Complete</button></td>
        <td><button data-id="${tasks.id}" class="deleteButton">Delete</button></td>
        </tr>`);
    }
}

// Remove task when 'Delete' button is clicked
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

// Change the status of a task when 'Complete' button is clicked
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