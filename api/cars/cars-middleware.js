const Car = require('./cars-model')
const db = require('../../data/db-config')
const vin = require('vin-validator') //Assuming it's been intalled; npm 

exports.checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id)
    if(!car) {
      next({ 
        status: 404, 
        message: `car with id ${req.params.id} not found` })
    } else {
      req.car = car
      next()
    } 
  } catch (err) {
    next(err)
  }
}

exports.checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body.vin) return next({
    status: 400,
    message: 'vin is missing',
  })
  if(!req.body.make) return next({
    status: 400,
    message: 'make is missing',
  })
  if(!req.body.model) return next({
    status: 400,
    message: 'model is missing',
  })
  if(!req.body.mileage) return next({
    status: 400,
    message: 'mileage is missing',
  })
  next()
}

exports.checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  if(vin.validate(req.body.vin)) {
    next()
  } else {
    next({ 
      status: 400, 
      message: `vin ${req.body.vin} is invalid`})
  }
}

exports.checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const takenVin = await db('cars')
      .where('vin', req.body.vin.trim())
      .first()
    if( takenVin ) {
      next({ 
        status: 400, 
        message: `vin ${req.body.vin} already exists`})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}
