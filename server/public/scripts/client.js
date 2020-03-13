$( document ).ready( onReady );
 
function onReady(){
   $( '#sendMessageButton' ).on( 'click', sendMessage );
   $( '#messagesOut' ).on( 'click', '.messageLine', deleteMessage );
   getMessages();
}
 
function getMessages(){
   $.ajax({
       type: 'GET',
       url: '/messages'
   }).then( function( response ){
       let el = $( '#messagesOut' );
       el.empty();
       for( let i=0; i<response.length; i++){
           let thing = response[ i ];
           el.append( `<li class="messageLine" data-index="${i}">
                        <i>${thing.user}</i>: ${thing.message}
                       </li>`)
       } // end for
   }).catch( function( err ){
       alert( 'Unable to get messages. Try again later.' );
       console.log( err );
   })
}

function sendMessage(event){
   console.log( 'in sendMessage' );
   event.preventDefault();
   let objectToSend = {
       user: $( '#nameIn' ).val(),
       message: $( '#messageIn' ).val()
   } //end objectToSend
   $.ajax({
       type: 'POST',
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
 
function deleteMessage(){
   let index = $( this ).data( 'index' );
   $.ajax({
       type: 'DELETE',
       url: '/messages/' + index
   }).then( function( response ){
       getMessages();
   }).catch( function( err ){
       console.log( err );
       alert( 'Unable to delete at this time. Try again later.' );
   })
}
