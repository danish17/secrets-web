import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { BsEye, BsEyeSlash, BsShieldFillCheck } from "react-icons/bs";
import { ChangeEvent, useState } from "react";

const CreationForm = () => {
  let [secret, setSecret] = useState("");
  let [maxViews, setMaxViews] = useState(1);
  let [validFor, setValidFor] = useState(1);
  const [viewPwd, setViewPwd] = useState(false);

  let handleInputChange = (event: ChangeEvent) => {
    let inputValue = (event.target as HTMLInputElement)?.value;
    setSecret(inputValue);
  };

  return (
    <Flex flexDir="column" alignItems="center" gap={4} padding={0} width="full">
      <Textarea
        value={secret}
        onChange={handleInputChange}
        placeholder="write your secret message here..."
        borderRadius="md"
      />
      <Divider />
      <Flex flexDir="column" gap={4}>
        <Text textAlign="center" color="gray.500">
          privacy options
        </Text>
        <Flex flexDir="column" alignItems="center" gap={2}>
          <Text textAlign="center">enter a passphrase</Text>
          <InputGroup>
            <Input
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
        </Flex>
        <Flex flexDir="column" alignItems="center" gap={2}>
          <Text textAlign="center">
            how many times can this secret be viewed?
          </Text>
          <Button maxW="fit-content" variant="outline">
            {maxViews} {maxViews === 1 ? "time" : "times"}
          </Button>
          <Slider
            defaultValue={maxViews}
            min={1}
            max={12}
            step={1}
            onChange={(val) => setMaxViews(val)}
          >
            <SliderTrack bg="gray.300">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="blue.300" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </Flex>
        <Flex flexDir="column" alignItems="center" gap={2}>
          <Text textAlign="center">
            after how many hours should the secret expire?
          </Text>
          <Button maxW="fit-content" variant="outline">
            {validFor} {validFor === 1 ? "hour" : "hours"}
          </Button>
          <Slider
            defaultValue={maxViews}
            min={1}
            max={24}
            step={1}
            onChange={(val) => setValidFor(val)}
          >
            <SliderTrack bg="gray.300">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="blue.300" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </Flex>
      </Flex>
      <Spacer mt={4} />
      <Button maxW="fit-content" rightIcon={<BsShieldFillCheck />}>
        create secret
      </Button>
    </Flex>
  );
};

export default CreationForm;
