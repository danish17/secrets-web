import {
  ButtonGroup,
  Container,
  IconButton,
  Link,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Container as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
      <Stack spacing={{ base: "4", md: "5" }} justify="center" align="center">
        <Stack justify="center" direction="row" align="center">
          <ButtonGroup variant="ghost">
            <IconButton
              as="a"
              href="https://linkedin.com/in/danishshakeel"
              aria-label="Website"
              icon={<FaLink />}
            />
            <IconButton
              as="a"
              href="https://linkedin.com/in/danishshakeel"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
            />
            <IconButton
              as="a"
              href="https://github.com/secrets"
              aria-label="GitHub"
              icon={<FaGithub />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="fg.subtle" textAlign="center">
          created with 💛 by{" "}
          <Link href="https://iamdani.sh" isExternal>
            danish shakeel
          </Link>
        </Text>
        <IconButton
          aria-label={`Toggle ${colorMode} mode`}
          icon={colorMode === "dark" ? <BsSunFill /> : <BsMoonStarsFill />}
          w="fit-content"
          onClick={() => {
            colorMode === "dark" ? setColorMode("light") : setColorMode("dark");
          }}
        />
      </Stack>
    </Container>
  );
};
