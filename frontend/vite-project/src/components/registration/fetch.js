import log_fetch from "../login/fetch";
import Cookies from "universal-cookie";
const reg_fetch = (values, navigate) => {
  const cookies = new Cookies();
  fetch("http://localhost:3030/users/registration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values, null, 2),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(JSON.stringify(response, null, 2));
      if (response.message == "User registered successfully") log_fetch(values);
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
      console.log(error);
    });
}

export default reg_fetch;
