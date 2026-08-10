import { Inter } from 'next/font/google'
import './globals.css'
import Aoscompo from '@/lib/utils/aos'
import ScrollToTop from './components/scroll-to-top'
import Header from './components/layout/header'
import Footer from './components/layout/footer'
import Script from 'next/script'
import ToasterContext from './api/contex/ToasetContex'

// Polyfill globalThis.localStorage for Node 22+ SSR compatibility
if (typeof globalThis !== 'undefined' && (!globalThis.localStorage || typeof globalThis.localStorage.getItem !== 'function')) {
  (globalThis as any).localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  };
}

const font = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${font.className}`}>
        <ToasterContext />
        <Aoscompo>
          <Header />
          {children}
          <Footer />
        </Aoscompo>
        <ScrollToTop />
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
      </body>
    </html>
  )
}
