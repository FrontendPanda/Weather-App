let cityNameInput = document.getElementById("cityNameInput")
let submitButton = document.getElementById("formSubmitButton")
let cityNameDisplay = document.getElementById("cityName")
let weatherTypeImg = document.getElementById("weatherTypeImg")
let weatherTypeDisplay = document.getElementById("weatherType")
let currentTempDisplay = document.getElementById("curTemp")
let maxTempDisplay = document.getElementById("maxTemp")
let minTempDisplay = document.getElementById("minTemp")
let celsiusRadio = document.getElementById("celsiusRadio")
let farenhitRadio = document.getElementById("farenheitRadio")
let increaseButton = document.getElementById("increase")
let decreaseButton = document.getElementById("decrease")
let dayDisplay = document.getElementById("day")

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "e6356a89e8msh153f1a088cfdcc7p1edd33jsn93e1f7b1dab7",
        "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
    },
}

let count = 0
let cityData
let days = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
}

increaseButton.addEventListener("click", async () => {
    if (count <= 5) {
        count++
        console.log(count)
    }
    displayData(cityData, count)
})

decreaseButton.addEventListener("click", () => {
    if (count > 0) {
        count--
        console.log(count)
    }
    displayData(cityData, count)
})

submitButton.addEventListener("click", async () => {
    let url = getUrl()
    // console.log(cityName)
    console.log(url)
    cityData = await getData(url)
    displayData(cityData)
})

const getUrl = () => {
    let cityName = cityNameInput.value
    let url = ""
    if (celsiusRadio.checked) {
        url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${cityName}&format=json&u=c`
    } else if (farenhitRadio.checked) {
        url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${cityName}&format=json&u=f`
    } else {
        url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${cityName}&format=json&u=c`
    }

    return url
}

const getData = async (url) => {
    let cityDataJson = await fetch(url, options)
    let cityData = await cityDataJson.json()
    console.log(cityData)
    return cityData
}

const displayData = (cityData, index = 0) => {
    let cityName = cityData.location.city
    let weatherType = cityData.current_observation.condition.text
    let currentTemp = cityData.current_observation.condition.temperature
    let maxTemp = cityData.forecasts[index].high
    let minTemp = cityData.forecasts[index].low
    let day = days[`${cityData.forecasts[index].day}`]
    dayDisplay.innerText = day
    weatherTypeDisplay.innerText = `${weatherType}`
    cityNameDisplay.innerText = cityName

    if (weatherType.toLowerCase().includes("sunny")) {
        weatherTypeImg.src = "/images/sunny.png"
    } else if (weatherType.toLowerCase().includes("cloudy")) {
        weatherTypeImg.src = "/images/clouds.png"
    } else if (weatherType.toLowerCase() == "clear") {
        weatherTypeImg.src = "/images/clear-sky.png"
    } else if (weatherType.toLowerCase().includes("rainy")) {
        weatherTypeImg.src = "/images/rainy.png"
    }

    if (farenhitRadio.checked) {
        minTempDisplay.innerText = `Min Temp: ${minTemp} °F`
        maxTempDisplay.innerText = `Max Temp: ${maxTemp} °F`
        currentTempDisplay.innerText = `Current Temp: ${currentTemp} °F`
    } else if (celsiusRadio.checked) {
        minTempDisplay.innerText = `Min Temp: ${minTemp} °C`
        maxTempDisplay.innerText = `Max Temp: ${maxTemp} °C`
        currentTempDisplay.innerText = `Current Temp: ${currentTemp} °C`
    } else {
        minTempDisplay.innerText = `Min Temp: ${minTemp} °C`
        maxTempDisplay.innerText = `Max Temp: ${maxTemp} °C`
        currentTempDisplay.innerText = `Current Temp: ${currentTemp} °C`
    }

    console.log(cityName, weatherType, currentTemp, maxTemp, minTemp)
}
