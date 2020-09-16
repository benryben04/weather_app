const express = require('express')
const path = require('path')
const { dirname } = require('path')
const hbs = require('hbs') 
const forecast = require('./utilities/forecast.js')
const geocode = require('./utilities/geocode.js')

const indexPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 8080 

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(indexPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather app',
        footer: 'some thing useful'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        footer: 'some thing useful'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Need help?',
        footer: 'some thing useful'
    })
}) 

app.get('/help/*', (req, res)=>{
    res.render('404', {
        info: 'Help page not found',
        footer: 'need more help? traverse to the help page'
    })
})

app.get('/weather', ({query}, res)=>{
    if(!query.location){
        return res.send({
            error: 'Please provide a valid search query'
        })
    }
    geocode(req.query.location, (geocodeData)=>{
        if(geocodeData.error){
            return res.send({
                error: geocodeData.error
            })
        }
        forecast(geocodeData, (forecastData)=>{
            if(forecastData.error){
                return res.send({
                    error: forecastData.error
                })
            }
            return res.send(forecastData)
        })
    })
})

app.get('/testing', (req, res)=>{
    res.render('testing')
})

app.get('*', (req, res)=>{
    res.render('404', {
        info: 'Page not found',
        footer: 'need more help? traverse to localhost:8080/help'
    })
})

app.listen(port, ()=>{
    console.log('Server is up and running!!')
})
