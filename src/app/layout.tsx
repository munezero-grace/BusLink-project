import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { FaBus } from 'react-icons/fa'

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
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto py-4 px-6 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaBus className="text-2xl text-blue-600" />
              <h1 className="text-2xl font-bold text-blue-600">BusLink</h1>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                <li><Link href="/tracking" className="hover:text-blue-600">Bus Tracking</Link></li>
                <li><Link href="/schedules" className="hover:text-blue-600">Schedules</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
                <li><Link href="/auth/login" className="hover:text-blue-600 font-medium">Login</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        
        {children}
        
        {/* Footer */}
        <footer className="bg-gray-100 border-t border-gray-200 mt-12">
          <div className="container mx-auto py-8 px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About BusLink</h3>
                <p className="text-gray-600">Modern solution for public transportation in Rwanda with real-time tracking and convenient booking.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
                  <li><Link href="/services" className="text-gray-600 hover:text-blue-600">Services</Link></li>
                  <li><Link href="/routes" className="text-gray-600 hover:text-blue-600">Routes</Link></li>
                  <li><Link href="/faq" className="text-gray-600 hover:text-blue-600">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <address className="not-italic text-gray-600">
                  <p>Kigali City, Rwanda</p>
                  <p>info@buslink.rw</p>
                  <p>+250 78 123 4567</p>
                </address>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-blue-600">Facebook</a>
                  <a href="#" className="text-gray-600 hover:text-blue-600">Twitter</a>
                  <a href="#" className="text-gray-600 hover:text-blue-600">Instagram</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-600">
              <p>&copy; {new Date().getFullYear()} BusLink Rwanda. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
