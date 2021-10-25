
const express = require('express')
const { connect } = require('mongoose')
const dotenv = require('dotenv').config()

const { job } = require('./services/scraper')

const app = express()


// PRESETS
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// DATABASE CONNECTION
connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Database Successfully')
}).catch(e => {
    console.log(e)
    process.exit(1)
})

// WEBSCRAPER
job.start()


// ROUTES
app.use(require('./routes/postRoutes'))


// START SERVER
const start = async () => {
    try {
        app.listen(process.env.PORT, process.env.HOST)
        console.log(`server started on ${process.env.HOST}:${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
}

start()
