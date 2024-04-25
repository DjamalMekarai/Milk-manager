import { Box } from "@chakra-ui/react";
import React, { useRef, useEffect } from "react";

function OutsideAlerter({ children, hideListOption }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        hideListOption();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, hideListOption]);

  return <Box ref={ref}>{children}</Box>;
}

export default OutsideAlerter;
