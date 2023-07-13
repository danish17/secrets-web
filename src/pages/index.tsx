import Head from "next/head";
import { FiFileText } from "react-icons/fi";
import {
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Main } from "../../components/layout/Main";
import { Footer } from "../../components/layout/Footer";
import { useRouter } from "next/router";
import Logo from "../../components/layout/Logo";
import { BsArrowRight } from "react-icons/bs";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [secretUrl, setSecretUrl] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!(secretUrl && secretUrl.length === 7)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
  }, [secretUrl]);

  return (
    <>
      <Head>
        <title>Secrets - Share n-time viewable secrets</title>
        <meta name="description" content="Share n-time viewable secrets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Main>
        <Logo
          alt="Secret - Create and share n-time viewable secret messages."
          height={140}
          width={140}
        />
        <Flex flexDir="column" gap={2} alignItems="center">
          <Heading textTransform="lowercase">Secrets</Heading>
          <Text textTransform="lowercase" textAlign="center">
            Create and share n-time viewable secret messages
          </Text>
          <Spacer my={4} />
          <Button
            rightIcon={<BsArrowRight />}
            onClick={() => router.push("/create")}
          >
            create secret
          </Button>
          <Button
            as="a"
            href="https://github.com/danish17/secrets"
            rel="noopener noreferrer"
            variant="outline"
            rightIcon={<FiFileText />}
          >
            docs
          </Button>
          <HStack gap={2} w="full">
            <Divider />
            <Text fontSize="sm" color="gray.500">
              or
            </Text>
            <Divider />
            <Text></Text>
          </HStack>
          <Text fontSize="sm">enter the 7 character secret id</Text>
          <HStack>
            <Input
              variant="filled"
              onChange={(e) => {
                setSecretUrl(e.target.value);
              }}
            />
            <Button
              aria-label="View secret"
              fontSize="sm"
              isDisabled={!isValid}
              onClick={() => router.push(`/secret/${secretUrl}`)}
            >
              view
            </Button>
          </HStack>
        </Flex>
      </Main>
      <Footer />
    </>
  );
};

export default Home;
