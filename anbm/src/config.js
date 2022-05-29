import axios from "axios";

const local = process.env.REACT_APP_BASE_URL_LOCAL;
const heroku = process.env.REACT_APP_BASE_URL_HEROKU;
export const axiosInstance = axios.create({
  baseURL: heroku,
});
