let weather = {
    "apiKey": "ddd91c50fe721dfb9a08fedd8cc7a510",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
        .catch((error) => console.error("Error fetching weather:", error)); // Debugging
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        
        console.log(name, icon, description, temp, humidity, speed);
        
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"; // Fixed selector
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

// Add event listener for button click
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

// Add event listener for Enter key in input field
document.querySelector(".search-bar").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Hanoi");

