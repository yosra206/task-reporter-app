const express = require('express')
const router = express.Router
const News = require('../models/news')
const auth = require('../middleware/auth')



// post 

router.post('/news', auth, async(req, res) => {
    try {

        const news = new News(req.body)
        console.log(news)
        await news.save()
        console.log('news')
        res.status(200).send(news)
    } catch (e) {
        console.log('heree')
        res.status(400).send(e.message)
    }

})

// get


router.get('/news/:id', auth, async(req, res) => {
        try {
            const id = req.params.id
            const news = await News.findById(id)
            if (!news) {
                return res.status(404).send('No news is found')
            }
            res.status(200).send(news)
        } catch (e) {
            res.status(500).send(e.message)
        }
    })
    //patch
router.patch('/news/:id', auth, async(req, res) => {
        try {
            const _id = req.params.id
                // console.log(req.body)
            const news = await News.findByIdAndUpdate(_id, req.body, {
                new: true,
                runValidators: true
            })
            if (!news) {
                return res.status(404).send('No news is found')
            }
            res.status(200).send(news)
        } catch (e) {
            res.status(400).send(e.message)
        }
    })
    //delete
router.delete('/news/:id', auth, async(req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id)
        if (!news)
            return res.status(404).send('No news is found')
        res.status(200).send(news)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router