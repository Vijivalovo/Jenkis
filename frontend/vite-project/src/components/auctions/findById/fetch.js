import Cookies from "universal-cookie";
import findByIdSlot_fetch from '../../slots/findById/fetch';

const findById_fetch = (setAuction, auction_id, setSlot, setBits) => {
    console.log(auction_id);
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  fetch(`http://localhost:3030/auctions/findAuction/${auction_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log("HTIS IS RESPONSE BODY AUCTION");
      console.log(response);
      setAuction(response.body);
      console.log(setSlot);
      console.log(setBits);
      if(setSlot && setBits)
      {
        findByIdSlot_fetch(setSlot, response.body.slot_id, auction_id, setBits);
      }
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
};

export default findById_fetch;
