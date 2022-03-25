const express = require('express')
const router = express.Router()
const fetch = (...args)=> import('node-fetch').then(({default:fetch}) => fetch(...args))

fetch('https://api.sampleapis.com/countries/countries')
    .then(res => res.json)
    .then(data => {
        count = data.length
    })



//all countries
//localhost_3000/countries
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/countries/countries'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/countries', {
                title: 'All countries',
                name: 'Countries list',
                data
            })
        })
})

//single-country
//localhost:3000/countries/:id
router.get('/:id', (req, res) => {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/countries/countries/${id}`

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/single-country', {
                    title: `${data.name}`,
                    name: `${data.name}`,
                    data
                })
            } else {
                res.render('pages/404', {
                    title: '404 Error - Page not found',
                    name: '404 Error'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })

})

//country by currency
//localhost:300/countries/currency
router.get('/currency/:currency', (req, res) => {
    const currency = req.params.currency
    const URL = `https://api.sampleapis.com/countries/countries/${currency}`

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < currency.length; i++) {
                if(currency == data.currency[i]) {
                    res.render('pages/countries', {
                        title: currency,
                        name: currency,
                        data
                    })
                }
            }
        })
})

module.exports = router