import { Flex, Heading, Spacer } from "@chakra-ui/react";
import { Footer } from "../../components/layout/Footer";
import { Main } from "../../components/layout/Main";
import Head from "next/head";
import CreationForm from "../../components/form/CreationForm";
import Logo from "../../components/layout/Logo";

const CreateSecretPage = () => {
  return (
    <>
      <Head>
        <title>Secrets - Create a secret</title>
        <meta name="description" content="Share n-time viewable secrets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Main>
        <Logo alt="" height={60} width={60} />
        <Spacer my={4} />
        <CreationForm />
      </Main>
      <Footer />
    </>
  );
};

export default CreateSecretPage;
