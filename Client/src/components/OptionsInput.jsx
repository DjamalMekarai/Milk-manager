import { useState } from "react";
import { MdOutlineKeyboardArrowDown as ArrowIcon } from "react-icons/md";
import OutsideAlerter from "./OutsideAlerter";
import { Box, Input } from "@chakra-ui/react";

function OptionsInput({ options, optionValue, setOptionValue }) {
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleSelectOption = (e) => {
    const content =
      e.target.textContent === "Nothing" ? "" : e.target.textContent;
    setOptionValue(content);
    setOptionsVisible(false);
  };

  return (
    <Box
      boxShadow="0 0 5px #00000033"
      borderRadius="5px"
      position="relative"
      width="fit-content"
      background-color="#ffffff"
    >
      <OutsideAlerter hideListOption={() => setOptionsVisible(false)}>
        <Box
          boxShadow="0 0 5px #00000033"
          borderRadius="10px"
          width="fit-content"
          position="relative"
          background-color="#ffffff"
          onClick={() => {
            setOptionsVisible(!optionsVisible);
          }}
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
            color="#333333"
            cursor="pointer"
            textAlign=" center"
            type="text"
            placeholder="Nothing"
            value={optionValue}
            disabled
          />
          <ArrowIcon
            className="arrow-icon"
            style={
              optionsVisible && {
                transform: "rotate(180deg)",
              }
            }
          />
        </Box>
        {optionsVisible && (
          <ul className="list-options">
            <li onClick={(e) => handleSelectOption(e)}>Nothing</li>
            {options.map((option, index) => (
              <li key={index} onClick={(e) => handleSelectOption(e)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </OutsideAlerter>
    </Box>
  );
}

export default OptionsInput;
