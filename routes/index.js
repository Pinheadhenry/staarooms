const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/', async (req, res) => {
    const admins = await Admin.find({})
    if(admins[0].data.get(req.body.studentId) == null) {
        res.render('index', { studentId: "No Id was found"})
    } else {
        res.render('index', {studentId: admins[0].data.get(req.body.studentId)})
    }
})

module.exports = router