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
    let res = await this.request(`${id}`);
    return res.drinks[0];
  }


  static async getDrinksByIngredient(query) {
    let res;
    if (query) {
      res = await this.request(`filter.php?i=${query}`);
      // res = await axios.get(`${BASE_URL}/filter.php?i=${query}`);
    } else {
      res = await this.request(`gin`);
    }
    return res.drinks;
  }

  static async getAllJobs(query) {
    let res;
    if (query) {
      // const {name, minEmployees, maxEmployees} = query;
      res = await this.request(`jobs?title=${query.term}`);
    } else {
      res = await this.request(`jobs`);
    }
    return res.jobs;
  }

  static async signup(userData) {
    let res = await this.request(`auth/register`, userData, "post");
    return res.token;
  }

  static async login(userData) {
    let res = await this.request(`auth/token`, userData, "post");
    return res.token;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUser(userData, username) {
    // const {firstName, lastName, email, password} = userData
    let res = await this.request(`users/${username}`, userData, "patch");
    return res.user;
  }

  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.applied;
  }

}

// for now, put token ("testuser" / "password" on class)
// DrinkApi.token = localStorage.getItem("token") 

// || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default DrinkApi;