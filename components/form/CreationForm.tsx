import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
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
  BsArrowRight,
  BsClipboard,
  BsEye,
  BsEyeSlash,
  BsShieldFillCheck,
} from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";

import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

import { formValidationSchema } from "../../schema/formSchema";
import { ISecretCreation } from "../../interfaces/data";

const CreationForm = () => {
  const [viewPwd, setViewPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<ISecretCreation | null>(null);

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      secret: "",
      passphrase: "",
      viewsAllowed: 1,
      validFor: 1,
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      try {
        const { data } = await axios({
          method: "post",
          url: process.env.NEXT_PUBLIC_API_BASEURL + "/secret/create" ?? "",
          data: values,
        });

        setData(data);
        setIsSuccess(true);
        toast({
          title: "Secret created successfully.",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "bottom-right",
        });
      } catch {
        setIsError(true);
        toast({
          title: "Secret creation failed.",
          description: "There was an error while creating the secret",
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
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <FormControl isInvalid={!!formik.errors?.secret}>
          <Textarea
            id="secret"
            name="secret"
            isInvalid={!!formik.errors?.secret}
            value={formik.values.secret}
            onChange={formik.handleChange}
            placeholder="write your secret message here..."
            borderRadius="md"
          />
          {!!formik.errors?.secret && (
            <FormErrorMessage>{formik.errors.secret}</FormErrorMessage>
          )}
        </FormControl>
        <Divider my={4} />
        <Flex flexDir="column" gap={4}>
          <Text textAlign="center" color="gray.500">
            privacy options
          </Text>
          <Flex flexDir="column" alignItems="center" gap={2}>
            <FormControl isInvalid={!!formik.errors?.passphrase}>
              <FormLabel textAlign="center">enter a passphrase *</FormLabel>
              <InputGroup>
                <Input
                  id="passphrase"
                  name="passphrase"
                  onChange={formik.handleChange}
                  value={formik.values.passphrase}
                  placeholder="*_* super secret *_*"
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
              {!!formik.errors?.passphrase && (
                <FormErrorMessage>{formik.errors.passphrase}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl></FormControl>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap={2}>
            <Text textAlign="center">
              how many times can this secret be viewed?
            </Text>
            <HStack>
              <IconButton
                icon={<FiMinus />}
                aria-label="Decrease views"
                isDisabled={formik.values.viewsAllowed <= 1}
                onClick={() =>
                  formik.setFieldValue(
                    "viewsAllowed",
                    formik.values.viewsAllowed - 1
                  )
                }
              />
              <Button maxW="fit-content" variant="outline">
                {formik.values.viewsAllowed}{" "}
                {formik.values.viewsAllowed === 1 ? "view" : "views"}
              </Button>
              <IconButton
                icon={<FiPlus />}
                aria-label="Increase views"
                isDisabled={formik.values.viewsAllowed >= 12}
                onClick={() =>
                  formik.setFieldValue(
                    "viewsAllowed",
                    formik.values.viewsAllowed + 1
                  )
                }
              />
            </HStack>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap={2}>
            <Text textAlign="center">
              after how many hours should the secret expire?
            </Text>
            <HStack>
              <IconButton
                icon={<FiMinus />}
                aria-label="Decrease validity"
                isDisabled={formik.values.validFor <= 1}
                onClick={() =>
                  formik.setFieldValue("validFor", formik.values.validFor - 1)
                }
              />
              <Button maxW="fit-content" variant="outline">
                {formik.values.validFor}{" "}
                {formik.values.validFor === 1 ? "hour" : "hours"}
              </Button>
              <IconButton
                icon={<FiPlus />}
                aria-label="Increase validity"
                isDisabled={formik.values.validFor >= 24}
                onClick={() =>
                  formik.setFieldValue("validFor", formik.values.validFor + 1)
                }
              />
            </HStack>
          </Flex>
        </Flex>
        <Spacer mt={8} />
        <Center>
          <Button
            isLoading={isLoading}
            colorScheme={isSuccess ? "green" : "gray"}
            onClick={formik.submitForm}
            rightIcon={isSuccess ? <BsShieldFillCheck /> : <BsArrowRight />}
          >
            {isSuccess ? "secret created" : "create secret"}
          </Button>
        </Center>
      </form>
      {isSuccess && (
        <HStack w="full">
          <Input
            value={`${window.location.origin}/secret/${data?.uri}`}
            isReadOnly
            variant="filled"
            width="full"
            cursor="pointer"
          />
          <IconButton
            aria-label="Copy Secret URL"
            icon={<BsClipboard />}
            colorScheme="blue"
            onClick={() => {
              navigator?.clipboard?.writeText(
                `${window.location.origin}/secret/${data?.uri}`
              );
              toast({
                title: "Secret link copied.",
                status: "success",
                duration: 2500,
                isClosable: true,
                position: "bottom-right",
              });
            }}
          />
        </HStack>
      )}
    </Flex>
  );
};

export default CreationForm;
