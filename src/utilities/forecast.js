const request = require('request')

const getAccurateResponse = (data)=>{
    let processedData = data === "" ? 'Unable to retrieve data at this time' : data
    return processedData
}

const getWeather = (location, callBack)=>{
    const weatherURL = `http://api.weatherstack.com/current?access_key=0e8e93c7853c30404b6b4a76d5a57549&query=${location[1]},${location[0]}&units=f`
    const reqObj = {
        url: weatherURL,
        json: true
    }
    request(reqObj, (err, res)=>{
        if(err){
            callBack({
                error: err
            })
        } else if(res.body.error){
            callBack({
                error: res.body.error
            })
        } else {
            callBack({
                City: getAccurateResponse(res.body.location.name),
                Region: getAccurateResponse(res.body.location.region),
                Country: getAccurateResponse(res.body.location.country),
                ObservationTime: getAccurateResponse(res.body.current.observation_time),
                ObservationDate: getAccurateResponse(res.body.location.localtime).substring(0, 10),
                Temperature: getAccurateResponse(res.body.current.temperature),
                Description: getAccurateResponse(res.body.current.weather_descriptions)
            })
        }
    })
}

module.exports = getWeather