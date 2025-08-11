import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ClipCrop — Free Online Image Crop Tool | Crop, Resize, Circle & Rounded',
  description: 'Fast, privacy‑friendly online image cropper—circle & rounded corners, padding, shadow, filters, watermark, batch ZIP, social previews, PWA offline. 100% in your browser.',
  keywords: 'crop image tool, online image cropper, image resizer, circle avatar, rounded corners image, photo editor, batch export zip, social media preview, privacy-friendly, PWA',
  authors: [{ name: 'ClipCrop' }],
  creator: 'ClipCrop',
  publisher: 'ClipCrop',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://crop-image-tool.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ClipCrop — Free Online Image Crop Tool',
    description: 'Crop & resize images online with circle/rounded corners, watermark, filters, batch ZIP, and live previews. No uploads.',
    url: 'https://crop-image-tool.com/',
    siteName: 'ClipCrop',
    images: [
      {
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'ClipCrop - Online Image Cropper',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClipCrop — Online Image Cropper',
    description: 'No-upload, offline-capable image cropper for creators and marketers.',
    images: ['/og-cover.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#1f8bff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ClipCrop" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        <link rel="canonical" href="https://crop-image-tool.com/" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/icons/favicon-192.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "ClipCrop",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Web",
            "url": "https://crop-image-tool.com/",
            "image": "https://crop-image-tool.com/og-cover.png",
            "description": "Free online image crop tool with circle & rounded corners, batch ZIP, social presets, filters, watermark. 100% client-side.",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1250"
            },
            "featureList": [
              "Circle and rounded corner cropping",
              "Batch export with ZIP",
              "Social media presets",
              "Filters and effects",
              "Watermark support",
              "PWA offline capability",
              "Privacy-friendly (no uploads)"
            ]
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": "Do you upload my images to any server?",
              "acceptedAnswer": { "@type": "Answer", "text": "No. ClipCrop runs 100% in your browser. Images never leave your device." }
            },{
              "@type": "Question",
              "name": "Can I use ClipCrop offline?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes. Install it as a PWA. We cache core assets and your recent work." }
            },{
              "@type": "Question",
              "name": "Does it support circle avatars and rounded corners?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes. Circle PNG (transparent) and rounded rectangles with adjustable radius and borders are built-in." }
            },{
              "@type": "Question",
              "name": "How do I batch export multiple sizes?",
              "acceptedAnswer": { "@type": "Answer", "text": "Use the Batch ZIP buttons (128/256/512). V5.2 uses a Web Worker so the UI remains responsive." }
            },{
              "@type": "Question",
              "name": "What social media platforms are supported?",
              "acceptedAnswer": { "@type": "Answer", "text": "Instagram, Twitter, Facebook, LinkedIn, YouTube, Pinterest, Telegram, Xiaohongshu, Bilibili, Douyin, WeChat, Weibo and more." }
            },{
              "@type": "Question",
              "name": "Is it free to use?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes, ClipCrop is completely free with no ads or limitations." }
            }]
          })}
        </script>
      </head>
      <body className={inter.className}>
        {children}
        
        {/* Analytics */}
        <div style={{ display: 'none' }}>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-N7DB775N0W"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-N7DB775N0W');
              `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "ssxiroscdr");
              `,
            }}
          />
        </div>
      </body>
    </html>
  )
}
