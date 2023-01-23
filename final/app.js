//Imports
import express from 'express';
import cors from 'cors'
import { Low, JSONFile } from 'lowdb'

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
app.post('/save-joke', (req, res) => {
  db.read()
  db.data.jokes.push(req.body["joke"])
  db.write()
  res.send(req.body)
})

app.get('/', (req, res) => {
  db.read()
  res.send(db.data.jokes)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
