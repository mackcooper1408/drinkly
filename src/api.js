import axios from "axios";

const API_KEY = "9973533";
const BASE_URL = "https://www.thecocktaildb.com/api/json/v2";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class DrinkApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${API_KEY}/${endpoint}`;

    try {
      // return (await axios({ url, method, data, params })).data;
      return (await axios({ url, method })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response;
      throw Array.isArray(message) ? message : [message];
      // alertMessage(Array.isArray(message) ? message : [message]);
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getDrink(id) {
    let res = await this.request(`lookup.php?i=${id}`);
    return res.drinks[0];
  }

  static async getIngredientList() {
    const res = await this.request(`list.php?i=list`);
    return res.drinks;
  }

  static async getDrinksByIngredient(ingredient) {
    const res = await this.request(`filter.php?i=${ingredient}`);
    return res.drinks;
  }

  static async getPopularDrinks() {
    const res = await this.request("popular.php");
    return res.drinks;
  }

  // static async getDrinksByMixer(mixer) {
  //   const res = await this.request(`filter.php?i=${mixer}`);
  //   return res.drinks;
  // }

  // static async getDrinksByIngredient(formData) {
  //   const values = Object.values(formData);
  //   console.log("VALUES", values);
  //   const res = await this.request(`filter.php?i=${values[0]}`);
  //   return res.drinks;
  // }
  
}

export default DrinkApi;