import { Container, Flex, FlexProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const Main = (props: FlexProps) => {
  const { children } = props;
  return (
    <Flex as="main" role="main" direction="column" flex="1" py="16" {...props}>
      <Container
        flex="1"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        as={motion.div}
        w={{ sm: "full", md: "50%", lg: "35%" }}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        {children}
      </Container>
    </Flex>
  );
};
