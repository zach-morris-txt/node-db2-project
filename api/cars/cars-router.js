//Imports
const express = require('express')
const md = require('./cars-middleware')
const Car = require('./cars-model') //Object W/ Methods


//Miniature Instance Of Express Server
const router = express.Router()


//Endpoints
router.get('/', async (req, res, next) => {
    try {
        const data = await Car.getAll()
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/:id',
    md.checkCarId,
    async (req, res, next) => {
        res.json(req.car)
})

router.post('/',
    md.checkCarPayload,
    md.checkVinNumberValid,
    md.checkVinNumberUnique,
    async (req, res, next) => {
        try {
            const car = await Car.create(req.body)
            res.json(car)
        } catch (err) {
            next(err)
        }
})


//Exports; Exposing
module.exports = router;