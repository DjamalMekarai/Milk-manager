import OptionsInput from "./OptionsInput";
import DateInput from "./DateInput";
import TextInput from "./TextInput";
import { Box, Button, useDisclosure } from "@chakra-ui/react";

const AddUpdateForm = ({
  title,
  parameters,
  cancelTheOperation,
  doTheOperation,
  update,
}) => {
  const generateInput = (parameter) => {
    switch (parameter.type) {
      case "text":
        return (
          <TextInput
            textValue={parameter.value}
            setTextValue={parameter.setter}
            placeholder={`enter ${parameter.field} ...`}
          />
        );
      case "date":
        return (
          <DateInput
            dateValue={parameter.value}
            setDateValue={parameter.setter}
          />
        );
      case "options":
        return (
          <OptionsInput
            options={parameter.options}
            optionValue={parameter.value}
            setOptionValue={parameter.setter}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="add-update-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          doTheOperation();
        }}
      >
        <h2>{title}</h2>

        <Box display="flex" flexDirection="column" gap="2rem" margin="3rem 0">
          {parameters.map((parameter, index) => (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
              color="#333333"
              key={index}
            >
              <label>{parameter.field}</label>
              {generateInput(parameter)}
            </Box>
          ))}
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          flexDirection="row"
          paddingTop="3px"
          mx="20px"
        >
          <Button
            height="35px"
            my="12px"
            mx="12px"
            color="white"
            width="180px"
            fontSize="14px"
            bg="#0093E9"
            boxShadow="0 3px hsl(202, 100%, 40%)"
            _hover={{ backgroundColor: "hsl(202, 100%, 40%)" }}
            borderRadius="md"
            fontWeight="600"
            type="submit"
          >
            {update ? "edit" : "add"}
          </Button>
          <Button
            height="35px"
            my="12px"
            width="180px"
            color="white"
            mx="12px"
            fontSize="14px"
            bg="#80D0C7"
            boxShadow="0 3px hsl(173, 38%, 60%)"
            _hover={{ backgroundColor: "hsl(173, 38%, 51%)" }}
            borderRadius="md"
            fontWeight="600"
            onClick={cancelTheOperation}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </section>
  );
};

export default AddUpdateForm;
