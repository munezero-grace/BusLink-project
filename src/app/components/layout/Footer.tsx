import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-16">
      {/* Top section with 4 columns */}
      <div className="bg-primary-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About section */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold uppercase">About-Us</h3>
              <p className="text-sm">
                Welcome. All member to join us, here we provide 
                best services for everyone. And this bus transport goes 
                on time, for people who join we get more benefit to save 
                more money and save time.
              </p>
            </div>

            {/* Quick links */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold uppercase">Quick Link</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link></li>
                <li><Link href="/contacts" className="hover:text-primary transition-colors">Contacts</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About us</Link></li>
              </ul>
            </div>

            {/* Lets us help */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold uppercase">Lets Us Help</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/account" className="hover:text-primary transition-colors">Your Account</Link></li>
                <li><Link href="/location" className="hover:text-primary transition-colors">Your location</Link></li>
                <li><Link href="/price" className="hover:text-primary transition-colors">Your price</Link></li>
                <li><Link href="/manage-time" className="hover:text-primary transition-colors">Manage your Time</Link></li>
                <li><Link href="/help" className="hover:text-primary transition-colors">Help</Link></li>
              </ul>
            </div>

            {/* Contact section */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold uppercase">Contact-Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary flex-shrink-0" />
                  <span>location</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaPhone className="text-primary flex-shrink-0" />
                  <span>(+250 798 687 989)</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaEnvelope className="text-primary flex-shrink-0" />
                  <span>transport-sin@gmail.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaGlobe className="text-primary flex-shrink-0" />
                  <span>www.transport-sin.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright section */}
      <div className="bg-primary py-4 text-white">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm mb-4 sm:mb-0">
            Copy @ 2020 All rights reserved by: Bus link
          </p>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook" className="text-white hover:text-gray-200 transition-colors">
              <FaFacebookF />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-white hover:text-gray-200 transition-colors">
              <FaTwitter />
            </Link>
            <Link href="#" aria-label="YouTube" className="text-white hover:text-gray-200 transition-colors">
              <FaYoutube />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-white hover:text-gray-200 transition-colors">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
