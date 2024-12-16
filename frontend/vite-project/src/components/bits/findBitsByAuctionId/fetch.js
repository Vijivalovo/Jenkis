import Cookies from "universal-cookie";

const listAuctionSlotsById_fetch = (setBits, auction_id) => {
    console.log(auction_id);
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  fetch(`http://localhost:3030/bits/findBitsByAuctionId/${auction_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
        console.log("THIS IS RESPONSE FRO BITS");
        console.log(response);
        setBits(response.body);

    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

export default listAuctionSlotsById_fetch;
