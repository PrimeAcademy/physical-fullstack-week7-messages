const express = require( 'express' );
const bodyParser = require( 'body-parser' );
 
const app = express();
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
 
let messages = [];
 
const port = 5000;
app.listen( port, ()=>{
   console.log( 'server up on:', port );
}) //end server up
 
// routes
app.delete( '/messages/:index', ( req, res )=>{
   console.log( 'in /messages delete:', req.params.index );
   res.sendStatus( 200 );
}) //end delete
 
app.get( '/messages', ( req, res )=>{
   console.log( 'in /messages GET' );
   res.send( messages );
}) // end essages
 
app.post( '/messages', ( req, res )=>{
   console.log( 'in /messages POST:', req.body );
   messages.push( req.body );
   res.sendStatus( 200 );
}) // end messages POST

