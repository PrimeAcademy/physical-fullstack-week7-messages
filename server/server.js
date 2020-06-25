const express = require('express');//sets express to require both express &&
const bodyParser = require('body-parser');//body parser

const app = express();//app is the function express
app.use(express.static('server/public'));//serve up files with express
app.use(bodyParser.urlencoded({ extended: true }));//app express uses bodyParser to 

let messages = [];//emptyArray

const port = 5000;//sets port
app.listen(port, () => {//
   console.log('server up on:', port);
}) //end server up

// routes
app.delete('/messages/:index', (req, res) => {
   debugger;
   console.log('in /messages delete:', req.params.index);
   debugger;
   res.sendStatus(200);
}) //end delete

app.get('/messages', (req, res) => {
   debugger;
   console.log('in /messages GET');
   debugger;
   res.send(messages);
}) // end messages

app.post('/messages', (req, res) => {
   debugger;
   console.log('in /messages POST:', req.body);
   /* req.body is:
   {
      user: 'kris',
      message: 'hello!'
   }
   */
   messages.push(req.body);
   debugger;
   res.sendStatus(200);
}) // end messages POST

