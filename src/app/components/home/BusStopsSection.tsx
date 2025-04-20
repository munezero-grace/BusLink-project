import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function BusStopsSection() {
  return (
    <section className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-primary-dark">Our Bus Stops</h2>
        <div className="flex gap-2">
          <button className="p-2 bg-gray-200 text-primary-dark rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
            <FaChevronLeft size={16} />
          </button>
          <button className="p-2 bg-gray-200 text-primary-dark rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg overflow-hidden bus-stop-card shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          <div className="overflow-hidden">
            <Image 
              src="/images/downtown-bus-stop.jpg" 
              alt="Downtown bus stop" 
              width={400} 
              height={250}
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="p-3 bg-primary-dark text-white">
            <h3 className="font-medium">Downtown bus stop</h3>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden bus-stop-card shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          <div className="overflow-hidden">
            <Image 
              src="/images/remera-bus-stop.jpg" 
              alt="Remera bus stop" 
              width={400} 
              height={250}
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="p-3 bg-primary-dark text-white">
            <h3 className="font-medium">Remera bus stop</h3>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden bus-stop-card shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          <div className="overflow-hidden">
            <Image 
              src="/images/kacyiru-bus-stop.jpeg" 
              alt="Kacyiru bus stop" 
              width={400} 
              height={250}
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="p-3 bg-primary-dark text-white">
            <h3 className="font-medium">Kacyiru bus stop</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
