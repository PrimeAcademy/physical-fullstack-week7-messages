// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('server/public'));
app.use(bodyParser.json());

let messages = []; //empty array for data

const PORT = 5000;

app.listen(PORT, () => {
  console.log('server up on:', PORT);
}); 


// our routes (aka endpoints)
app.get('/messages', (req, res) => {
  console.log('in /messages GET');
  res.send(messages);
});


app.post('/messages', (req, res) => {
  console.log('in /messages POST:', req.body);
  /* req.body is an object:
   {
      user: 'kris',
      message: 'hello!'
   }
   */
  messages.push(req.body);
  res.sendStatus(201);
});


// delete is a stetch goal!
app.delete( '/messages/:index', ( req, res )=>{
   console.log( 'in /messages delete:', req.params.index );
   
   // remove this item from the messages array
   messages.splice( req.params.index, 1 );

   res.sendStatus( 200 );
}) 
