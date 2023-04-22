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

//app token cab88f39e9ecaaf152f3f6cf6b68c329

init();
function init() {
  populateSidebar(sidebar);
  var lat = runGeoCodeAPI();
  console.log(lat);
}
// this function populates the side bar
function populateSidebar(sidebar) {
  for (i = 0; i < 8; i++) {
    var button = document.createElement("input");
    sidebar.appendChild(button);
    button.type = "button";
    button.value = cities[i];
    button.style.display = "block";
    button.style.margin = "10px";
  }
}

//This function gets the geocoordinates to properly get the weather
async function runGeoCodeAPI() {
  const apiToken = "cab88f39e9ecaaf152f3f6cf6b68c329";
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiToken}`;
  const result = await fetch(url);
  result.json().then((json) => {
    getWeatherData(json);
  });
}

//this function gets the current data along with triggering the function to get the five day forcast and populate appropately
async function getWeatherData(response) {
  let lat = response[0].lat;
  let lon = response[0].lon;
  let name = response[0].name;
  let element = document.querySelectorAll(".internal-element");
  console.log(element);
  const apiToken = "cab88f39e9ecaaf152f3f6cf6b68c329";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiToken}&units=imperial`;
  const result = await fetch(url);
  result.json().then((json) => {
    console.log(json);
    populateElement(json, element, name);
  });
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
function getFiveDayFormat(response) {}

function populateElement(response, element, name) {
  let date = getDate(0);
  let title = `${name} ${date} 😀`;
  element[0].innerHTML = title;
  element[1].innerHTML = response.main.temp + "°F";
  element[2].innerHTML = response.wind.speed + "mph";
  element[3].innerHTML = response.main.humidity;
}
