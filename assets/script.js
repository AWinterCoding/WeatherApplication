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
  populateSidebar(sidebar);
}

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
