import { Box, Input } from "@chakra-ui/react";

const DateInput = ({ dateValue, setDateValue }) => {
  return (
    <Box
      boxShadow="0 0 5px #00000033"
      borderRadius="5px"
      position="relative"
      width="220px"
      background-color="#ffffff"
    >
      <Input
        fontSize="1.6rem"
        height="3.5rem"
        width="fit-content"
        padding="0 1.5rem"
        border="none"
        outline="none"
        borderRadius=" 5px"
        backgroundColor="transparent"
        color="#555555"
        type="date"
        value={dateValue}
        onChange={(e) => setDateValue(e.target.value)}
      />
    </Box>
  );
};

export default DateInput;
