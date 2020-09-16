const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const forecastMsg = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let location = searchElement.value
    let url = `/weather?location=${location}`
    fetch(url).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                let errorEL = document.createElement('p')
                errorEL.textContent = data.error
                updateMsg(errorEL, forecastMsg, false)
            } else {
                let forecastLocation = document.createElement('p')
                forecastLocation.textContent = `${data.City}, ${data.Region}, ${data.Country}`
                let forecastDescription = document.createElement('p')
                forecastDescription.textContent = ` and here is some more data: ${JSON.stringify(data)}`
                updateMsg(forecastLocation, forecastMsg, false)
                updateMsg(forecastDescription, forecastMsg, true)
                document.querySelector('input').value = ''
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