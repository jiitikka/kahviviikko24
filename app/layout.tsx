import type { Metadata } from "next";
import { bebas_neue } from '@/app/fonts';
import "./globals.css";
import HotjarSnippet from "./scripts/HotjarSnippet";
import { GoogleAnalytics } from '@next/third-parties/google';
import ConsentBanner from "./components/ConsentBanner";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Tampereen Kahviviikko 2024",
  description: "Piristysruiske Tampereen kahvilakultuuriin. 8.4.–14.4.2024",
  verification: {
    google: 'fJTi1kgCeV0uuPKqLrrQxaHfU7JZoXZCMZoxa6ue1mE',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const consentKey = "tkv24-analytics-consent-v1";

  return (
    <html className="scroll-smooth" lang="en">
      <body className={bebas_neue.className}>
        {/* Google Analytics only when consent is given */}
        <Script id="ga-consent-check" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var key = '${consentKey}';
                var consent = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
                if (consent === 'accepted') {
                  window.__tkv24AnalyticsAllowed = true;
                } else {
                  window.__tkv24AnalyticsAllowed = false;
                }
              } catch (e) {
                window.__tkv24AnalyticsAllowed = false;
              }
            })();
          `}
        </Script>
        {typeof window === "undefined" ? null : null}
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
                script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XF87P2MYBE';
                script.async = true;
                document.head.appendChild(script);
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XF87P2MYBE');
              }
              if (window.__tkv24AnalyticsAllowed) {
                loadGA();
              }
              window.addEventListener('storage', function(e) {
                if (e.key === '${consentKey}') {
                  window.__tkv24AnalyticsAllowed = e.newValue === 'accepted';
                  if (window.__tkv24AnalyticsAllowed) {
                    loadGA();
                  }
                }
              });
            })();
          `}
        </Script>
        {children}
        <ConsentBanner />
      </body>
      {/* Hotjar snippet will no-op if consent not given; controlled internally */}
      <HotjarSnippet/>
    </html>
  );
}
