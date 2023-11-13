// client.js


let messages = [];
getMessages();

function getMessages() {
    axios({
        method: 'GET',
        url: '/messages'
    }).then(function (response) {
        messages = response.data; // set state
        render();
    }).catch(function (err) {
        alert('Unable to get messages. Try again later.');
        console.log(err);
    })
}

function render() {
    let el = document.getElementById('messagesOut');
    el.innerHTML = '';
    // render messages to the DOM
    for (let i = 0; i < messages.length; i++) {
        let item = messages[i];
        el.innerHTML += (`
            <li class="messageLine" data-index="${i}" onclick=(deleteMessage(event))>
                <b>${item.user}</b>:
                <div>"${item.message}"</div>
            </li>
            `
        );
    }
}

function sendMessage(event) {
    console.log('in sendMessage');
    event.preventDefault(); // tied to the "form" element

    let objectToSend = {
        user: document.getElementById('nameIn').value,
        message: document.getElementById('messageIn').value
    };

    axios({
        method: 'POST',
        url: '/messages',
        data: objectToSend
    }).then(function (response) {
        document.getElementById('nameIn').value = ''
        document.getElementById('messageIn').value = ''
        getMessages();
    }).catch(function (err) {
        alert('Error sending message. Try again later.');
        console.log(err);
    }) // end AJAX
}

// stretch goal in Weekend Challenge
function deleteMessage(event) {
    event.preventDefault();
    let index = event.target.dataset.index;
    axios({
        method: 'DELETE',
        url: '/messages/' + index
    }).then(function (response) {
        getMessages();
    }).catch(function (err) {
        console.log(err);
        alert('Unable to delete at this time. Try again later.');
    })
}
