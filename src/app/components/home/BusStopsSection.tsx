import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function BusStopsSection() {
  return (
    <section className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Our Bus Stops</h2>
        <div className="flex gap-2">
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaChevronLeft size={16} />
          </button>
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg overflow-hidden bus-stop-card">
          <div className="w-full h-48 bg-blue-700 flex items-center justify-center">
            <span className="text-white font-semibold">Downtown</span>
          </div>
          <div className="p-3 bg-gray-100">
            <h3 className="font-medium">Downtown bus stop</h3>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden bus-stop-card">
          <div className="w-full h-48 bg-blue-600 flex items-center justify-center">
            <span className="text-white font-semibold">Remera</span>
          </div>
          <div className="p-3 bg-gray-100">
            <h3 className="font-medium">Remera bus stop</h3>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden bus-stop-card">
          <div className="w-full h-48 bg-blue-500 flex items-center justify-center">
            <span className="text-white font-semibold">Kacyiru</span>
          </div>
          <div className="p-3 bg-gray-100">
            <h3 className="font-medium">Kacyiru bus stop</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
