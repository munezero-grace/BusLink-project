import React from 'react';
import Link from 'next/link';

const TicketsSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-secondary mb-2">
          Get Cheap Bus Tickets Easily with Us
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          You're looking to travel by bus? We offer you our extensive bus routes. With over 120 routes all over Kigali, 
          you can easily find the perfect option for your travels. We're the perfect option for your budget.
        </p>
        
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-secondary mb-4">
            Bus Routes to Suit Your Schedule
          </h3>
          
          <p className="text-gray-600 mb-4">
            Searching with us is simple and hassle-free. Transport tech solutions update schedules and remain
            flexible to suit bus timetables. Additionally, we offer bus routes in different provinces, providing even more
            options to find the perfect journey for your trip.
          </p>
          
          <p className="text-gray-600 mb-4">
            Making your journey more pleasant. If you book through our system, we will remind you of the
            departure of your bus the day before, which will help you arrive at the station on time. Additionally, our
            ticket system can send your bus tickets directly to your mobile phone.
          </p>
          
          <Link href="/booking" className="btn-primary inline-block mt-4">
            Book your seat with us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TicketsSection;
