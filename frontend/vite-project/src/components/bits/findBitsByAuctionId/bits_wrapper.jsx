import BitsSlots from "./main";
import { useParams } from "react-router-dom";

const RoomWrapper = () => {
  const { auction_id} = useParams();
  return <BitsSlots auction_id={auction_id}/>;
};

export default RoomWrapper;
