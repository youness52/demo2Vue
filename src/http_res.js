// import axios from "axios";
// export default axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
//   headers: {
//     "Content-type": "application/json",
//     Authorization: "Bearer " +localStorage.getItem("TOKEN")
//     //Authorization: "Bearer 35|oPnPdcarKw3YsZOFGEpi4FGeoIwgjppda8cAotLJ2b60e693", //+sessionStorage.getItem("TOKEN")
//   },
// });

import axios from "axios";

const http_res = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-type": "application/json",
  },
});

http_res.interceptors.request.use(
  (config) => {
    const token = JSON.parse( localStorage.getItem("user"));
    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http_res;
