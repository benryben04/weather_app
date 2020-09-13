const request = require('request')

const getLongLat = (location, callBack)=>{
    const strippedLocation = location.replace(' ', '-')
    const customURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(strippedLocation)}.json?access_token=pk.eyJ1IjoiaGVudGhlY2hlbiIsImEiOiJja2VjYWhudmswNXFvMnFzNGFqd3pqY21wIn0.5_RBCZtZG_uuYq9nQWrlCg&limit=1`
    const reqObj = {
        url: customURL,
        json: true
    }
    request(reqObj, (err, res)=>{
        if(err){
            callBack({
                error: err
            })
        } else if(res.body.message){
            callBack({
                error: res.body.message
            })
        } else if(JSON.stringify(res.body).includes('400 ERROR')){
            callBack({
                error: 'Unable to connect servers at this moment'
            })
        } else if(res.body.features.length === 0){
            callBack({
                error: `Unable to find a city with the name: ${location}`
            })
        } else {
            callBack(res.body.features[0].center)
        }
    })
}

module.exports = getLongLat