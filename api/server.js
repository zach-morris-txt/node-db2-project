//Imports
const express = require("express")
const carsRouter = require('./cars/cars-router')


//Instance Of Express App
const server = express()


//Calling Middleware
server.use(express.json())


//Consuming Router
server.use('/api/cars', carsRouter)


//Catch-All
server.use('*', (req, res, next) => {
    next({
        status: 404,
        message: 'page not found'
    })
})


//Error-Handling Middleware
server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})


//Exports; Exposing
module.exports = server
