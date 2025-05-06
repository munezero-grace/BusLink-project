import { FaUserClock, FaShieldAlt, FaBusAlt, FaUsers } from 'react-icons/fa';

const statistics = [
  {
    icon: <FaUserClock className="h-10 w-10 text-primary" />,
    value: '65%',
    label: 'Reduced Waiting Time',
    description: 'Average reduction in passenger waiting time at bus stops'
  },
  {
    icon: <FaShieldAlt className="h-10 w-10 text-primary" />,
    value: '40%',
    label: 'Improved Safety',
    description: 'Decrease in road incidents through driver monitoring'
  },
  {
    icon: <FaBusAlt className="h-10 w-10 text-primary" />,
    value: '250+',
    label: 'Buses Connected',
    description: 'Buses equipped with our real-time tracking technology'
  },
  {
    icon: <FaUsers className="h-10 w-10 text-primary" />,
    value: '10,000+',
    label: 'Daily Passengers',
    description: 'People benefiting from our system every day'
  }
];

const StatisticsSection = () => {
  return (
    <div className="py-16 bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Making a Real Impact
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Our technology is transforming public transportation in Rwanda with measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat, index) => (
            <div 
              key={index} 
              className="bg-primary-darker bg-opacity-50 rounded-lg p-6 text-center transition-all duration-300 hover:bg-opacity-70"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {stat.label}
              </h3>
              <p className="text-gray-300">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;