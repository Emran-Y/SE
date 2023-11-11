const express = require('express')
const router = express.Router()


router.get('/',(req,res) => {
    res.send('This is jobs and interships')
})


module.exports= router