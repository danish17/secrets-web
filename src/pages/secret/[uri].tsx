import { Button, Flex, Heading, Spacer, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IResponse, ISecretCreation } from "../../../interfaces/data";
import SecretDetails from "../../../components/section/SecretDetails";
import Head from "next/head";
import { Footer } from "../../../components/layout/Footer";
import Logo from "../../../components/layout/Logo";
import { Main } from "../../../components/layout/Main";
import SecretState from "../../../components/section/SecretState";

const SingleSecret = () => {
  const router = useRouter();

  const [secret, setSecret] = useState<ISecretCreation | IResponse | null>(
    null
  );
  const [secretState, setSecretState] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (router.query?.uri) {
        try {
          const response = await axios({
            method: "get",
            url: `${process.env.NEXT_PUBLIC_API_BASEURL}/secret/view/${router.query.uri}`,
          });

          if (!!response) {
            setSecret(response?.data as unknown as ISecretCreation | IResponse);
            setIsSuccess(true);
          }
        } catch (error) {
          setIsError(true);
          console.error(error);
        }
        setIsLoading(false);
      }
    }

    fetchData();
  }, [router.query?.uri]);

  useEffect(() => {
    if (!secret) {
      return;
    }

    console.log(secret);

    if (secret?.hasOwnProperty("status")) {
      switch ((secret as IResponse)?.status) {
        case 403:
          setSecretState("expired");
          break;
        case 404:
          setSecretState("not_found");
          break;
        case 401:
          setSecretState("not_allowed");
          break;
      }
      return;
    }

    setSecretState("success");
  }, [secret]);

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
        <Spacer my={4} />
        {isLoading && <Spinner size="lg" />}
        {isSuccess && (
          <>
            {secretState === "success" ? (
              <SecretDetails secret={secret as ISecretCreation} />
            ) : (
              <SecretState state={secretState} />
            )}
          </>
        )}
      </Main>
      <Footer />
    </>
  );
};

export default SingleSecret;
