import {
  Button,
  Center,
  Divider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import {
  MdOutlineHourglassBottom,
  MdOutlineMoreTime,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import {
  BsEye,
  BsEyeSlash,
  BsShieldFillCheck,
  BsShieldLockFill,
} from "react-icons/bs";

import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

import { IResponse, ISecretCreation } from "../../interfaces/data";

const SecretDetails = (props: { secret: ISecretCreation }) => {
  const { createdAt, expiresAt, secret, viewsLeft, id } = props.secret;

  const [secretContent, setSecretContent] = useState(secret);
  const [timeLeft, setTimeLeft] = useState([
    moment(expiresAt).diff(moment.now(), "hours"),
    moment(expiresAt).diff(moment.now(), "minutes") % 60,
  ]);
  const [viewPwd, setViewPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toast = useToast();

  useEffect(() => {
    setInterval(() => {
      if (moment(expiresAt).diff(moment.now(), "minutes") > 0) {
        setTimeLeft([
          moment(expiresAt).diff(moment.now(), "hours"),
          moment(expiresAt).diff(moment.now(), "minutes") % 60,
        ]);
      }
    }, 1000 * 60);
  }, [expiresAt]);

  const formik = useFormik({
    initialValues: {
      secretId: id,
      passphrase: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      try {
        const { data } = await axios({
          method: "post",
          url: process.env.NEXT_PUBLIC_API_BASEURL + "/secret/decrypt" ?? "",
          data: values,
        });

        if (typeof data === "object" && (data as IResponse).status === 401) {
          toast({
            title: "Incorrect passphrase.",
            description: "The passphrase you entered is not correct.",
            status: "error",
            duration: 2500,
            isClosable: true,
            position: "bottom-right",
          });
        } else {
          setIsSuccess(true);
          setSecretContent(data);
          toast({
            title: "Secret decrypted successfully.",
            status: "success",
            duration: 2500,
            isClosable: true,
            position: "bottom-right",
          });
        }
      } catch {
        setIsError(true);
        toast({
          title: "Something went occurred.",
          description: "There was an error while decrypting the secret",
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "bottom-right",
        });
      }

      setIsLoading(false);
      resetForm();
    },
  });
  return (
    <Flex flexDir="column" alignItems="center" gap={4} padding={0} w="full">
      <Textarea
        value={secretContent}
        isReadOnly
        cursor="pointer"
        onClick={() => {
          navigator?.clipboard?.writeText(secretContent);
          toast({
            title: "Secret copied.",
            status: "success",
            duration: 2500,
            isClosable: true,
            position: "bottom-right",
          });
        }}
      />
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <InputGroup>
          <Input
            id="passphrase"
            name="passphrase"
            onChange={formik.handleChange}
            value={formik.values.passphrase}
            placeholder="*_* enter passphrase to decrypt *_*"
            isRequired
            type={viewPwd ? "text" : "password"}
            autoComplete="off"
          />
          <InputRightElement>
            <IconButton
              icon={viewPwd ? <BsEyeSlash /> : <BsEye />}
              aria-label="View passphrase"
              variant="ghost"
              onClick={() => setViewPwd(!viewPwd)}
            />
          </InputRightElement>
        </InputGroup>
        <Spacer mt={8} />
        <Center>
          <Button
            rightIcon={isSuccess ? <BsShieldFillCheck /> : <BsShieldLockFill />}
            isDisabled={formik.values.passphrase.trim().length === 0}
            colorScheme={isSuccess ? "green" : "gray"}
            onClick={formik.submitForm}
            isLoading={isLoading}
          >
            {isSuccess ? "secret decrypted" : "decrypt secret"}
          </Button>
        </Center>
      </form>
      <Divider my={4} />
      <Text color="gray.300">secret details</Text>
      <Flex flexDir="column" alignItems="center">
        <Button
          width="full"
          leftIcon={<MdOutlineMoreTime />}
          variant="ghost"
          fontWeight="normal"
        >
          created {moment(createdAt).fromNow()}
        </Button>
        <Button
          width="full"
          leftIcon={<MdOutlineHourglassBottom />}
          variant="ghost"
          fontWeight="normal"
        >
          expires in {timeLeft[0]}h {timeLeft[1]}m
        </Button>
        <Button
          width="full"
          leftIcon={<MdOutlineRemoveRedEye />}
          variant="ghost"
          fontWeight="normal"
        >
          {isSuccess ? viewsLeft - 1 : viewsLeft} views left
        </Button>
      </Flex>
    </Flex>
  );
};

export default SecretDetails;
