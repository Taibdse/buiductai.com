import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react';

function PageScrollProgress() {

  const [width, setWidth] = useState(1);

  const handleScroll = () => {
    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    let scrollPercentRounded = Math.round(scrollPercent * 100);
    setWidth(scrollPercentRounded)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <Box h={1} as="div" bgGradient="linear(to-r, green.200, pink.500)" position="fixed" top={0} zIndex={1001} w={`${width}%`}></Box>
  )
}

export default PageScrollProgress;