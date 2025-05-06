import { useState } from 'react';
import Image from 'next/image';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Jean Kwizera',
    role: 'Daily Commuter',
    image: '/images/testimonials/user1.jpg', // You'll need to add these images
    quote: 'BusLink has completely changed my daily commute. I no longer waste time waiting at bus stops, and I can plan my day much more efficiently.',
    rating: 5
  },
  {
    id: 2,
    name: 'Marie Uwase',
    role: 'Student',
    image: '/images/testimonials/user2.jpg',
    quote: 'As a student, I rely on public transport every day. The ability to track buses in real-time has made my journey to university so much more predictable.',
    rating: 5
  },
  {
    id: 3,
    name: 'Eric Mugisha',
    role: 'Business Professional',
    image: '/images/testimonials/user3.jpg',
    quote: 'The convenience of booking a seat in advance and knowing exactly when my bus will arrive has improved my productivity significantly.',
    rating: 4
  },
  {
    id: 4,
    name: 'Diane Mukamana',
    role: 'Teacher',
    image: '/images/testimonials/user4.jpg',
    quote: 'I feel much safer knowing that the drivers are being monitored for safety. It gives me peace of mind during my daily commute.',
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Real experiences from people using BusLink every day.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="absolute top-8 left-8 text-primary opacity-20">
              <FaQuoteLeft size={50} />
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-20 h-20 rounded-full overflow-hidden mb-6">
                <Image 
                  src={testimonials[activeIndex].image || '/images/testimonials/placeholder.jpg'}
                  alt={testimonials[activeIndex].name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < testimonials[activeIndex].rating ? 'text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>

              <p className="text-lg md:text-xl italic text-gray-700 mb-6">
                "{testimonials[activeIndex].quote}"
              </p>

              <h3 className="text-xl font-semibold text-gray-900">
                {testimonials[activeIndex].name}
              </h3>
              <p className="text-gray-500">
                {testimonials[activeIndex].role}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4">
            <button 
              onClick={prevTestimonial}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4">
            <button 
              onClick={nextTestimonial}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="text-gray-600" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;