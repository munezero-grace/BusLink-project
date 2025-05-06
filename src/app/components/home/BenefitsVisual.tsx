"use client";

import { useState } from "react";
import {
  FaRegClock,
  FaMapMarkedAlt,
  FaUserShield,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";

export default function BenefitsVisual() {
  const [activeTab, setActiveTab] = useState("scheduling");

  const tabs = [
    {
      id: "scheduling",
      icon: <FaRegClock className="text-2xl" />,
      title: "Smart Scheduling",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-primary-dark mb-4">
            Smart Scheduling Benefits
          </h3>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">30+</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  Minutes Saved Daily
                </h4>
                <p className="text-gray-600">
                  For the average commuter using our scheduled routes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">85%</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  Schedule Adherence
                </h4>
                <p className="text-gray-600">
                  Buses arrive within 2 minutes of scheduled time
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">24/7</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Real-time Updates</h4>
                <p className="text-gray-600">
                  Continuous monitoring and adjustments to schedules
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "routing",
      icon: <FaMapMarkedAlt className="text-2xl" />,
      title: "Traffic-Aware Routing",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-primary-dark mb-4">
            Traffic-Aware Routing Benefits
          </h3>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">18%</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Faster Journeys</h4>
                <p className="text-gray-600">
                  Average journey time reduction with dynamic routing
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">40%</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  Congestion Avoidance
                </h4>
                <p className="text-gray-600">
                  Reduction in time spent in traffic jams
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">98%</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  Route Optimization
                </h4>
                <p className="text-gray-600">
                  Of routes are optimized based on real-time conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "safety",
      icon: <FaUserShield className="text-2xl" />,
      title: "Enhanced Safety",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-primary-dark mb-4">
            Safety Enhancement Benefits
          </h3>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">45%</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Fewer Incidents</h4>
                <p className="text-gray-600">
                  Reduction in traffic incidents on managed routes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">78%</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Driver Compliance</h4>
                <p className="text-gray-600">
                  Adherence to safety protocols and regulations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">92%</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  Passenger Satisfaction
                </h4>
                <p className="text-gray-600">
                  Passengers report feeling safer during transit
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "performance",
      icon: <FaChartLine className="text-2xl" />,
      title: "Driver Performance",
      content: (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-primary-dark mb-4">
            Driver Performance Benefits
          </h3>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">35%</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Fuel Efficiency</h4>
                <p className="text-gray-600">
                  Improvement in fuel consumption with optimized driving
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">28%</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  Maintenance Reduction
                </h4>
                <p className="text-gray-600">
                  Less wear and tear with improved driving techniques
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">65%</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  Driver Satisfaction
                </h4>
                <p className="text-gray-600">
                  Drivers report improved work conditions and satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary-dark mb-12">
          Visualizing the Benefits
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-primary border-t-2 border-primary shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <span className="mb-2">{tab.icon}</span>
              <span className="font-medium">{tab.title}</span>
            </button>
          ))}
        </div>

        <div className="transition-all duration-300 ease-in-out">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>

        <div className="text-center mt-8">
          <a
            href="/about"
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors gap-2"
          >
            Learn more about our impact <FaArrowRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
