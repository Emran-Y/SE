const express = require('express')
const app = express()
const mongoose = require('mongoose')
const annoucements = require('./routes/announcements')
const users = require('./routes/users')
const lostAndFound = require('./routes/lostAndFound')
const jobAndInternships = require('./routes/jobsAndInterships')
const clubs = require('./routes/clubs')

mongoose.connect('mongodb://localhost/Aau', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


app.get('/',(req,res) => {
    res.send('Hello, Man')
})

// All get requests

app.use(express.json())

app.use('/api/announcements',annoucements)
app.use('/api/users',users)
app.use('/api/clubs',clubs)
app.get('/api/my-clubs',(req,res) => {
    res.send('This is clubs')
})
app.use('/api/jobs-and-interships',jobAndInternships)
app.use('/api/lost-and-found',lostAndFound)

app.listen(3011,() => console.log('Waiting for your request '))