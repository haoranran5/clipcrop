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
