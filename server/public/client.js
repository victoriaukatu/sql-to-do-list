console.log ('in client.js');

$(document).ready(function(){
    console.log('Ready to go!');
    $('#addTaskButton').on('click', handleTaskAdd);
});


// function handleTaskAdd() {
//     $.ajax({
//         method: 'POST',
//         url: ,
//         data: {
//             task:
//         }
//     })
// }