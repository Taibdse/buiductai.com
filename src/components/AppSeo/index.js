import React from 'react';
import { NextSeo } from 'next-seo';

function AppSeo(props) {
  const { seo } = props;
  return (
    <NextSeo
      title={seo.title}
      description={seo.description}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
  )
}

export default AppSeo;