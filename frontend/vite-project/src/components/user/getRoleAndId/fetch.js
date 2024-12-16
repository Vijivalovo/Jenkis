import Cookies from "universal-cookie";

const getRoleAndId_fetch = (setRoleAndId) => {
    const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  console.log("===================accessToken=======================")
  console.log(accessToken);
  fetch(`http://localhost:3030/users/getRoleAndId`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: accessToken},
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
        console.log("===================response=======================");
        console.log(response);
        setRoleAndId(response);
    })
    .catch(function (error) {
      alert(error);
      //console.log(error);
    });
};

export default getRoleAndId_fetch;
