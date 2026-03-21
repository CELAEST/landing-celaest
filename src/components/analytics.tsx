import Script from 'next/script';

export function Analytics() {
  return (
    <>
      {/* 
        Enterprise Analytics Pattern 
        Scripts with type="text/partytown" are executed in a Web Worker,
        leaving the main thread 100% free for React UI rendering.
      */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-ENTERPRISE-ID`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ENTERPRISE-ID', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
