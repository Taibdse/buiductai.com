import { useEffect, useRef, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { copyToClipboard } from '../utils/browser';

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);
  const toast = useToast()
  const ref = useRef();

  const copy = () => {
    if (copied) return;
    copyToClipboard(ref?.current?.innerText);
    setCopied(true);
    toast({ description: 'Copied to clipboard!', status: 'success', position: 'top', duration: 2000 })
  }

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  return { copied, copy, ref }
}

export default useCopyToClipboard;