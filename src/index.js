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
     
    } else {
      showError(apiCall, serverResponse);
    }
  });
  apiCall.open("GET", urlToSend, true);
  apiCall.send();
}

// UI LOGIC //

function showBikes(apiResponse) {
  let divToUpdate = "";
  for (let i = 0; i < apiResponse.bikes.length; i++) {
    divToUpdate += `Bike stolen are: ${apiResponse.bikes[i].manufacturer_name} ${apiResponse.bikes[i].frame_model} `;
  }
  document.getElementById("showResults").innerText = divToUpdate;
  console.log(apiResponse.status);
  console.log(apiResponse.statusText);
}

function showError(request, apiResponse) {
  document.getElementById("showResults").innerText = "There's an error.";
  // document.querySelector("p#showResults").innerText = `There is an error accessing the bike located ${request.status} ${request.statusText}: ${apiResponse.message}`;

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