import { useColorMode } from "@chakra-ui/react";
import Image, { ImageProps } from "next/image";

const Logo = (props: Omit<ImageProps, "src">) => {
  const { colorMode } = useColorMode();
  const { alt, ...rest } = props;
  return (
    <Image
      src={colorMode === "dark" ? "/logo-dark.svg" : "/logo.svg"}
      alt={props.alt ?? ""}
      {...rest}
    />
  );
};

export default Logo;
