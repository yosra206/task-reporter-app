const express = require('express')
const port = process.env.PORT || 3000

const app = express()


// connection
require('./db/mongoose')


app.use(express.json())

// routers
const reporterRouter = require('./router/reporter')
const newsRouter = require('./router/news')

app.use(reporterRouter)
app.use(newsRouter)


app.listen(port, () => { console.log('Server is running') })