const city = document.getElementById("city");
const api = "50a72c6f2b4392ce952c2b60f9c99628";
const card = document.querySelector('.result');
const weatherForm = document.querySelector('#container');

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(city.value){
        try{
            const Weatherdata = await getWeatherinfo(city.value);
            displayWeatherinfo(Weatherdata);
        }
        catch(error){
            console.log(error);
            errorMessage(error);
        }
    }
    else
    {
        errorMessage("Please enter city name");
        card.textContent="";
    }
});

async function getWeatherinfo(city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${api}`);
    if(!response.ok)
    {
        throw new Error(`Could not find the city: ${city}`);
    }
    return response.json();
}

async function weatherEmoji(weatherIcon){
    const url = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    const image = document.createElement("img");
    image.src = url;
    image.alt = "Weather icon";
    image.classList.add("icon");
    card.appendChild(image); 
}
async function displayWeatherinfo(data) {
    console.log(data);
    console.log(data.name);//Jaipur
    console.log(data.main.temp);//in Kelvin
    console.log(data.weather[0].description);//"mist"
    console.log(data.weather[0].id);//for emoji
    console.log(data.main.humidity);//Shows humidity

    const {name:city,
           main:{temp,humidity},
           weather: [{description, icon}]} = data;

    card.textContent="";
    card.style.display="block";

    const cityDisp = document.createElement("h1");
    const tempDisp = document.createElement("p");
    const humidityDisp = document.createElement("p");
    const descDisp = document.createElement("p");
    // const weatherEmoji = document.createElement("p");

    cityDisp.textContent = city;
    cityDisp.classList.add("cityName");
    card.appendChild(cityDisp);

    tempDisp.textContent = (temp - 273.15).toFixed(1) + "°C";
    card.appendChild(tempDisp);

    humidityDisp.textContent = "Humidity: " + humidity + "%";
    card.appendChild(humidityDisp);

    descDisp.textContent = description;
    card.appendChild(descDisp);
    
    // weatherEmoji.textContent = weatherEmoji(icon);
    weatherEmoji(icon);
    

}



async function errorMessage(message){
    const error = document.createElement("p");
    error.textContent = message;
    error.classList.add("error");

    card.appendChild(error);
    card.style.display="block";

}

