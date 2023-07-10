import {
  Button,
  Divider,
  Flex,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  MdKey,
  MdOutlineHourglassBottom,
  MdOutlineMoreTime,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import moment, { now } from "moment";
import { ISecretCreation } from "../../interfaces/data";
import { useEffect, useState } from "react";

const SecretDetails = (props: { secret: ISecretCreation }) => {
  const { createdAt, expiresAt, secret, viewsLeft } = props.secret;

  const [timeLeft, setTimeLeft] = useState([
    moment(expiresAt).diff(moment.now(), "hours"),
    moment(expiresAt).diff(moment.now(), "minutes") % 60,
  ]);

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

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      gap={4}
      minW={{
        sm: "full",
        md: "400px",
      }}
    >
      <Textarea value={secret} />
      <Input placeholder="enter passphrase to decrypt"></Input>
      <Button rightIcon={<MdKey />}>decrypt</Button>
      <Divider my={4} />
      <Text color="gray.300">secret details</Text>
      <VStack>
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
          {viewsLeft} views left
        </Button>
      </VStack>
    </Flex>
  );
};

export default SecretDetails;
