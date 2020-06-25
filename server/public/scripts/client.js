$(document).ready(onReady);

function onReady() {
    debugger;
    $('#sendMessageButton').on('click', sendMessage);
    $('#messagesOut').on('click', '.messageLine', deleteMessage);
    debugger;
    getMessages();
}

function getMessages() {
    debugger;
    $.ajax({
        type: 'GET',
        url: '/messages' // "route", "endpoint"
    }).then(function (response) {
        debugger;
        let el = $('#messagesOut');
        el.empty();
        debugger;
        for (let i = 0; i < response.length; i++) {
            debugger;

            let thing = response[i];
            el.append(`<li class="messageLine" data-index="${i}">
                        <i>${thing.user}</i>: ${thing.message}
                       </li>`);
            debugger;

        } // end for
    }).catch(function (err) {
        debugger;

        alert('Unable to get messages. Try again later.');
        console.log(err);
    })
}

function sendMessage(event) {
    debugger;

    console.log('in sendMessage');
    event.preventDefault(); // tied to the "form" element
    let objectToSend = {
        user: $('#nameIn').val(),
        message: $('#messageIn').val()
    } //end objectToSend
    debugger;

    $.ajax({
        type: 'POST',
        url: '/messages',
        data: objectToSend
    }).then(function (response) {
        debugger;

        $('#nameIn').val('');
        $('#messageIn').val('');
        debugger;

        getMessages();
    }).catch(function (err) {
        alert('Error sending message. Try again later.');
        console.log(err);
    }) // end AJAX
}

function deleteMessage() {
    debugger;

    let index = $(this).data('index');
    $.ajax({
        type: 'DELETE',
        url: '/messages/' + index
    }).then(function (response) {
        debugger;

        getMessages();
    }).catch(function (err) {
        console.log(err);
        alert('Unable to delete at this time. Try again later.');
    })
}
