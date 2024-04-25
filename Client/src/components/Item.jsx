import { Box, Button, Text } from "@chakra-ui/react";

const Item = ({ content, updateItem, deleteItem }) => {
  return (
    <article className="item">
      <Box width="100%" display="flex">
        {content.map((element, index) => (
          <Box flex="1" key={index}>
            <Text
              color="#333333"
              fontSize="1.8rem"
              lineHeight="3.5rem"
              fontWeight="500"
            >
              {element.field}
            </Text>
            <br />
            <Text
              color="#333333"
              opacity="0.8"
              fontSize="1.8rem"
              lineHeight="3.5rem"
              fontWeight="500"
            >
              {element.value}
            </Text>
          </Box>
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="150px"
        className="item-btns"
      >
        <Button
          height="35px"
          my="12px"
          color="white"
          fontSize="14px"
          bg="#0093E9"
          boxShadow="0 3px hsl(202, 100%, 40%)"
          _hover={{ backgroundColor: "hsl(202, 100%, 40%)" }}
          borderRadius="md"
          fontWeight="600"
          onClick={updateItem}
        >
          Edit
        </Button>
        <Button
          height="35px"
          my="12px"
          color="white"
          fontSize="14px"
          bg="#80D0C7"
          boxShadow="0 3px hsl(173, 38%, 60%)"
          _hover={{ backgroundColor: "hsl(173, 38%, 51%)" }}
          borderRadius="md"
          fontWeight="600"
          onClick={deleteItem}
        >
          Delete
        </Button>
      </Box>
    </article>
  );
};

export default Item;
