import {
  ButtonGroup,
  Container,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => (
  <Container as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
    <Stack spacing={{ base: "4", md: "5" }} justify="center">
      <Stack justify="center" direction="row" align="center">
        <ButtonGroup variant="tertiary">
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
          />
          <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub />} />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter />}
          />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="fg.subtle" textAlign="center">
        created with 💛 by{" "}
        <Link href="https://iamdani.sh" isExternal>
          danish shakeel
        </Link>
      </Text>
    </Stack>
  </Container>
);
