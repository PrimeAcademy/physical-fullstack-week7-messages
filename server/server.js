// server.js

const express = require('express');
const app = express();
const PORT = 5000;





app.use(express.static('server/public'));
app.use(express.json());

let messages = []; //empty array for data

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


