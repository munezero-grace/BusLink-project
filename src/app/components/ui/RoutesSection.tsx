import React from 'react';

const RoutesSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-secondary mb-8">Bus Schedule</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-center mb-8">
            Our time-automated rapid transit bus lines take you all around Kigali!
          </p>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4 pb-4 border-b border-gray-200">
              <p className="font-medium">Gasabo district</p>
              <p className="text-gray-600">→ 34 bus routes</p>
            </div>
            
            <div className="mb-4 pb-4 border-b border-gray-200">
              <p className="font-medium">Kicukiro district</p>
              <p className="text-gray-600">→ 23 bus routes</p>
            </div>
            
            <div className="mb-4">
              <p className="font-medium">Nyarugenge district</p>
              <p className="text-gray-600">→ 19 bus routes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoutesSection;
