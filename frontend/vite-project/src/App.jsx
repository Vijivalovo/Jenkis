import Registration from "./components/registration/main";
import MainLayout from "./components/common/main_layout";
import Slots from "./components/slots/listSlots/main";
import ListSlotsById from './components/slots/listSlotsById/main';
import ListMaxSLots from './components/slots/listMaxSlots/main';
import ListWaitSlotsById from './components/slots/listWaitSlotsById/main';
import ListAuctionSlotsById from './components/slots/listAuctionSlotsById/main';
import ListSoldSlotsById from './components/slots/listSoldSlotsById/main';
import ListAuctions from './components/auctions/listAuctions/main';
import FindBitsByAuctionId from './components/bits/findBitsByAuctionId/bits_wrapper';
import ListMax from './components/user/listMax/main';
import ListSelects from './components/slots/listSelectById/main';
import SlotsAdd from "./components/slots/createSlot/main";
import Login from './components/login/main';
import ListCategories from './components/categories/listCategories/main';
import CreateCategory from './components/categories/createCategory/main';
//import SlotWrapper from './components/slots/slot_wrapper';
import { useRoutes } from "react-router-dom";
import './App.css';

function App() {
  const routes = useRoutes([
    {
      path: "*",
      element: (
        <MainLayout>
          <Slots />
        </MainLayout>
      ),
    },
    {
      path: "/singup",
      element: (
        <MainLayout>
          <Registration />
        </MainLayout>
      ),
    },
    {
      path: "/singin",
      element: (
        <MainLayout>
          <Login />
        </MainLayout>
      ),
    },
    {
      path: "/slots/createSlot",
      element: (
        <MainLayout>
          <SlotsAdd />
        </MainLayout>
      ),
    },
    {
      path: "/slots/listSlotsById",
      element: (
        <MainLayout>
          <ListSlotsById />
        </MainLayout>
      ),
    },
    {
      path: "/slots/listMaxSlots",
      element: (
        <MainLayout>
          <ListMaxSLots />
        </MainLayout>
      ),
    },
    {
      path: "/users/listMax",
      element: (
        <MainLayout>
          <ListMax />
        </MainLayout>
      ),
    },
    {
      path: "/slots/listSelectById",
      element: (
        <MainLayout>
          <ListSelects />
        </MainLayout>
      ),
    },
    {
      path: "/slots/listWaitSlotsById",
      element: (
        <MainLayout>
          <ListWaitSlotsById />
        </MainLayout>
      ),
    },
    {
      path: "/slots/listAuctionSlotsById",
      element: (
        <MainLayout>
          <ListAuctionSlotsById />
        </MainLayout>
      ),
    },
    {
      path: "/slots/listSoldSlotsById",
      element: (
        <MainLayout>
          <ListSoldSlotsById />
        </MainLayout>
      ),
    },
    {
      path: "/bits/findBitsByAuctionId/:auction_id", 
      element: (
        <MainLayout>
          <FindBitsByAuctionId />
        </MainLayout>
      ),
    },
    {
      path: "/auctions/listAuctions",
      element: (
        <MainLayout>
          <ListAuctions />
        </MainLayout>
      ),
    },
    {
      path: "/categories/listCategories",
      element: (
        <MainLayout>
          <ListCategories />
        </MainLayout>
      ),
    },
    {
      path: "/categories/createCategory",
      element: (
        <MainLayout>
          <CreateCategory />
        </MainLayout>
      ),
    },
  ]);

  return routes;
}

export default App
