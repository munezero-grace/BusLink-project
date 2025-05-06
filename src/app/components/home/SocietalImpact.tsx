import { FaClock, FaShieldAlt, FaLeaf, FaRoute } from 'react-icons/fa';

export default function SocietalImpact() {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-primary-dark mb-12">
        Revolutionizing Rwanda&apos;s Public Transport
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Time Saving */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <FaClock className="text-primary text-3xl" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">Reduced Waiting Times</h3>
          <p className="text-gray-600 text-center">
            Our smart scheduling algorithms cut average waiting times by up to 70%, saving commuters precious hours every week.
          </p>
        </div>
        
        {/* Enhanced Safety */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <FaShieldAlt className="text-primary text-3xl" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">Paramount Safety</h3>
          <p className="text-gray-600 text-center">
            Real-time monitoring and driver performance evaluation leads to safer journeys and fewer road incidents.
          </p>
        </div>
        
        {/* Environmental Impact */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <FaLeaf className="text-primary text-3xl" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">Greener Transport</h3>
          <p className="text-gray-600 text-center">
            Optimized routes and reduced congestion contribute to lower emissions and a cleaner environment for Rwanda.
          </p>
        </div>
        
        {/* Traffic Management */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <FaRoute className="text-primary text-3xl" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">Smart Routing</h3>
          <p className="text-gray-600 text-center">
            Traffic-aware navigation helps drivers choose optimal routes, reducing congestion in urban areas.
          </p>
        </div>
      </div>
    </section>
  );
}