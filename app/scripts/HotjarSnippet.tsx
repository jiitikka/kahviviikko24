import React from 'react'
import Script from 'next/script';

//Script for HotJar

const HotjarSnippet = () => {
    if (!process.env.NEXT_PUBLIC_HOTJAR_ID) return null
    return (
        <Script id="hotjar-snippet">
        {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
        </Script>
  )
}

export default HotjarSnippet