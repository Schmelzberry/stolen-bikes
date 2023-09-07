export default class fetchBikeService {
  static fetchBikes(cityAndState) {
    return fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${cityAndState}&distance=10&stolenness=proximity`)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }
      })
      .catch(function (error) {
        return error;
      });
  }
}
