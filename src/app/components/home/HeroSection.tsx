import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900 py-24 sm:py-32">
      {/* Background image overlay */}
      <div className="absolute inset-0 opacity-40">
        <Image
          src="/images/hero-background.jpg" // You'll need to add this image
          alt="Kigali city roads"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      
      {/* Hero content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Revolutionizing Rwanda's Public Transport
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Experience shorter waiting times, enhanced safety, and seamless travel 
            across Rwanda with our innovative bus tracking and booking system.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link 
              href="/booking" 
              className="rounded-md bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            >
              Book a Seat
            </Link>
            <Link 
              href="/tracking" 
              className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-gray-900 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Track Your Bus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;