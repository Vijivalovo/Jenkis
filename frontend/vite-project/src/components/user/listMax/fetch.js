import Cookies from "universal-cookie";

const get_users_fetch = (setUsers) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  fetch(`http://localhost:3030/users/listMax`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
        setUsers(response.body);
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

export default get_users_fetch;
