import { FaClock, FaMapMarkedAlt, FaUserShield, FaChartLine, FaRoute } from 'react-icons/fa';

const features = [
  {
    icon: <FaClock className="h-10 w-10 text-primary" />,
    title: 'Reduced Waiting Times',
    description: 'Smart scheduling algorithms and real-time tracking minimize passenger waiting times at bus stops.'
  },
  {
    icon: <FaMapMarkedAlt className="h-10 w-10 text-primary" />,
    title: 'Real-Time Tracking',
    description: 'Track your bus in real-time and get accurate arrival estimations wherever you are.'
  },
  {
    icon: <FaUserShield className="h-10 w-10 text-primary" />,
    title: 'Enhanced Safety',
    description: 'Driver monitoring and safety protocols ensure the highest standards of road safety.'
  },
  {
    icon: <FaChartLine className="h-10 w-10 text-primary" />,
    title: 'Performance Metrics',
    description: 'Comprehensive analytics help drivers improve their performance and efficiency.'
  },
  {
    icon: <FaRoute className="h-10 w-10 text-primary" />,
    title: 'Smart Routing',
    description: 'Traffic-aware routing guides drivers through the most efficient paths, saving time and fuel.'
  }
];

const FeaturesOverview = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Transforming Public Transport
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our innovative solutions address the key challenges in Rwanda's transportation system.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesOverview;