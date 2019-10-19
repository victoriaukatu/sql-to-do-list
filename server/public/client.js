console.log ('in client.js');

$(document).ready(function(){
    console.log('Ready to go!');
    $('#addTaskButton').on('click', handleTaskSubmit);
});


function handleTaskSubmit() {
    console.log('Add task button has been clicked!');
    let collectTask = {};
    collectTask.task = $('#taskInput').val();
    addTask(collectTask);
}

function addTask (newTask) {
    $.ajax({
        method: 'POST',
        url: '/tasks/',
        data: newTask,
    })
    .then(function(response) {
        console.log('Received response from server:', response);
        // refreshTaskList();
    })
    .catch((error) => {
        console.log('Error in POST', error);
        alert('Your new task did not add correctly. Please try again.');
        res.sendStatus(500);
    });
}