import {
    Flex,
    Text,
    Button,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Popover,
    PopoverTrigger,
    PopoverArrow,
    PopoverContent,
    PopoverCloseButton,
    PopoverBody,
  } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  import findById_fetch from '../../auctions/findById/fetch';
  import createAuction_fetch from '../../auctions/createAuction/fetch';
  
  export default function CardView({
    id,
    user_id,
    category,
    minPrice,
    redemtionPrice,
    saleTime,
    bidStep,
    status,
    role,
  }) {
    const navigate = useNavigate();
    if(status == "О")
    {
      return (
        <Flex
          bg="white"
          flexDirection="column"
          alignItems="center"
          rounded="md"
          mr={10}
          ml={10}
          p={6}
          mt={10}
          w="100%"
          h="100vh"
          maxWidth={340}
          maxHeight={650}
        >
          <Card
            bg="gray.100"
            p={4}
            roundedTop="md"
            mb={4}
            w="100%"
            h="100vh"
            maxHeight={550}
          >
            <CardHeader>
              <Heading size="lg">{category}</Heading>
            </CardHeader>
            <CardBody>
              <Text size="md">Начальная цена</Text>
              <Heading size="md" mb={1}>
                {minPrice}
              </Heading>
              <Text size="md">Цена выкупа</Text>
              <Heading size="md" mb={1}>
                {redemtionPrice}
              </Heading>
              <Text size="md">Время на продажу</Text>
              <Heading size="md" mb={1}>
                {saleTime}
              </Heading>
              <Text size="md">Шаг ставок</Text>
              <Heading size="md" mb={1}>
                {bidStep}
              </Heading>
              <Text size="md">Статус</Text>
              <Heading size="md" mb={1}>
                {status}
              </Heading>
              <Popover>
                
                  <Button
                    m={0}
                    p={15}
                    b={0}
                    size="md"
                    outline="none"
                    style={{marginTop: 25}}
                    colorScheme="teal"
                    onClick={() => {
                      let slot_id = id;
                      let value = {slot_id, saleTime};
                      console.log(value);
                      createAuction_fetch(value);
                      navigate("/slots/listSlotsById");
                    }}
                  >
                    Выставить на аункцион
                  </Button>
                  <Button
                    m={0}
                    p={15}
                    b={0}
                    size="md"
                    outline="none"
                    style={{marginTop: 25}}
                    colorScheme="teal"
                    onClick={console.log("мимо")}
                  >
                    Удалить
                  </Button>
                
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody p={5}>{user_id}</PopoverBody>
                </PopoverContent>
              </Popover>
            </CardBody>
          </Card>
        </Flex>
      );
    }
  }
  