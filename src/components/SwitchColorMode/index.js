import { COLOR_MODES } from '@/src/constants/theme';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react'

function SwitchColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      size="sm"
      aria-label="Toggle dark mode"
      icon={colorMode === COLOR_MODES.DARK ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      color={useColorModeValue('black', 'white')}
    />
  )
}

export default SwitchColorMode;