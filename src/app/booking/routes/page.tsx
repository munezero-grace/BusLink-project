'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RouteListingComponent from '../components/RouteListingComponent';

export default function RouteSelectionPage() {
  const router = useRouter();

  // Function to handle route selection and navigation to booking form
  const handleRouteSelected = (route: string) => {
    // Navigate to booking form with the selected route
    router.push(`/booking?route=${encodeURIComponent(route)}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-primary-dark text-white">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-6">BusLink</h2>
          <nav className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 p-2 rounded hover:bg-primary/20">
              <span>🏠</span>
              <span>Home</span>
            </Link>
            <Link href="/booking" className="flex items-center space-x-2 p-2 rounded bg-primary/30">
              <span>🕒</span>
              <span>Set your time</span>
            </Link>
            <div className="border-t border-primary/30 my-4"></div>
            <Link href="/help" className="flex items-center space-x-2 p-2 rounded hover:bg-primary/20">
              <span>❓</span>
              <span>Get help</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <RouteListingComponent />
      </div>
    </div>
  );
}
