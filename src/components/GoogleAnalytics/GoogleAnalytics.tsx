import Script from 'next/script';

interface Props {
  gaId: string;
}

const GoogleAnalytics = ({ gaId }: Props) => {
  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <Script
        id='google-analytics'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
            `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
