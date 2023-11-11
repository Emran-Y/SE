const express = require('express')
const router = express.Router()
const {validate,User} = require('../models/users')
// const _ = require('lodash')


router.get('/', async (req,res) => {
    const users  = await User.find().populate('clubMemberships').populate('clubAdmin')
    res.json(users)
})

router.post('/',async (req,res) => {
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    if(await User.findOne({email:req.body.email})) return res.status(400).send('This user has been registered')
    
    const user = await User.create(req.body);

    res.json(user)
    

    
})




module.exports= router