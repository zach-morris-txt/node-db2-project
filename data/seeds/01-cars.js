const cars = [
    {
        vin: '2FTHF25H6LCB36173',
        make: 'toyota',
        model: 'prius',
        mileage: 125000,
        title: 'clean',
        transmission: 'manual'
    },
    {
        vin: '1FMZU72X6YZC22785',
        make: 'toyota',
        model: 'corolla',
        mileage: 115000,
        title: 'used',
    },
    {
        vin: '1HGCM66554A033052',
        make: 'ford',
        model: 'camaro',
        mileage: 60000,
        title: 'clean',  
    },
]

//Exports; Exposing
exports.seed = async function (knex) {
    await knex('cars').truncate().then()
    await knex('cars').insert(cars)
}

//Alternative
// exports.seed = function(knex) {
//     return knex('cars').truncate().then(() => {
//         return knex('cars').insert(cars)
//     })
// }