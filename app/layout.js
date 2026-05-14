import './globals.css'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

const title = 'Age Calculator - Calculate Exact Age Online'
const description =
  'Free online age calculator to calculate exact age in years, months, weeks, days, hours, minutes and seconds from any date of birth.'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: 'Age Calculator',
  keywords: [
    'age calculator',
    'calculate age',
    'date of birth calculator',
    'exact age calculator',
    'birthday calculator',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Age Calculator',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Age Calculator',
        description,
      },
      {
        '@type': 'WebApplication',
        '@id': `${siteUrl}/#webapp`,
        name: 'Age Calculator',
        url: siteUrl,
        description,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate exact age from date of birth',
          'Show age in years, months and days',
          'Show total months, weeks, days, hours, minutes and seconds',
          'Calculate next birthday date',
        ],
      },
    ],
  }

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        {children}
      </body>
    </html>
  )
}
