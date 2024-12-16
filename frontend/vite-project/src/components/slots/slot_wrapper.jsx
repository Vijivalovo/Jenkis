import Slot from "./findSlot/main";
import { useParams } from "react-router-dom";

const SlotWrapper = () => {
  const { id } = useParams();

  return <Slot id={id} />;
};

export default SlotWrapper;
