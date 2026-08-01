import React from "react";
import Script from "next/script";
import { CONSENT_STORAGE_KEY, CONSENT_EVENT } from "@/app/consent";

// Script for HotJar, loaded only when analytics consent is given

const HotjarSnippet = () => {
  const rawHotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID;

  // The id is interpolated into an inline <script>, so only ever accept a plain
  // integer — anything else would be injected as executable JavaScript.
  if (!rawHotjarId || !/^\d+$/.test(rawHotjarId)) return null;

  const hotjarId = Number(rawHotjarId);

  return (
    <Script id="hotjar-snippet" strategy="afterInteractive">
      {`
        (function() {
          if (typeof window === 'undefined') return;
          var key = ${JSON.stringify(CONSENT_STORAGE_KEY)};
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
                h._hjSettings={hjid:${hotjarId},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          }
          loadHotjar();
          // Consent given in this tab.
          window.addEventListener(${JSON.stringify(CONSENT_EVENT)}, loadHotjar);
          // Consent given in another tab.
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
