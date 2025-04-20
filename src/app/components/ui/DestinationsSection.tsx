import React from 'react';
import Link from 'next/link';

const DestinationsSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <div className="bg-gray-200 rounded-lg h-64 md:h-auto">
              {/* Map placeholder - would be replaced with actual map component */}
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="mt-2 text-gray-500">Map view of bus routes</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold text-secondary mb-4">Discover all destinations</h2>
            <p className="text-gray-600 mb-6">
              Choose from over 100 routes destination in Kigali!
            </p>
            <Link href="/routes" className="text-primary font-medium flex items-center">
              Explore the map
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
