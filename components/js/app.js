const api_key = "syStimYYnk0gSRMJoc9cmqXD897BtPnE";
let domainEntryField = "google.com";
const URL = `https://api.jsonwhois.io/?key=${api_key}&domain=${domainEntryField}`;
console.log(URL)

const searchButton = document.getElementById("searchDomain");
const domainName = document.getElementById("domainField");

searchButton.addEventListener('click', function(){
    searchDomain();
})

function searchDomain() {
    let dropdown = document.getElementById("domainList");
    let selectedValue = dropdown.options[dropdown.selectedIndex].value;
    let domainName = document.getElementById("domainField").value;

    let modalContent = document.getElementById("modalContent");

    if (selectedValue !== "") {
        modalContent.innerHTML = `${domainName}.${selectedValue}<br /> ist leider schon vergeben.`;
        domainName.value = "";
        openModal();
    if(domainName == "")
        modalContent.innerHTML = "Bitte gib einen Domainnamen an."
        openModal();
    if(domainName.length < 4)
        modalContent.innerHTML = "Deine Domain muss mindestens 4 Zeichen enthalten."
        openModal();
    } else {
        modalContent.innerHTML = "Bitte wähle eine Domain-Endung aus.";
        openModal();
    }
}

function openModal() {
    let modal = document.getElementById("modal");
    let button = document.getElementById("searchDomain");
    let rect = button.getBoundingClientRect();
    
    modal.style.top = rect.bottom + window.scrollY + "px";
    modal.style.left = rect.left + window.scrollX + "px";

    modal.style.display = "block";
}

function closeModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    const api_key = '';
    
    let weather = "";

    const KelvinToCelsius = 273.15;

    // fetching id's from HTML
    const locationIcon = document.querySelector('.weather-icon');
    const dropdown = document.getElementById('locations');
    const updateWeatherStateNow = document.getElementById('weatherStateNow');
    const updateWeatherStateDes = document.getElementById('weatherStateExact');
    const temperatureNow = document.getElementById('tempNow');
    const temperatureBetween = document.getElementById('tempBetween');
    const feels = document.getElementById('feelslike');
    const humidity = document.getElementById('humidity');
    const pressure = document.getElementById('pressure');
    const windspeed = document.getElementById('windspeed');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');

    // declare  & use from localStorage
    const storedLocation = localStorage.getItem('selectedLocation');

    if (storedLocation) {
        dropdown.value = storedLocation;
        onChangeHandler();
    } 
    else {
        dropdown.value = "munich";
        onChangeHandler();
    }

    // Dropdown listener & change content on selected part incl. lat + lon change
    dropdown.addEventListener("change", onChangeHandler);

    function onChangeHandler() {
        const dropdownSelected = dropdown.value;
        let lat, lon;

        localStorage.setItem("selectedLocation", dropdownSelected);

        if (dropdownSelected === 'munich') {
            lat = "48.1372";
            lon = "11.5761";
            fetchWeatherData(lat, lon);
        } 
        else if (dropdownSelected === 'augsburg') {
            lat = "48.366512";
            lon = "10.894446";
            fetchWeatherData(lat, lon);
        } 
        else if (dropdownSelected === 'schweiz') {
            lat = "46.8182";
            lon = "8.2275";
            fetchWeatherData(lat, lon);
        } 
        else if (dropdownSelected === 'kongo') {
            lat = "-4.322447";
            lon = "15.307045";
            fetchWeatherData(lat, lon);
        } 
        else {
            console.error("No Data could be fetched! \nCheck Lat and Lon. \nIf the Error still appears, check your API_Key");
        }
    }

    function updateWeatherDisplay() {
        if (dropdown.value === 'munich') {
            changeContent();
        } 
        if (dropdown.value === 'augsburg') {
            changeContent();
        } 
        if (dropdown.value === 'schweiz') {
            changeContent();
        } 
        if (dropdown.value === 'kongo') {
            changeContent();
        }
    }

    // regular Data fetch for key, lon, lat on Dropdown selected -> Standard = Munich
    function fetchWeatherData(lat, lon) {
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

        fetch(URL)
            .then(response => {
                return response.json();
            })
            .then(data => {
                weather = data;
                updateWeatherDisplay(); // calls which content from dropdown function
            })
            .catch(err => {
                console.error(err);
            });
    }

    function changeContent(){
        const { icon } = weather.weather[0];
        locationIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png"></img>`

        updateWeatherStateNow.innerHTML = weather.weather[0].main;
        updateWeatherStateDes.innerHTML = weather.weather[0].description;
        temperatureNow.innerHTML = Math.round(weather.main.temp - KelvinToCelsius) + "°";
        temperatureBetween.innerHTML = Math.round(weather.main.temp_min - KelvinToCelsius) + "° - " + Math.round(weather.main.temp_max - KelvinToCelsius) + "°"

        feels.innerHTML = Math.round(weather.main.feels_like - KelvinToCelsius) + "°"
        humidity.innerHTML = weather.main.humidity + "%"
        pressure.innerHTML = weather.main.pressure + " hPa"
        windspeed.innerHTML = Math.round(weather.wind.speed * 9) + " km/h" // nicht sicher ob die Rechnung stimmt (*9)
        sunrise.innerHTML = new Date(weather.sys.sunrise*1000).toTimeString().slice(0,5)
        sunset.innerHTML = new Date(weather.sys.sunset*1000).toTimeString().slice(0,5)
    }
});