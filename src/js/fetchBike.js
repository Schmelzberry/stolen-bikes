export default class FetchBikeService {
  static fetchBikes(city) {
    return fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${city}&distance=10&stolenness=stolen`)
      .then(function (response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch(function (error) {
        return error;
      });
  }
}
