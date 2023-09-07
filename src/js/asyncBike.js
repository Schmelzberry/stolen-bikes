export default class AsyncBikeService {
  static async getASyncBikes(city) {
    try {
      const response = await fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${city}&distance=10&stolenness=stolen`);
      const jsonifiedReponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonifiedReponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedReponse;
    } catch (error) {
      return error;
    }
  }
}
