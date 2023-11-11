const express = require('express')
const router = express.Router()
const {validate,LostFound} = require('../models/lostAndFound')


// ALL lost and found items Getter or Reader

router.get('/',async (req,res) => {
    const lostAndFounds = await LostFound.find()
    res.json(lostAndFounds)
})

// Lost and Found items Poster

router.post('/', async (req,res) => {
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    
    const lostFound = await LostFound.create(req.body);

    res.json(lostFound)
})


module.exports= router