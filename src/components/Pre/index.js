import React from 'react';

const Pre = (props) => {
  const { children, ...rest } = props;
  return (
    <pre {...rest}>{children}</pre>
  )
}

export default Pre;