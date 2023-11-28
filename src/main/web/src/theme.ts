import { ThemeConfig, extendTheme } from "@chakra-ui/react";
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};
const theme = extendTheme({
  config,
  fonts: {
    heading: `'Vazirmatn Variable'`,
    body: `'Vazirmatn Variable'`,
  },
  direction: "rtl",
});

export default theme;
