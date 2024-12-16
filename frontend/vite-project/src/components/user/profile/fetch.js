//import { verify } from "jsonwebtoken";
import Cookies from "universal-cookie";

const profile_fetch = (setUser) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  console.log(accessToken);

  fetch(`http://localhost:3030/users/findById`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log("http://localhost:3030/users/findById");
      console.log(response);
      setUser(response.body);
    })
    .catch(function (error) {
      alert(error);
      //console.log(error);
    });
};

export default profile_fetch;
