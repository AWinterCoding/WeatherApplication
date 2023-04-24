const sidebar = document.querySelector("#city-select");
const cities = [
  "Atlanta",
  "Denver",
  "Seattle",
  "San Francisco",
  "Orlando",
  "New York",
  "Chicago",
  "Austin",
];

init();
function init() {
  buildSearch();
  populateSidebar(sidebar);
  populateCards();
  runGeoCodeAPI(cities[0]);
}
//this is the method that builds the eventlistener for the search button
function buildSearch() {
  search.addEventListener("click", function () {
    let search = document.querySelector("#search");
    let searchbox = document.querySelector("#searchbox");
    runGeoCodeAPI(searchbox.value);
  });
}
// this function populates the side bar
function populateSidebar(sidebar) {
  for (i = 0; i < 8; i++) {
    var button = document.createElement("input");
    sidebar.appendChild(button);
    button.type = "button";
    button.value = cities[i];
    button.style.display = "block";
    button.addEventListener("click", function () {
      runGeoCodeAPI(this.value);
    });
  }
}
//creates all of the smaller cards that will contain the 5 day forcast
function populateCards() {
  let fiveul = document.querySelector("#five-day-forcast-list");
  for (i = 0; i < 5; i++) {
    let card = document.createElement("li");
    fiveul.appendChild(card);
    card.className = "card";
    let date = document.createElement("h2");
    card.appendChild(date);
    date.innerHTML = "date";
    let icon = document.createElement("img");
    card.appendChild(icon);
    icon.innerHTML = "icon";
    for (q = 0; q < 3; q++) {
      var info = document.createElement("h3");
      card.appendChild(info);
      info.innerHTML = "info";
    }
  }
}

//This function gets the geocoordinates to properly get the weather
async function runGeoCodeAPI(city) {
  const apiToken = "cab88f39e9ecaaf152f3f6cf6b68c329";
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiToken}`;
  let result;
  result = await fetch(url);
  result.json().then((json) => {
    if (json.length == 0) {
      alert("There was an error, please retry to input");
    } else {
      getWeatherData(json);
      getFiveDayForcast(json);
    }
  });
}

//this function gets the current data along with triggering the function to get the five day forcast and populate appropately
async function getWeatherData(response) {
  let lat = response[0].lat;
  let lon = response[0].lon;
  let name = response[0].name;
  let element = document.querySelectorAll(".internal-element");
  const apiToken = "cab88f39e9ecaaf152f3f6cf6b68c329";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiToken}&units=imperial`;
  const result = await fetch(url);
  result.json().then((json) => {
    populateElement(json, element, name, 0);
  });
}

//does the same thing as the first one but gets the next five days (note this api call grabs 7 days but I am only using 5 for this)
async function getFiveDayForcast(response) {
  let lat = response[0].lat;
  let lon = response[0].lon;
  const apiToken = "cab88f39e9ecaaf152f3f6cf6b68c329";
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=imperial&appid=${apiToken}`;
  const result = await fetch(url);
  result.json().then((json) => {
    console.log(json);
    populateFiveCards(json);
  });
}

//updates the elements of the five cards for the future forecast
function populateFiveCards(response) {
  let fiveul = document.querySelectorAll(".card");
  console.log(response);
  for (i = 0; i < fiveul.length; i++) {
    let children = fiveul[i].childNodes;
    let weather = response.daily[i].weather[0].main;
    let icon = getIcon(weather);
    children[0].innerHTML = getDate(i + 1);
    children[1].src = icon;
    children[2].innerHTML =
      "Temperature: " + response.daily[i].temp.day + " °F";
    children[3].innerHTML =
      "Wind Speed: " + response.daily[i].wind_speed + " mph";
    children[4].innerHTML = "Humidity: " + response.daily[i].humidity + " %";
  }
}

//populates all the information in the main element
function populateElement(response, element, name, day) {
  let date = getDate(day);
  let icon = getIcon(response);
  let title = `${name} ${date}`;
  element[0].innerHTML = title;
  element[1].src = icon;
  element[2].innerHTML = "Temperature: " + response.main.temp + " °F";
  element[3].innerHTML = "Wind Speed: " + response.wind.speed + " mph";
  element[4].innerHTML = "Humidity: " + response.main.humidity + " %";
}
//here is a function to get the date courtesy of https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
//I also want to say that I also do understand this code and what its doing and haven't just copy pasted it in.
function getDate(num) {
  let today = new Date();
  let day = String(today.getDate() + num).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let year = today.getFullYear();
  let returnString = month + "/" + day + "/" + year;
  return returnString;
}
//icon grabber for weather
function getIcon(weather) {
  switch (weather) {
    case "Rain":
      return "/assets/images/rain.png";
    case "Clear":
      return "/assets/images/sunny.png";
    case "Clouds":
      return "/assets/images/cloudy.png";
    case "Mist":
      return "/assets/images/windycloud.png";
    case "Snow":
      return "/assets/images/snowy.png";
    default:
      return "/assets/images/rain.png";
  }
}
