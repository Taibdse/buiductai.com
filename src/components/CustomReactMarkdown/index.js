import React from 'react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import MarkdownHighlight from '../MarkdownHighlight';

function CustomReactMarkdown(props) {
  const { content } = props;
  return (
    <div className="custom-react-markdown-wrapper">
      <ReactMarkdown
        style={{ width: '100%' }}
        children={content}
        components={{
          ...ChakraUIRenderer(),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <MarkdownHighlight
                language={match[1]}
                value={String(children).replace(/\n$/, '')}
                darkMode={false}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      />
    </div>
  )
}

export default CustomReactMarkdown;