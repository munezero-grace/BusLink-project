import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <div className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-dark rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-12 md:py-16 md:px-12 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Transform Your Daily Commute?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Join thousands of satisfied passengers who have already made the switch to a smarter, safer, and more efficient transport experience.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/auth/signup" 
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
              >
                Sign Up Now
                <FaArrowRight className="ml-2" />
              </Link>
              <Link 
                href="/about" 
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-primary-darker md:py-4 md:text-lg md:px-10"
              >
                Learn More
              </Link>
            </div>
            
            <p className="mt-4 text-sm text-gray-300">
              Already have an account? <Link href="/auth/login" className="font-medium text-white hover:underline">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;