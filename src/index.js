import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { Bikes, uFunc } from "./js/bike.js";
import fetchBikeService from "./js/fetchBike.js";

// UI LOGIC //

function showBikes(apiResponse) {
  document.getElementById("showResults").innerText = uFunc(apiResponse);
}

function showError(request) {
  document.getElementById("showResults").innerText = `There is an error accessing the bike ${request[0].status}`;
}

function handleForm1Submission(event) {
  event.preventDefault();
  const userEnteredZip = document.getElementById("zipCode").value;
  document.getElementById("zipCode").value = null;
  let promise = Bikes.getBikes(userEnteredZip);
  promise.then(
    function (serverResponse) {
      showBikes(serverResponse);
    },
    function (errorMessage) {
      showError(errorMessage);
    }
  );
}

function handleForm2Submission(event) {
  event.preventDefault();
  const userEnteredCityAndState = document.getElementById("cityAndState").value;
  document.getElementById("cityAndState").value = null;
  let promise = fetchBikeService.fetchBikes(userEnteredCityAndState);
}

window.addEventListener("load", function () {
  document.getElementById("api1").addEventListener("submit", handleForm1Submission);
  document.getElementById("api2").addEventListener("submit", handleForm2Submission);
});
