import Cookies from "universal-cookie";

const listSelects_fetch = (setSelects) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  fetch(`http://localhost:3030/selects/listSelectsById`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
        console.log("message");
        console.log(response.body);
        setSelects(response.body);
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

export default listSelects_fetch;
