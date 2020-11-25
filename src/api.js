import axios from "axios";

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

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

    const url = `${BASE_URL}/${endpoint}`;

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


  static async getDrinksByIngredient(formData) {
    let res;
    res = await this.request(`filter.php?i=${formData.alcohol}`);
    // if (formData) {
    //   // res = await axios.get(`${BASE_URL}/filter.php?i=${query}`);
    // } else {
    //   res = await this.request(`gin`);
    // }
    return res.drinks;
  }

  static async getIngredientList() {
    const res = await this.request(`list.php?i=list`);
    return res.drinks;
  }

}

export default DrinkApi;