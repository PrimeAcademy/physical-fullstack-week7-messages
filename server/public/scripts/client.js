$( document ).ready( onReady );
 
function onReady(){
   $( '#sendMessageButton' ).on( 'click', sendMessage );
   $( '#messagesOut' ).on( 'click', '.messageLine', deleteMessage );
   getMessages();
}
 
function getMessages(){
   $.ajax({
       method: 'GET',
       url: '/messages' // "route", "endpoint"
   }).then( function( response ){
      render(response)
   }).catch( function( err ){
       alert( 'Unable to get messages. Try again later.' );
       console.log( err );
   })
}

function render (messages) {
    let el = $( '#messagesOut' );
    el.empty();
    
    for( let i = 0; i < messages.length; i++){
        let thing = messages[ i ];
         el.append( 
           `<li class="messageLine" data-index="${i}">
               <i>${thing.user}</i>: ${thing.message}
           </li>` 
        );
    } // end for loop

}

function sendMessage(event){
   console.log( 'in sendMessage' );
   event.preventDefault(); // tied to the "form" element
   let objectToSend = {
       user: $( '#nameIn' ).val(),
       message: $( '#messageIn' ).val()
   } //end objectToSend

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
 

// This is a stretch goal
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
