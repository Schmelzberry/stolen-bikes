import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic
function getBikes(zip) {
  let apiCall = new XMLHttpRequest();
  const urlToSend = `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${zip}&distance=10&stolenness=proximity
  `;

  console.log(urlToSend);

  apiCall.addEventListener("loadend", function() {
    const serverResponse = JSON.parse(this.responseText);
    if (this.status === 200) {
      console.log(serverResponse.bikes);
      showBikes(serverResponse);
    }
  });
  apiCall.open("GET", urlToSend, true);
  apiCall.send();
}

// UI LOGIC //

function showBikes(apiResponse) {
  document.getElementById("showResults").innerText = `The first bike stolen is ${apiResponse.bikes[0].manufacturer_name} ${apiResponse.bikes[0].frame_model}`;
}
//add output above to match miro board

function handleFormSubmission(event) {
  event.preventDefault();
  const userEnteredZip = document.getElementById("zipCode").value;
  document.getElementById("zipCode").value = null;
  getBikes(userEnteredZip);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});