import { useEffect, useRef, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { copyToClipboard } from '../utils/browser';

const TIMEOUT_MILISECONDS = 2000;

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);
  const toast = useToast()
  const ref = useRef();

  const copy = () => {
    if (copied || !ref?.current) return;
    copyToClipboard(ref.current.innerText);
    setCopied(true);
    toast({ description: 'Copied to clipboard!', status: 'success', position: 'top', duration: TIMEOUT_MILISECONDS })
  }

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), TIMEOUT_MILISECONDS);

    return () => clearTimeout(timer);
  }, [copied]);

  return { copied, copy, ref }
}

export default useCopyToClipboard;