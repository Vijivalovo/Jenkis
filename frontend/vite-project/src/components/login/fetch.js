import Cookies from "universal-cookie";
import { useEffect } from "../common/main_layout";
const log_fetch = (values, navigate) => {
  const cookies = new Cookies();

  fetch("http://localhost:3030/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values, null, 2),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log("login");
      console.log(response);
      cookies.set("accessToken", response.accessToken, {
        path: "/",
      });
      cookies.set("refreshToken", response.refreshToken, {
        path: "/",
      });
      navigate("/");
    })
    .catch(function (error) {
      alert(error);
      //console.log(error);
    });
};

export default log_fetch;