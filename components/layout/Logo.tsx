import { useColorMode } from "@chakra-ui/react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

const Logo = (props: Omit<ImageProps, "src">) => {
  const { colorMode } = useColorMode();
  const { alt, ...rest } = props;
  return (
    <Link href="/">
      <Image
        src={colorMode === "dark" ? "/logo-dark.svg" : "/logo.svg"}
        alt={props.alt ?? ""}
        {...rest}
      />
    </Link>
  );
};

export default Logo;
