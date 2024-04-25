import { useState } from "react";
import { CgClose, CgMenu } from "react-icons/cg";
import logo from "../assets/images/logo.png";
import CustomNavLink from "./CustomNavLink";
import {
  Box,
  Flex,
  Image,
  Link,
  List,
  useBreakpointValue,
} from "@chakra-ui/react";

const Navbar = () => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const navElements = [
    { route: "/productions", text: "Milk Productions" },
    { route: "/births", text: "Cows Births" },
    { route: "/tests", text: "Medical Reports " },
    { route: "/", text: "Cows barn" },
  ];

  return (
    <header>
      <Box
        height="100%"
        max-width="1000px"
        margin="0 22px"
        padding="0 2rem"
        display="flex"
        flexDirection="row-reverse"
        justifyContent="space-around"
      >
        <Link
          to="/"
          onClick={() => {
            setMenuVisibility(false);
          }}
        >
          <Image
            src={logo}
            alt="logo"
            height="100%"
            padding="0.7rem 0"
            mx="20px"
          />
        </Link>

        <Flex
          height="100%"
          maxWidth="1000px"
          margin="0 220px"
          padding="0 2rem"
          display="flex"
          alignItems="center"
          className={isSmallScreen ? "menu-button flex" : "menu-button"}
        >
          {isSmallScreen && (
            <>
              {menuVisibility ? (
                <CgClose
                  onClick={() => {
                    setMenuVisibility(!menuVisibility);
                  }}
                />
              ) : (
                <CgMenu
                  onClick={() => {
                    setMenuVisibility(!menuVisibility);
                  }}
                />
              )}
            </>
          )}
        </Flex>

        <nav className={menuVisibility ? "show-menu" : "hide-menu"}>
          <List display="flex" height="100%">
            {navElements.map((element, index) => (
              <CustomNavLink
                key={index}
                route={element.route}
                text={element.text}
                setMenuVisibility={setMenuVisibility}
              />
            ))}
          </List>
        </nav>
      </Box>
    </header>
  );
};

export default Navbar;
