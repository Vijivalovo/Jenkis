/* eslint-disable react/prop-types */
import { Flex, Button, Box } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import CardView from "./card_view";
import listAuctionSlotsById_fetch from "./fetch";
import createBit_fetch from '../createBit/fetch';
import buySlotAlready_fetch from '../buySlotAlready/fetch';
import findById_fetch from '../../auctions/findById/fetch';
import findByIdSlot_fetch from '../../slots/findById/fetch';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BitsSlots({auction_id}) {
  console.log("Выводятся слоты");
  console.log(auction_id);

  const [bits, setBits] = useState([]);
  const [auction, setAuction] = useState();
  const [slot, setSlot] = useState();
  var flag = false;
  const navigate = useNavigate();

  // if(auction == undefined)
  // {
  //   findById_fetch(setAuction, auction_id, setSlot, setBits);
  // }

  useEffect(() => {
    if (auction == undefined) {
      findById_fetch(setAuction, auction_id, setSlot, setBits);
    }
  }, []);

  useEffect(() => {
    if (auction) {
      findByIdSlot_fetch(setSlot, auction.slot_id);
    }
  }, []);
  
  useEffect(() => {
    if (slot) {
      listAuctionSlotsById_fetch(setBits, auction_id);
    }
  }, []);

  console.log("THIS IS AUCTION");
  console.log(auction);

  const View = () => {
    return (
      <>
        {bits.map((bit) => (
          <CardView
            key={bit.id}
            id={bit.id}
            lastname = {bit.lastname}
            user_id = {bit.user_id}
            bit = {bit.bit}
            timeBit = {bit.timeBit}
          />
        ))}
      </>
    );
  };

  // if(auction != undefined)
  // {
  //   if(flag == false)
  //   {
  //     findByIdSlot_fetch(setSlot, auction.slot_id,auction_id, setBits);
  //   }

  //   if(slot != undefined)
  //   {
  //     if(flag == false)
  //     {
  //       listAuctionSlotsById_fetch(setBits, auction_id);
  //       flag = true;
  //     }
  //     if(bits.length != undefined)
  //     {
  //       return (
  //         <>
  //           <Flex
  //             bg="gray.50"
  //             justify="space-between"
  //             gap={30}
  //             pl={10}
  //             pr={10}
  //             zIndex={1}
  //             width="100%"
  //           >
              
  //             <Card>
  //                 <CardBody>
  //                     <Text size="md">Категория</Text>
  //                     <Heading size="md" mb={1}>
  //                     {slot.category}
  //                     </Heading>
  //                     <Text size="md">Начальная цена</Text>
  //                     <Heading size="md" mb={1}>
  //                     {slot.minPrice}
  //                     </Heading>
  //                     <Text size="md">Цена выкупа</Text>
  //                     <Heading size="md" mb={1}>
  //                     {slot.redemtionPrice}
  //                     </Heading>
  //                     <Text size="md">Шаг ставки</Text>
  //                     <Heading size="md" mb={1}>
  //                     {slot.bidStep}
  //                     </Heading>
  //                     <Text size="md">Начало торгов</Text>
  //                     <Heading size="md" mb={1}>
  //                     {auction.startTime}
  //                     </Heading>
  //                     <Text size="md">Конец торгов</Text>
  //                     <Heading size="md" mb={1}>
  //                     {auction.endTime}
  //                     </Heading>
  //                 </CardBody>
  //             </Card>
      
  //             <Button
  //               w="full"
  //               colorScheme="teal"
  //               onClick={() => {
  //                 let bit = 1000;
  //                 let timeBit = new Date();
  //                 let user_id = bits[0].userID;
  //                 let values = {auction_id, user_id, bit, timeBit};
  //                 createBit_fetch(values);
  //                 navigate(`/bits/findBitsByAuctionId/${auction_id}`);
  //             }}
  //             >
  //                 Сделать ставку
  //             </Button>
  //             <Button
  //               w="full"
  //               colorScheme="teal"
  //               onClick={() => {
  //                 let bit = 1000;
  //                 let timeBit = new Date();
  //                 let user_id = bits[0].userID;
  //                 let values = {auction_id, user_id, bit, timeBit};
  //                 buySlotAlready_fetch(values);
  //                 navigate("/slots/listSoldSlotsById");
  //             }}
  //             >
  //               Купить слот
  //             </Button>
  //           </Flex>
  //           <Flex
  //             bg="gray.100"
  //             align="center"
  //             justify="center"
  //             flexWrap="wrap"
  //             overflow="auto"
  //             p={8}
  //           >
  //             <View />
  //           </Flex>
  //         </>
  //       );
  //     }
  //   }
  // }
  if(auction != undefined)
  {
    if(slot != undefined)
    {
      if(bits != undefined)
      {
        return (
          <>
            <Box
              bg="gray.50"
              justify="space-between"
              gap={30}
              pl={10}
              pr={10}
              zIndex={1}
              width="100%"
            >
              
              <Card w='100%' mb = {5}>
                  <CardBody>
                      <Text size="md">Категория</Text>
                      <Heading size="md" mb={1}>
                      {slot.category}
                      </Heading>
                      <Text size="md">Начальная цена</Text>
                      <Heading size="md" mb={1}>
                      {slot.minPrice}
                      </Heading>
                      <Text size="md">Цена выкупа</Text>
                      <Heading size="md" mb={1}>
                      {slot.redemtionPrice}
                      </Heading>
                      <Text size="md">Шаг ставки</Text>
                      <Heading size="md" mb={1}>
                      {slot.bidStep}
                      </Heading>
                      <Text size="md">Начало торгов</Text>
                      <Heading size="md" mb={1}>
                      {auction.startTime}
                      </Heading>
                      <Text size="md">Конец торгов</Text>
                      <Heading size="md" mb={1}>
                      {auction.endTime}
                      </Heading>
                  </CardBody>
              </Card>
      
              <Button mb = {1.5}
                w="full"
                colorScheme="teal"
                onClick={() => {
                  let bit = 1000;
                  let timeBit = new Date();
                  console.log(bits);
                  let values = {auction_id,bit, timeBit};
                  createBit_fetch(values);
                  //navigate(`/bits/findBitsByAuctionId/${auction_id}`);
                  window.location.reload();
              }}
              >
                  Сделать ставку
              </Button>
              <Button
                w="full"
                colorScheme="teal"
                onClick={() => {
                  let bit = 1000;
                  let timeBit = new Date();
                  let values = {auction_id, bit, timeBit};
                  buySlotAlready_fetch(values);
                  navigate("/slots/listSoldSlotsById");
              }}
              >
                Купить слот
              </Button>
            </Box>
            <Flex
              bg="gray.50"
              align="center"
              justify="center"
              flexWrap="wrap"
              overflow="auto"
              p={8}
            >
              <View />
            </Flex>
          </>
        );
      }
    }
  }
}
