const express = require('express')
const Admin = require('../models/admin')
const bcrypt = require('bcrypt')
const router = express.Router()




router.get('/', async (req, res) => {
    res.render('login')
})
router.get('/generate', async (req, res) => {
    const hashedPass = await bcrypt.hash('admin1234', 10)
    const admin = new Admin({
        username: "admin",
        password: hashedPass,
        data: new Map()
    })
    const newAdmin = await admin.save()
    res.send("yo")
})
router.post('/', async (req, res) => {
    //await Admin.deleteMany({})
    try {
        const admins = await Admin.find({})
        if (req.body.username == admins[0].username && await bcrypt.compare(req.body.password, admins[0].password)) {
            res.redirect('/admin/' + admins[0].id)
        } else {
            res.render("login")
        }
    } catch (error) {
        console.log(error)
        res.render("index")
    }
    
    
})

module.exports = router