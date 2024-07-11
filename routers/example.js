const express = require('express')
const get_example_list = require('../modules/example')
const router = express.Router()

router.get('/list', (req, res) => {
    res.send('hello, example!')
})

module.exports = router
