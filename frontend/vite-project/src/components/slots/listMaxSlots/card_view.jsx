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
  
  export default function CardView({
    id,
    user_id,
    category,
    minPrice,
    redemtionPrice,
    saleTime,
    bidStep,
    status,
    saleTimes,
    soldPrice,
    raiting,
  }) {
    //const navigate = useNavigate();
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
            <Heading size="lg">{category}</Heading>
          </CardHeader>
          <CardBody>
          <Text size="md">Место в рейтинге</Text>
            <Heading size="md" mb={1}>
              {raiting}
            </Heading>
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
            <Text size="md">Время покупки</Text>
            <Heading size="md" mb={1}>
              {saleTimes}
            </Heading>
            <Text size="md">Цена покупки</Text>
            <Heading size="md" mb={1}>
              {soldPrice}
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
  