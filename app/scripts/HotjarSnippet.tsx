import React from "react";
import Script from "next/script";

// Script for HotJar, loaded only when analytics consent is given

const HotjarSnippet = () => {
  if (!process.env.NEXT_PUBLIC_HOTJAR_ID) return null;

  const consentKey = "tkv24-analytics-consent-v1";

  return (
    <Script id="hotjar-snippet" strategy="afterInteractive">
      {`
        (function() {
          if (typeof window === 'undefined') return;
          var key = '${consentKey}';
          function hasConsent() {
            try {
              return window.localStorage.getItem(key) === 'accepted';
            } catch (e) {
              return false;
            }
          }
          function loadHotjar() {
            if (!hasConsent()) return;
            if (window.__tkv24HotjarLoaded) return;
            window.__tkv24HotjarLoaded = true;
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          }
          if (hasConsent()) {
            loadHotjar();
          }
          window.addEventListener('storage', function(e) {
            if (e.key === key && e.newValue === 'accepted') {
              loadHotjar();
            }
          });
        })();
      `}
    </Script>
  );
};

export default HotjarSnippet;
