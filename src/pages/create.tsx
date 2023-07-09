import { Flex, Heading, Spacer } from "@chakra-ui/react";
import { Footer } from "../../components/layout/Footer";
import { Main } from "../../components/layout/Main";
import Head from "next/head";
import CreationForm from "../../components/form/CreationForm";
import Image from "next/image";

const CreateSecretPage = () => {
  return (
    <>
      <Head>
        <title>Secrets - Create a secret</title>
        <meta name="description" content="Share n-time viewable secrets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Flex direction="column" flex="1" height="100vh">
        <Main>
          <Flex alignItems="center" flexDir="column" gap={2}>
            <Image src="./logo.svg" alt="" height={60} width={60} />
            <Spacer my={4} />
            <Flex
              flexDir={{
                sm: "column",
                md: "row",
              }}
            />
            <CreationForm />
          </Flex>
        </Main>
        <Footer />
      </Flex>
    </>
  );
};

export default CreateSecretPage;
