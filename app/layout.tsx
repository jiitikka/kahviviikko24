import type { Metadata } from "next";
import { bebas_neue } from '@/app/fonts';
import "./globals.css";
import HotjarSnippet from "./scripts/HotjarSnippet";
import ConsentBanner from "./components/ConsentBanner";
import Script from "next/script";
import { CONSENT_STORAGE_KEY, CONSENT_EVENT } from "@/app/consent";

export const metadata: Metadata = {
  title: "Tampereen Kahviviikko 2024",
  description: "Piristysruiske Tampereen kahvilakultuuriin. 8.4.–14.4.2024",
  verification: {
    google: 'fJTi1kgCeV0uuPKqLrrQxaHfU7JZoXZCMZoxa6ue1mE',
  }
};

const GA_MEASUREMENT_ID = "G-XF87P2MYBE";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={bebas_neue.className}>
        {/* Google Analytics only when consent is given */}
        <Script id="ga-consent-check" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var key = ${JSON.stringify(CONSENT_STORAGE_KEY)};
                var consent = window.localStorage.getItem(key);
                window.__tkv24AnalyticsAllowed = consent === 'accepted';
              } catch (e) {
                window.__tkv24AnalyticsAllowed = false;
              }
            })();
          `}
        </Script>
        {/* GA wrapper that respects consent (evaluated client-side) */}
        <Script id="ga-loader" strategy="afterInteractive">
          {`
            (function() {
              if (typeof window === 'undefined') return;
              function loadGA() {
                if (!window.__tkv24AnalyticsAllowed) return;
                if (window.__tkv24GALoaded) return;
                window.__tkv24GALoaded = true;
                var script = document.createElement('script');
                script.setAttribute('data-nscript', 'afterInteractive');
                script.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
                script.async = true;
                document.head.appendChild(script);
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              }
              loadGA();
              // Consent given in this tab.
              window.addEventListener(${JSON.stringify(CONSENT_EVENT)}, function(e) {
                window.__tkv24AnalyticsAllowed = e.detail === 'accepted';
                loadGA();
              });
              // Consent given in another tab.
              window.addEventListener('storage', function(e) {
                if (e.key === ${JSON.stringify(CONSENT_STORAGE_KEY)}) {
                  window.__tkv24AnalyticsAllowed = e.newValue === 'accepted';
                  loadGA();
                }
              });
            })();
          `}
        </Script>
        {children}
        <ConsentBanner />
        {/* Hotjar snippet no-ops until consent is given; controlled internally */}
        <HotjarSnippet />
      </body>
    </html>
  );
}
