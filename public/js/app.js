const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const forecastMsg = document.querySelector('#forecast')
const submitButton = document.querySelector('button')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    submitButton.disabled = true
    let location = searchElement.value
    let forecastLocation = document.createElement('p')
    let url = `/weather?location=${location}`
    forecastLocation.textContent = 'Loading...'
    updateMsg(forecastLocation, forecastMsg, false)
    fetch(url).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                let errorEL = document.createElement('p')
                errorEL.textContent = data.error
                updateMsg(errorEL, forecastMsg, false)
                submitButton.disabled = false
            } else {
                forecastLocation.textContent = `${data.City}, ${data.Region}, ${data.Country}`
                let forecastDescription = document.createElement('p')
                forecastDescription.textContent = `It is currently ${data.Temperature}°F with ${data.Description[0].toLowerCase()}`
                updateMsg(forecastLocation, forecastMsg, false)
                updateMsg(forecastDescription, forecastMsg, true)
                document.querySelector('input').value = ''
                submitButton.disabled = false
            }
        })
    }).catch((error)=>{
        let errorMsg = document.createElement('p')
        errorMsg.textContent = error
        updateMsg(errorMsg, error, true)
    })
})

let updateMsg = (element, parentElement, noClear)=>{
    if(noClear){
        parentElement.appendChild(element)
    } else {
        parentElement.innerHTML = ''
        parentElement.appendChild(element)
    }
}