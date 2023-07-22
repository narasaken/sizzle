import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://sizzleapp-286ddbd1cbc9.herokuapp.com/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    credentials: "include",
  },
});
