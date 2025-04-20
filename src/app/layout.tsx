import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { FaBus } from 'react-icons/fa'
import Footer from './components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BusLink - Rwanda Transport Tech Solution',
  description: 'Modern solution for public transportation in Rwanda',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header/Navigation */}
        <header className="bg-primary-dark text-white shadow">
          <div className="container mx-auto py-4 px-6 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaBus className="text-2xl text-primary" />
              <h1 className="text-2xl font-bold">BusLink</h1>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/tracking" className="hover:text-primary transition-colors">Bus Tracking</Link></li>
                <li><Link href="/schedules" className="hover:text-primary transition-colors">Schedules</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/auth/login" className="bg-primary hover:bg-primary-light px-4 py-1 rounded-full transition-colors">Login</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        
        {children}
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  )
}
