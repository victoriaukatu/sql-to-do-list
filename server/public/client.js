console.log ('in client.js');

$(document).ready(function(){
    console.log('Ready to go!');
    $('#addTaskButton').on('click', handleTaskSubmit);
});


function handleTaskSubmit() {
    console.log('Add task button has been clicked!');
}

// function addTask () {
//     $.ajax({
//         method: 'POST',
//         url: '/tasks/',
//         data: {
//             task:
//         }
//     })
// }