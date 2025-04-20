import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* About Us Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-dark mb-6">
            ABOUT-US
          </h1>
          <p className="text-lg text-center max-w-3xl mx-auto">
            Take journey with us cause we don't wait more time on bus stop we
            book bus every where you are we don't need to wait on bus stop this
            app has came to solve passenger waiting many minutes.
          </p>
        </div>

        {/* Mission, Vision and Objective Circles - Mobile Layout */}
        <div className="md:hidden flex flex-col items-center space-y-12 mb-16">
          {/* Mission */}
          <div className="bg-gray-200 rounded-full w-64 h-64 flex flex-col justify-center items-center p-6 text-center shadow-md">
            <h3 className="text-xl font-bold text-primary mb-2">Mission</h3>
            <p className="text-sm">
              To work with citizen to deliver public service to the user of
              public bus in kigali
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gray-400 rounded-full w-64 h-64 flex flex-col justify-center items-center p-6 text-center shadow-md -mt-8">
            <h3 className="text-xl font-bold text-white mb-2">Vision</h3>
            <p className="text-sm text-white">
              our vision is to provide bus service as well as to not let them to
              wait for the bus they don't know where it is
            </p>
          </div>

          {/* Objective */}
          <div className="bg-white border-2 border-green-500 rounded-full w-64 h-64 flex flex-col justify-center items-center p-6 text-center shadow-md -mt-8">
            <h3 className="text-xl font-bold text-green-600 mb-2">Ojective</h3>
            <p className="text-sm">
              our goal is to journey and make life save time for the bus user
              and to keep trust.
            </p>
          </div>
        </div>

        {/* Mission, Vision and Objective Circles - Desktop Layout */}
        <div className="hidden md:block relative h-[400px] mb-16">
          {/* Mission */}
          <div className="absolute top-10 left-0 bg-gray-200 rounded-full w-64 h-64 flex flex-col justify-center items-center p-6 text-center shadow-md hover:scale-105 transition-transform z-10 hover:z-40">
            <h3 className="text-xl font-bold text-primary mb-2">Mission</h3>
            <p className="text-sm">
              To work with citizen to deliver public service to the user of
              public bus in kigali
            </p>
          </div>

          {/* Vision */}
          <div className="absolute top-20 left-[calc(50%-125px)] bg-gray-400 rounded-full w-64 h-64 flex flex-col justify-center items-center p-6 text-center shadow-md hover:scale-105 transition-transform z-20 hover:z-40">
            <h3 className="text-xl font-bold text-white mb-2">Vision</h3>
            <p className="text-sm text-white">
              our vision is to provide bus service as well as to not let them to
              wait for the bus they don't know where it is
            </p>
          </div>

          {/* Objective */}
          <div className="absolute top-0 right-0 bg-white border-2 border-green-500 rounded-full w-64 h-64 flex flex-col justify-center items-center p-6 text-center shadow-md hover:scale-105 transition-transform z-30 hover:z-40">
            <h3 className="text-xl font-bold text-green-600 mb-2">Ojective</h3>
            <p className="text-sm">
              our goal is to journey and make life save time for the bus user
              and to keep trust.
            </p>
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-dark text-center mb-8">
            WHAT WE OFFER
          </h2>
          <ul className="max-w-2xl mx-auto space-y-4">
            <li className="flex items-baseline">
              <span className="text-primary-dark font-bold mr-2">•</span>
              <span>We book your sit every where you are in kigali</span>
            </li>
            <li className="flex items-baseline">
              <span className="text-primary-dark font-bold mr-2">•</span>
              <span>
                Your pay your sit before and you can cancel you ticket when you
                find that you will be later to rich to bus stop
              </span>
            </li>
            <li className="flex items-baseline">
              <span className="text-primary-dark font-bold mr-2">•</span>
              <span>There is free wifi</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
