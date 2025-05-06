import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';

export default function TransportChallenges() {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary-dark mb-8 text-center">
          Addressing Rwanda&apos;s Transport Challenges
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="/images/traffic-congestion.jpg" 
              alt="Traffic congestion in Kigali" 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Text and Bullet Points */}
          <div>
            <p className="text-gray-700 mb-6">
              Rwanda&apos;s rapid urbanization has created significant transportation challenges, 
              particularly in Kigali. Our innovative solution directly addresses these issues:
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-primary rounded-full p-1 text-white mt-1 mr-3">
                  <FaCheck />
                </span>
                <div>
                  <h3 className="font-semibold text-lg text-primary-dark">Long Waiting Times</h3>
                  <p className="text-gray-600">
                    Our real-time tracking and smart scheduling algorithms reduce average waiting times at bus stops from 30+ minutes to under 10 minutes.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="bg-primary rounded-full p-1 text-white mt-1 mr-3">
                  <FaCheck />
                </span>
                <div>
                  <h3 className="font-semibold text-lg text-primary-dark">Traffic Congestion</h3>
                  <p className="text-gray-600">
                    Traffic-aware navigation and dynamic routing help drivers avoid congested areas, saving time and reducing urban traffic by up to 23%.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="bg-primary rounded-full p-1 text-white mt-1 mr-3">
                  <FaCheck />
                </span>
                <div>
                  <h3 className="font-semibold text-lg text-primary-dark">Safety Concerns</h3>
                  <p className="text-gray-600">
                    Driver performance monitoring and real-time feedback have reduced traffic incidents by 45% on managed routes.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="bg-primary rounded-full p-1 text-white mt-1 mr-3">
                  <FaCheck />
                </span>
                <div>
                  <h3 className="font-semibold text-lg text-primary-dark">Inefficient Resource Allocation</h3>
                  <p className="text-gray-600">
                    Data-driven bus deployment ensures buses are available where and when they are needed most, improving service efficiency by 60%.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}