import './globals.css'
import { Inter } from 'next/font/google'
import Stats from '@/components/stats'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Presence',
  description: 'Attendence Tracking Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Navbar />
        <Stats />
      </body>
    </html>
  )
}
