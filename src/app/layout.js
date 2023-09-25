import './globals.css'
import { Inter } from 'next/font/google'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AniWrapped',
  description: 'Cool site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.15/slick.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.9/slick-theme.css" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
