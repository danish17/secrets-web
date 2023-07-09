import {
  ButtonGroup,
  Container,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";

export const Footer = () => (
  <Container as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
    <Stack spacing={{ base: "4", md: "5" }} justify="center">
      <Stack justify="center" direction="row" align="center">
        <ButtonGroup variant="ghost">
          <IconButton as="a" href="#" aria-label="Website" icon={<FaLink />} />
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
          />
          <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub />} />
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
