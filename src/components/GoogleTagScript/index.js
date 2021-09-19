import React from 'react';

function GoogleTagScript(props) {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-207981628-1"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'UA-207981628-1');
        ` }}
          />
        </>
      )}
    </>
  )
}

export default GoogleTagScript;