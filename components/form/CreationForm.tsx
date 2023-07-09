import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { BsEye, BsEyeSlash, BsShieldFillCheck } from "react-icons/bs";
import { useState } from "react";
import { useFormik } from "formik";
import { FiMinus, FiPlus } from "react-icons/fi";
import { formValidationSchema } from "../../schema/formSchema";

const CreationForm = () => {
  const formik = useFormik({
    initialValues: {
      secret: "",
      passphrase: "",
      viewsAllowed: 1,
      validFor: 1,
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [viewPwd, setViewPwd] = useState(false);

  return (
    <Flex flexDir="column" alignItems="center" gap={4} padding={0} width="full">
      <form onSubmit={formik.handleSubmit}>
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
              <FormLabel textAlign="center">enter a passphrase</FormLabel>
              <InputGroup>
                <Input
                  id="passphrase"
                  name="passphrase"
                  onChange={formik.handleChange}
                  value={formik.values.passphrase}
                  isRequired
                  type={viewPwd ? "text" : "password"}
                  autoComplete="off"
                />
                <InputRightElement>
                  <IconButton
                    icon={viewPwd ? <BsEyeSlash /> : <BsEye />}
                    aria-label="View passphrase"
                    onClick={() => setViewPwd(!viewPwd)}
                  />
                </InputRightElement>
              </InputGroup>
              <FormHelperText>
                choose a strong passphrase (4-36 characters)
              </FormHelperText>
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
          <Button type="submit" rightIcon={<BsShieldFillCheck />}>
            create secret
          </Button>
        </Center>
      </form>
    </Flex>
  );
};

export default CreationForm;
