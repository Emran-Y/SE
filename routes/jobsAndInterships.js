const express = require('express')
const router = express.Router()
const {validate,JobAndInternship} = require('../models/jobsAndInterships')


// All jobs and internships getter or Reader

router.get('/',async (req,res) => {
    const jobAndInternships = await JobAndInternship.find()
    res.json(jobAndInternships)
})


// jobs and internships poster

router.post('/', async (req,res) => {
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    
    const jobAndInternship = await JobAndInternship.create(req.body);

    res.json(jobAndInternship)
})


module.exports= router