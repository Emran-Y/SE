const express = require('express')
const router = express.Router()
const {validate,Club} = require('../models/clubs')
const {User} = require('../models/users')

// All avalible clubs in the collge Getter or Reader

router.get('/lists',async (req,res) => {

    const clubs = await Club.find().select("name")
    res.json(clubs) 
})



// New Club Creator 

router.post('/',async (req,res) => {
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const user = await User.findById(req.body.admin)
    if(!user){
        return res.send('The user dosent exists')
    }
    
    const club = await Club.create(req.body);

    res.json(club)
    

    
})

module.exports= router