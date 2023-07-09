import Head from "next/head";
import { FiFileText } from "react-icons/fi";
import { Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { Main } from "../../components/layout/Main";
import { Footer } from "../../components/layout/Footer";
import { useRouter } from "next/router";
import Logo from "../../components/layout/Logo";
import { BsArrowRight } from "react-icons/bs";

const Home = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Secrets - Share n-time viewable secrets</title>
        <meta name="description" content="Share n-time viewable secrets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Flex direction="column" flex="1">
        <Main>
          <Flex alignItems="center" flexDir="column" gap={2}>
            <Logo
              alt="Secret - Create and share n-time viewable secret messages."
              height={140}
              width={140}
            />
            <Heading textTransform="lowercase">Secrets</Heading>
            <Text textTransform="lowercase" textAlign="center">
              Create and share n-time viewable secret messages.
            </Text>
            <Spacer my={4} />
            <Flex
              flexDir={{
                sm: "column",
                md: "row",
              }}
            />
            <Button
              rightIcon={<BsArrowRight />}
              onClick={() => router.push("/create")}
            >
              create secret
            </Button>
            <Button variant="outline" rightIcon={<FiFileText />}>
              docs
            </Button>
          </Flex>
        </Main>
        <Footer />
      </Flex>
    </>
  );
};

export default Home;
