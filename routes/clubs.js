const express = require('express')
const router = express.Router()
const {validate,Club} = require('../models/clubs')


router.get('/',async (req,res) => {

    const clubs = await Club.find().select("name")
    res.json(clubs)
})


router.post('/',async (req,res) => {
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    
    const club = await Club.create(req.body);

    res.json(club)
    

    
})

module.exports= router