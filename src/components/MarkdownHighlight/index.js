import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  materialDark,
  materialLight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

const MarkdownHighlight = ({ darkMode, language, value, ...restProps }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={darkMode ? materialLight : materialDark}
      PreTag="div"
      {...restProps}
    >
      {value}
    </SyntaxHighlighter>
  )
}

export default MarkdownHighlight