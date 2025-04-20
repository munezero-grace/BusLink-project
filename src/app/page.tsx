import Link from 'next/link';
import ScheduleSearch from './components/home/ScheduleSearch';
import BusScheduleSection from './components/home/BusScheduleSection';
import BusStopsSection from './components/home/BusStopsSection';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section with Bus Image */}
      <section className="w-full h-[400px] relative">
        <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Your next stop awaits</h1>
            <button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-md">
              Book now
            </button>
          </div>
        </div>
        {/* Hero background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600">
          {/* We'll use a background color gradient instead of an image initially */}
          {/* In production, replace with an actual image of a bus */}
        </div>
      </section>

      {/* Schedule Search Form */}
      <ScheduleSearch />

      {/* Bus Schedule Section */}
      <BusScheduleSection />

      {/* Get Cheap Tickets Section */}
      <section className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Get Cheap Bus Tickets Easily with Us</h2>
        <p className="text-gray-600 mb-6">
          If you're looking to travel by bus, we've got you covered with our extensive bus routes! With over 100 routes all over Kigali, 
          you can easily find the perfect option. Plus, our cheap bus tickets make it easy and affordable to get wherever you want. 
          To arrange your travel properly, whether it's for work or you need to travel for pleasure.
        </p>

        <h3 className="text-lg font-medium mb-2">Bus Routes to Suit Your Schedule</h3>
        <p className="text-gray-600 mb-6">
          Starting with us is simple and hassle-free. Navigate to our 'Routes' bus line timetables, validate schedules, and confirm 
          arrival times for all buses in Kigali. With our intuitive features, including Route Alerts, service info management, and real-easily 
          find the perfect option for your schedule. Additionally, we offer bus travel in different countries, providing even more 
          flexibility and choice for your travel plans. Our app and website are constantly updated to reflect the latest routes and 
          bus status so through our innovative scheduling system, we can consistently tell you the time left for arrival of your buses 
          and departure time in real time.
        </p>

        <h3 className="text-lg font-medium mb-2">Book your seat with us</h3>
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
