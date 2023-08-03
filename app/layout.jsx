import './globals.css'
import { Inter } from 'next/font/google'
import Stats from '@/components/stats'
import Navbar from '@/components/navbar'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Presence',
  description: 'Attendence Tracking Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="description" content="description of your project" />
        <meta name="theme-color" content="#000" />
        <title>Presence</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
      </Head>
      <body
        className={inter.className}
      >
        {children}
        <Navbar />
        <Stats />
      </body>
    </html>
  )
}
