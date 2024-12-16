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
  import findById_fetch from '../../user/findById/fetch';
  import createSelect_fetch from '../../selects/createSelect/fetch';
  import tokenFetch from "../../user/update_token/fetch";
  
  export default function CardView({
    user_id,
    id,
    slot_id,
    startTime,
    endTime,
  }) {
    const navigate = useNavigate();
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
        maxWidth={400}
        maxHeight={650}
      >
        <Card
          bg="gray.100"
          p={4}
          roundedTop="md"
          mb={4}
          w="100%"
          h="100vh"
          maxHeight={600}
        >
          <CardHeader>
            <Heading size="lg">{id}</Heading>
          </CardHeader>
          <CardBody>
          <Text size="md">Время начала ставок</Text>
            <Heading size="md" mb={1}>
              {startTime}
            </Heading>
            <Text size="md">Время окончания ставок</Text>
            <Heading size="md" mb={1}>
              {endTime}
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
                    console.log("THIS IS ID");
                    console.log(id);
                    let auction_id = id;
                    tokenFetch();
                    navigate(`/bits/findBitsByAuctionId/${auction_id}`);
                }}
                >
                  Показать
                </Button>
                <Button
                  m={0}
                  p={15}
                  b={0}
                  size="md"
                  outline="none"
                  style={{marginTop: 25}}
                  colorScheme="teal"
                  onClick={() => {
                    let value = {slot_id};
                    console.log(value);
                    createSelect_fetch(value);
                }}
                >
                  Добавить в избранное
                </Button>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody p={5}>{id}</PopoverBody>
              </PopoverContent>
            </Popover>
          </CardBody>
        </Card>
      </Flex>
    );
  }