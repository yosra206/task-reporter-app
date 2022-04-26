const express = require('express')
const router = express.Router
const Reporter = require('../models/reporter')
const auth = require('../middleware/auth')



router.post('/signup', auth, async(req, res) => {

    try {
        const reporter = new Reporter(req.body)
        const token = await reporter.generateToken()
        await reporter.save()
        res.status(200).send({
            reporter,
            token
        })
    } catch (e) {
        res.status(400).send(e.message)
    }

})

/////////////////////////////////////////////////////////////////////////////

// login 
router.post('/login', auth, async(req, res) => {
        try {
            const reporter = await Reporter.findByCredentials(req.body.email, req.body.password)
            const token = await reporter.generateToken()
            res.send({ reporter, token })
        } catch (e) {
            res.status(400).send(e.message)
        }
    })
    /////////////////////////////////////////////////////////////////////////////

router.get('/profile', auth, async(req, res) => {
    res.send(req.reporter)
})


///////////////////////////////////////////////////////////////////////////////



router.patch('/profile', auth, async(req, res) => {
    try {
        const updates = Object.keys(req.body)
        console.log(updates)

        updates.forEach((e) => reporter[e] = req.body[e])
        await reporter.save()

        res.status(200).send(reporter)
    } catch (e) {
        res.status(400).send(e)
    }
})

///////////////////////////////////////////////////////////////////////////////

router.delete('/logout', auth, async(req, res) => {

    try {

        req.reporter.tokens = req.reporter.tokens.filter((el) => {

            return el !== req.token
        })
        await req.reporter.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send(e)
    }
})
router.delete('/profile', auth, async(req, res) => {
    try {
        await reporter.remove({})

        res.status(200).send()

    } catch (e) {
        res.status(500).send(e)
    }
})




module.exports = router