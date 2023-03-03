// client.js

$( document ).ready( onReady );

let messages = [];

function onReady(){
   $( '#sendMessageButton' ).on( 'click', sendMessage );
   $( '#messagesOut' ).on( 'click', '.messageLine', deleteMessage );
   getMessages();
}
 
function getMessages(){
   $.ajax({
       method: 'GET',
       url: '/messages' 
   }).then( function( response ){
       messages = response; // set state
       render();
   }).catch( function( err ){
       alert( 'Unable to get messages. Try again later.' );
       console.log( err );
   })
}

function render() {
  let el = $('#messagesOut');
  el.empty();
  // render messages to the DOM
  for (let i = 0; i < messages.length; i++) {
    let item = messages[i];
    el.append(`
            <li class="messageLine" data-index="${i}">
                <i>${item.user}</i>: ${item.message}
            </li>
            `
            );
  } 
}

function sendMessage(event){
   console.log( 'in sendMessage' );
   event.preventDefault(); // tied to the "form" element
   
   let objectToSend = {
       user: $( '#nameIn' ).val(),
       message: $( '#messageIn' ).val()
   };

   $.ajax({
       method: 'POST',
       url: '/messages',
       data: objectToSend
   }).then( function( response ){
       $( '#nameIn' ).val('');
       $( '#messageIn' ).val('');
       getMessages();
   }).catch( function( err ){
       alert( 'Error sending message. Try again later.' );
       console.log( err );
   }) // end AJAX
}
 
// stretch goal in Weekend Challenge
function deleteMessage(){
   let index = $( this ).data( 'index' );
   $.ajax({
       method: 'DELETE',
       url: '/messages/' + index
   }).then( function( response ){
       getMessages();
   }).catch( function( err ){
       console.log( err );
       alert( 'Unable to delete at this time. Try again later.' );
   })
}
