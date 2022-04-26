const jwt = require('jsonwebtoken')
const Reporter = require('../models/reporter')
const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const decode = jwt.verify(token, 'nodecourse')
        console.log(decode)


        const reporter = await Reporter.findOne({ _id: decode._id, tokens: token })
        console.log(reporter) // document data of user
        if (!reporter) {
            console.log('No reporter')
            throw new Error()
        }

        req.reporter = reporter
        req.token = token
        next()
    } catch (e) {
        console.log('I am here')
        res.status(401).send({ error: 'Please Authenticate' })
    }
}

module.exports = auth;