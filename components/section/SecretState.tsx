import { Button, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";

type TState = {
  message: string;
  image: string;
};

type TStates = {
  [state: string]: TState;
};

const SecretState = (props: { state: string }) => {
  const { state } = props;
  const router = useRouter();

  const states: TStates = {
    expired: {
      message: "secret has expired :/",
      image: "/images/expired.svg",
    },
    not_allowed: {
      message: "seems like the passphrase is wrong :|",
      image: "/images/not_allowed.svg",
    },
    not_found: {
      message: "the secret does not seem to exist :(",
      image: "/images/not_found.svg",
    },
  };

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      gap={8}
      padding={8}
    >
      <Image alt="" src={states[state]?.image} height={60} width={60} />
      <Heading as="p" size="md">
        {states[state]?.message}
      </Heading>
      <Button
        rightIcon={<BsArrowRight />}
        onClick={() => router.push("/create")}
      >
        create secret
      </Button>
    </Flex>
  );
};

export default SecretState;
