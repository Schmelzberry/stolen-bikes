import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { Bikes, populateShowResultsDiv } from "./js/bike.js";
import FetchBikeService from "./js/fetchBike.js";
import AsyncBikeService from "./js/asyncBike";

// Business Logic
function getFetchResults(city) {
  FetchBikeService.fetchBikes(city).then(function (response) {
    if (response.bikes) {
      showBikes(response);
    } else {
      showError(response);
    }
  });
}

async function getASyncResults(city) {
  const response = await AsyncBikeService.getASyncBikes(city);
  if (response.bikes) {
    showBikes(response);
  } else {
    showError(response);
  }
}

// UI LOGIC //
function showBikes(apiResponse) {
  document.getElementById("showResults").innerText = populateShowResultsDiv(apiResponse);
}

function showError(request) {
  document.getElementById("showResults").innerText = `There is an error accessing the bike ${request.status}`;
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
//fetch api event handler function - references
function handleForm2Submission(event) {
  event.preventDefault();
  const userEnteredCityAndState = document.getElementById("cityState").value;
  document.getElementById("cityState").value = null;
  getFetchResults(userEnteredCityAndState);
}

function handleForm3Submission(event) {
  event.preventDefault();
  const userEnteredCity3 = document.getElementById("city3").value;
  document.getElementById("city3").value = null;
  getASyncResults(userEnteredCity3);
}

window.addEventListener("load", function () {
  document.getElementById("api1").addEventListener("submit", handleForm1Submission);
  document.getElementById("api2").addEventListener("submit", handleForm2Submission);
  document.getElementById("api3").addEventListener("submit", handleForm3Submission);
});
