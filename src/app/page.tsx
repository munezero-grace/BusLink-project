import Image from 'next/image';
import Link from 'next/link';
import ScheduleSearch from './components/home/ScheduleSearch';
import BusScheduleSection from './components/home/BusScheduleSection';
import BusStopsSection from './components/home/BusStopsSection';
import SocietalImpact from './components/home/SocietalImpact';
import TransportChallenges from './components/home/TransportChallenges';
import BenefitsVisual from './components/home/BenefitsVisual';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section with Bus Image */}
      <section className="w-full h-[400px] relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary-dark/70 z-10 flex items-center justify-center group-hover:bg-primary-dark/60 transition-all duration-500">
          <div className="text-center px-4 max-w-2xl transform transition-transform duration-500 group-hover:scale-105">
            <h1 className="text-5xl font-bold text-white mb-6 italic">Your next stop awaits</h1>
            <Link href="/booking" className="bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-300 inline-block">
              Book here
            </Link>
          </div>
        </div>
        <div className="absolute inset-0">
          <div className="relative w-full h-full transform transition-transform duration-700 ease-in-out group-hover:scale-105">
            <Image 
              src="/images/bus-hero.jpg" 
              alt="Modern electric bus at a station"
              fill
              className="object-cover object-center transition-all duration-700"
              priority
              sizes="100vw"
              quality={90}
            />
          </div>
        </div>
      </section>

      {/* Schedule Search Form */}
      <ScheduleSearch />
      
      {/* Societal Impact Section */}
      <SocietalImpact />
      
      {/* Transport Challenges in Rwanda */}
      <TransportChallenges />

      {/* Bus Schedule Section */}
      <BusScheduleSection />

      {/* Benefits Visualization */}
      <BenefitsVisual />

      {/* Get Cheap Tickets Section */}
      <section className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-primary-dark mb-2">Get Cheap Bus Tickets Easily with Us</h2>
        <p className="text-gray-600 mb-6">
          If you're looking to travel by bus, we've got you covered with our extensive bus routes! With over 100 routes all over Kigali, 
          you can easily find the perfect option. Plus, our cheap bus tickets make it easy and affordable to get wherever you want. 
          To arrange your travel properly, whether it's for work or you need to travel for pleasure.
        </p>

        <h3 className="text-lg font-medium text-primary-dark mb-2">Bus Routes to Suit Your Schedule</h3>
        <p className="text-gray-600 mb-6">
          Starting with us is simple and hassle-free. Navigate to our 'Routes' bus line timetables, validate schedules, and confirm 
          arrival times for all buses in Kigali. With our intuitive features, including Route Alerts, service info management, and real-easily 
          find the perfect option for your schedule. Additionally, we offer bus travel in different countries, providing even more 
          flexibility and choice for your travel plans. Our app and website are constantly updated to reflect the latest routes and 
          bus status so through our innovative scheduling system, we can consistently tell you the time left for arrival of your buses 
          and departure time in real time.
        </p>

        <h3 className="text-lg font-medium text-primary-dark mb-2">Book your seat with us</h3>
        <p className="text-gray-600 mb-6">
          Our website makes it easy to plan your journey, find the cheapest bus fares, and purchase your bus tickets securely. 
          All you need to do is enter your origin and destination, choose your travel date, and buy the bus ticket online. With our 
          ticket system, you can board your bus without the hassle of paper tickets – simply show your e-ticket at your buses.
        </p>
      </section>

      {/* Bus Stops Section */}
      <BusStopsSection />
    </main>
  );
}