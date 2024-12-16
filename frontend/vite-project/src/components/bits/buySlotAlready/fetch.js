import Cookies from "universal-cookie";

const buySlotAlready_fetch = (values) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  fetch(`http://localhost:3030/bits/buySlotAlready`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
    body: JSON.stringify(values, null, 2),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
        console.log("message");
        console.log(response);
      //setSlots(response.body);
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

export default buySlotAlready_fetch;
