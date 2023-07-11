import Head from "next/head";
import { Footer } from "../../components/layout/Footer";
import Logo from "../../components/layout/Logo";
import { Main } from "../../components/layout/Main";
import { Button, Center, Flex, Heading, Spacer } from "@chakra-ui/react";
import Icon404 from "../../components/icon/404";
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/router";

const Page404 = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Page not found - Secrets</title>
        <meta name="description" content="Share n-time viewable secrets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Main>
        <Logo
          alt="Secret - Create and share n-time viewable secret messages."
          height={140}
          width={140}
        />
      </Main>
      <Flex flexDir="column" alignItems="center" gap={4}>
        <Heading size="md" textAlign="center">
          Something&apos;s not quite right...
        </Heading>
        <Icon404 />
        <Spacer my={4} />
        <Button
          rightIcon={<BsArrowRight />}
          onClick={() => router.push("/create")}
        >
          create secret
        </Button>
      </Flex>
      <Footer />
    </>
  );
};

export default Page404;
