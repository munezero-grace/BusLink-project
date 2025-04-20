import Image from 'next/image';
import Link from 'next/link';

export default function BusScheduleSection() {
  return (
    <section className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Bus Schedule</h2>
      <p className="text-gray-600 mb-4">Our time-automated rapid transit bus lines take you all around Kigali:</p>
      
      <ul className="space-y-2 mb-6">
        <li className="flex items-center gap-2">
          <span className="font-medium">Gasabo district</span> <span className="text-gray-500">⟩</span> <span>54 bus routes</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="font-medium">Kicukiro district</span> <span className="text-gray-500">⟩</span> <span>42 bus routes</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="font-medium">Nyarugenge district</span> <span className="text-gray-500">⟩</span> <span>19 bus routes</span>
        </li>
      </ul>
      
      <div className="bg-gray-100 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-1/3">
          <Image 
            src="/images/map-preview.jpg" 
            alt="Kigali bus route map" 
            width={300} 
            height={200} 
            className="w-full rounded-md"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h3 className="text-lg font-medium mb-2">Discover all destinations</h3>
          <p className="text-gray-600 mb-3">Choose from over 100+ routes destinations in Kigali</p>
          <Link href="/destinations" className="text-blue-500 hover:underline">Explore the map →</Link>
        </div>
      </div>
    </section>
  );
}
