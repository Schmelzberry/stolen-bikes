// Business Logic
export class Bikes {
  static getBikes(zip) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const urlToSend = `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${zip}&distance=10&stolenness=proximity`;
      request.addEventListener("loadend", function () {
        const serverResponse = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([serverResponse]);
        } else {
          reject([this]);
        }
      });
        request.open("GET", urlToSend, true);
        request.send();
    });
  }
}  

export function uFunc(apiResponse) {
  let divToUpdate = "";
  for (let i = 0; i < apiResponse[0].bikes.length; i++) {
    divToUpdate += `Stolen Bike: ${apiResponse[0].bikes[i].frame_colors} ${apiResponse[0].bikes[i].manufacturer_name} ${apiResponse[0].bikes[i].frame_model} \n`;
  }
  return divToUpdate;
}
  