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
  import deleteSelect_fetch from '../../selects/deleteSelect/fetch';
  import tokenFetch from "../../user/update_token/fetch";
  
  export default function CardView({
    id,
    user_id,
    slot_id,
    category,
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
            <Heading size="lg">{"Избранный"}</Heading>
          </CardHeader>
          <CardBody>
          <Text size="md">Категория</Text>
            <Heading size="md" mb={1}>
              {category}
            </Heading>
            <Text size="md">Времня начала торгов</Text>
            <Heading size="md" mb={1}>
              {startTime}
            </Heading>
            <Text size="md">Время окончания торгов</Text>
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
                    tokenFetch();
                    console.log("THIS IS DELETE ID");
                    console.log(id);
                    deleteSelect_fetch(id);
                    window.location.reload();
                    }}
                >
                  Удалить
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
  