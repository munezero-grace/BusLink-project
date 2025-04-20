import Link from 'next/link';
import { FaSearch, FaArrowRight } from 'react-icons/fa';

export default function ScheduleSearch() {
  return (
    <section className="w-full max-w-4xl mx-auto -mt-16 relative z-20 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-primary-dark mb-2">Find schedule</h2>
      <p className="text-sm text-gray-600 mb-4">Quickly look up scheduled times for a specific bus stop, bus route or station.</p>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="route-search" className="text-xs text-gray-500 block mb-1">Search by bus/route name or route number</label>
          <input 
            type="text" 
            id="route-search"
            placeholder="e.g. Remera - Nyabugogo" 
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="w-full md:w-1/5">
          <label htmlFor="route-day" className="text-xs text-gray-500 block mb-1">Day</label>
          <select id="route-day" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary">
            <option>Select all</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
            <FaSearch /> Find schedule
          </button>
        </div>
      </div>

      <div className="mt-4 flex">
        <Link 
          href="/tracking" 
          className="bg-primary text-white text-sm px-4 py-2 rounded-l-md transition-colors"
        >
          All timetables and maps
        </Link>
        <Link 
          href="/schedules" 
          className="bg-white text-primary border border-primary text-sm px-4 py-2 rounded-r-md flex items-center gap-1 transition-colors"
        >
          Bus Schedule <FaArrowRight size={12} />
        </Link>
      </div>
    </section>
  );
}
