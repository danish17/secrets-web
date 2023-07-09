import { Container, Flex, FlexProps } from "@chakra-ui/react";

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
      >
        {children}
      </Container>
    </Flex>
  );
};
