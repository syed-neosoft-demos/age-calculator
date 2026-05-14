import './globals.css'

export const metadata = {
  title: 'Age Calculator',
  description: 'Calculate your exact age in years, months, weeks, days, hours, minutes and seconds',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
