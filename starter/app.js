//Backend for our application
//This needs to be constantly running in order for the front-end to work
//To start the backend locally, run "node app.js" in the terminal
//In order to make this available "publicly", you will need to deploy it to a server
//Don't worry! It's easier than it sounds.
//If you want an easy way to deploy this, check out Heroku (https://www.heroku.com/)

//Imports
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'


//Set up Express App for use
//Line 12-13 set up the CORS policy and the request body parser (don't worry about this, it scares me too)
const app = express()
const port = 3001
app.use(cors())
app.use(express.json());

// Use JSON file for storage
//Where I got this: https://github.com/typicode/lowdb
const file = './db.json' 
const adapter = new JSONFile(file)
const db = new Low(adapter)

//Reads db.json file
//If it does not exist, it is created, and an empty jokes array is inserted.
//If it does exist, do nothing. db.data will be ready for use.
//Where I got this: https://github.com/typicode/lowdb
await db.read()
db.data ||= { jokes: [] } 
await db.write()

/*
SAVE JOKE POST REQUEST
Front-end will make a POST request to the app at this endpoint
When that happens, this code will run!
We want this section to:
  - Update the jokes array in our database
  - Respond with a successful status code (200)
*/
app.post('/save-joke', async (req, res) => {

})

/*
JOKES GET REQUEST
Front-end will make a GET request to the app at this endpoint
When that happens, this code will run!
We want this section to:
  - Make a GET request to the Jokes API and retrieve a joke 
  - Respond with a successful status code (200)
*/
app.get('/', (req, res) => {

})

//Start the app on the specified port. Any request to the app should be made to localhost:{port}
//This part is standard on almost every Express app!
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
