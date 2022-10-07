const express = require('express')
const Admin = require('../models/admin')
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/:id', (req, res) => {
    res.render('admin', {id: req.params.id})
})
router.post('/:id', async (req, res) => {
    console.log("ran")
    try {
        const admins = await Admin.findById(req.params.id)
        admins.data = new Map();
        str = req.body.data.replace("\r", "")
        const rows = str.split("\n").map(row => row.trim());
        rows.map(row => {
            admins.data.set(row.split(",")[0], row.split(",")[1])
        })
        admins.save()
        console.log(admins)
    } catch (error) {
        console.log(error)
    }
})
router.post('/:id/delete', async (req, res) => {
    const admin = await Admin.findById(req.params.id)
    admin.data = []
    admin.save()
    res.send({
        msg: 'deleted'
    })
})
router.get('/:id/getdata', async (req, res) => {
    const admins = await Admin.findById(req.params.id)
    res.send({
        data: admins.data
    })
})
router.post('/:id/update', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id)
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        admin.username = req.body.username
        admin.password = hashedPass
        admin.save()
        res.redirect('/admin/' + req.params.id)
    } catch (error) {
        console.log(error)
    }  
})

module.exports = router