import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { Bikes, uFunc } from './js/bike.js';

// UI LOGIC //

function showBikes(apiResponse) {
  document.getElementById("showResults").innerText = uFunc(apiResponse);
}

function showError(request) {
  document.getElementById("showResults").innerText = `There is an error accessing the bike ${request[0].status}`;
}


function handleFormSubmission(event) {
  event.preventDefault();
  const userEnteredZip = document.getElementById("zipCode").value;
  document.getElementById("zipCode").value = null;
  let promise = Bikes.getBikes(userEnteredZip);
  promise.then(function (serverResponse) {
    showBikes(serverResponse);
  }, function (errorMessage) {
    showError(errorMessage);
  });
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});

