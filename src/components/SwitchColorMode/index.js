import { COLOR_MODES } from '@/src/constants/theme';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';
import React from 'react'

function SwitchColorMode(props) {
  const { colorMode, toggleColorMode } = useColorMode();

  const iconColor = {
    [COLOR_MODES.DARK]: 'white',
    [COLOR_MODES.LIGHT]: 'black',
  }

  return (
    <IconButton
      size="sm"
      aria-label="Toggle dark mode"
      icon={colorMode === COLOR_MODES.DARK ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      color={iconColor[colorMode]}
    />
  )
}

export default SwitchColorMode;