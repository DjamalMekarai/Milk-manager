import OptionsInput from "./OptionsInput";
import DateInput from "./DateInput";
import TextInput from "./TextInput";
import { Box, Button, Text } from "@chakra-ui/react";

const HeaderPage = ({
  textBtn,
  fields,
  fieldsParameters,
  orderByValue,
  setOrderByValue,
  filterByField,
  setFilterByField,
  filterByValue,
  setFilterByValue,
  addItem,
}) => {
  const generateInput = (field) => {
    switch (fieldsParameters[field].type) {
      case "text":
        return (
          <TextInput
            textValue={filterByValue}
            setTextValue={setFilterByValue}
            placeholder={`enter ${field} ...`}
          />
        );
      case "date":
        return (
          <DateInput
            dateValue={filterByValue}
            setDateValue={setFilterByValue}
          />
        );
      case "options":
        return (
          <OptionsInput
            options={fieldsParameters[field].options}
            optionValue={filterByValue}
            setOptionValue={setFilterByValue}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      className="header-page"
      display="flex"
      alignItems="flex-end"
      justifyContent="space-between"
      flexWrap="wrap"
      gap="1rem"
    >
      <Box className="inputs" display="flex" alignItems="flex-end" gap="2rem">
        <Box
          className="filter-by"
          display="flex"
          alignItems="flex-end"
          gap="2rem"
        >
          <Box className="field" width="18rem" mx="50px">
            <Text
              color="#333333"
              display="inline-block"
              fontWeight="500"
              marginBottom="1rem"
            >
              Sort by
            </Text>
            <OptionsInput
              options={fields}
              optionValue={orderByValue}
              setOptionValue={setOrderByValue}
            />
          </Box>
        </Box>

        <Box
          className="filter-by"
          display="flex"
          alignItems="flex-end"
          gap="2rem"
        >
          <Box className="field" width="18rem" mx="50px">
            <Text
              display="inline-block"
              fontWeight="500"
              color="#333333"
              marginBottom="1rem"
            >
              Filter by
            </Text>

            <OptionsInput
              options={fields}
              optionValue={filterByField}
              setOptionValue={(field) => {
                setFilterByField(field);
                setFilterByValue("");
              }}
            />
          </Box>
          {filterByField ? generateInput(filterByField) : null}
        </Box>
      </Box>
      <Button
        height="35px"
        my="12px"
        color="white"
        fontSize="14px"
        width="220px"
        bg="hsl(191, 87%, 50%)"
        boxShadow="0 3px #1BB6D9"
        _hover={{ backgroundColor: "#1BB6D9" }}
        borderRadius="md"
        fontWeight="600"
        onClick={addItem}
      >
        {textBtn}
      </Button>
    </Box>
  );
};

export default HeaderPage;
