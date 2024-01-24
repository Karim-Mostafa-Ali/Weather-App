// 7a8766e8c49e48ce87c183654242301   api key 
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const table = document.getElementById("table-data");
async function getWeather (country) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7a8766e8c49e48ce87c183654242301&q=${country}&days=3&aqi=no&alerts=no`)
    let result =await response.json();
    display(result)
}


let date = new Date()
console.log(date.toLocaleDateString("en-us",{weekday : "long"}));

function display(result) {
    let finalRes = result.forecast.forecastday
    let content = "";
    for (let i = 0; i < finalRes.length; i++) {
        let date = new Date(finalRes[i].date)
        let day = date.toLocaleDateString("en-us",{weekday : "long"})
        if (i == 0 ){
            content += ` <div class="today-forcast ">
            <div class="forcast-header d-flex justify-content-between px-3">
                <div class="day px-2"><p>${day}</p></div>
                <div class="date"><p>${date.getDate()} ${months[date.getMonth()]}</p></div>
            </div>
            <div class="forcast-content px-3">
            <h2 class="city-name">${result.location.name}</h2>
            
            <div class="degree text-white fs-1">${result.current.temp_c}
                <sup>o</sup>
                C
                <img src="https:${finalRes[i].day.condition.icon}" alt="">
            </div>
            <div class="custom">${finalRes[i].day.condition.text}</div>
            <span class="city-name pe-3">
            <img src="https://routeweather.netlify.app/images/icon-umberella.png" alt="">
            ${finalRes[i].day.daily_chance_of_rain}%
        </span>
        <span class="city-name pe-3">
            <img src="https://routeweather.netlify.app/images/icon-wind.png" alt="">
            ${result.current.wind_kph}km/h
        </span>
        <span class="city-name pe-2">
            <img src="https://routeweather.netlify.app/images/icon-compass.png" alt="">
            ${result.current.wind_dir}
        </span>
            </div>
            </div> `
        }
        else if ( i == 1) {
            content += ` <div class="today-forcast">
            <div class="text-center tomorrow-header">
                <p>${day}</p>
            </div>
            <div class="tomorrow-content text-center text-white">
                <div class="forecast-icon">
                <img src="https:${finalRes[i].day.condition.icon}" alt="">
                </div>
                <div class="degree">${finalRes[i].day.maxtemp_c}
                    <sup>o</sup>
                    C
                </div>
                <small>${finalRes[i].day.mintemp_c}
                    <sup>
                        o
                    </sup>
                </small>
                <div class="custom">${finalRes[i].day.condition.text}</div>
            </div>
        </div>
        `
        }
        else if (i == 2 ) {
            content += ` <div class="today-forcast">
            <div class="forcast-header text-center">
                <p>${day}</p>
            </div>
            <div class="forcast-content text-center text-white">
                <div class="forecast-icon">
                <img src="https:${finalRes[i].day.condition.icon}" alt="">
                </div>
                <div class="degree">${finalRes[i].day.maxtemp_c}
                    <sup>o</sup>
                    C
                </div>
                <small>${finalRes[i].day.mintemp_c}
                    <sup>
                        o
                    </sup>
                </small>
                <div class="custom">${finalRes[i].day.condition.text}</div>
            </div>
        </div>
        `
        }
    }
    table.innerHTML = content;
}

navigator.geolocation.getCurrentPosition(sucess,failed)

function sucess(position) {
    let lat = position.coords.latitude
    let long = position.coords.longitude
    let coords = `${lat},${long}`
    getWeather(coords)
}

function failed() {
    getWeather("cairo")
}

getWeather("cairo")

const form = document.querySelector("#search-form")
form.addEventListener("submit",function(e){
    e.preventDefault();
    getWeather(searchBox.value)
})


const searchBox = document.querySelector(".searchBox")
searchBox.addEventListener("keyup", function(e){
    if(e.key =="Enter")
    {
        getWeather(searchBox.value)
    }
})

searchBox.addEventListener("blur", function(){
    getWeather(searchBox.value)
})