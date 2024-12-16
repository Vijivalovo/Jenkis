import Cookies from "universal-cookie";

const deleteSelect_fetch = (id) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  fetch(`http://localhost:3030/selects/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
        console.log("message");
        console.log(response);
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

export default deleteSelect_fetch;
