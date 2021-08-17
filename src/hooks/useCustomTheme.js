import { useColorModeValue } from "@chakra-ui/react"

import { APP_THEME } from "@/styles/theme"

export default function useCustomTheme() {
  const textColor = useColorModeValue(APP_THEME.textColor.light, APP_THEME.textColor.dark);
  return {
    ...APP_THEME,
    textColor
  };
}
