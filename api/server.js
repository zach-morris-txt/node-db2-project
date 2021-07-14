const express = require("express")
const carsRouter = require('./cars/cars-router')


const server = express()
server.use(express.json())

// DO YOUR MAGIC
server.use('/api/cars', carsRouter)
server.use('*', (req, res, next) => {
    next({
        status: 404,
        message: 'page not found'
    })
})
server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})
module.exports = server
