"use client";

import React, { useState } from "react";
import {
  FaBus,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTicketAlt,
  FaTimesCircle,
} from "react-icons/fa";
import Link from "next/link";

// Define types at the top level
interface Booking {
  id: number;
  from: string;
  to: string;
  date: string;
  time: string;
  busNumber: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  price: string;
  seat: string;
}

type BookingStatus = Booking["status"] | "all";

function UserBookings() {
  // State for filtering bookings with proper typing
  const [filterStatus, setFilterStatus] = useState<BookingStatus>("all");

  // Mock data for bookings
  const bookings: Booking[] = [
    {
      id: 1,
      from: "Kigali Heights",
      to: "Kimironko",
      date: "May 10, 2025",
      time: "10:30 AM",
      busNumber: "KH-102",
      status: "Confirmed",
      price: "1,500 RWF",
      seat: "A12",
    },
    {
      id: 2,
      from: "Nyabugogo",
      to: "Kacyiru",
      date: "May 15, 2025",
      time: "08:15 AM",
      busNumber: "NB-205",
      status: "Pending",
      price: "1,200 RWF",
      seat: "B08",
    },
    {
      id: 3,
      from: "Downtown",
      to: "Remera",
      date: "June 5, 2025",
      time: "09:45 AM",
      busNumber: "DT-307",
      status: "Confirmed",
      price: "1,800 RWF",
      seat: "C15",
    },
    {
      id: 4,
      from: "Kimironko",
      to: "Nyabugogo",
      date: "April 28, 2025",
      time: "14:20 PM",
      busNumber: "KR-104",
      status: "Completed",
      price: "1,500 RWF",
      seat: "D03",
    },
    {
      id: 5,
      from: "Remera",
      to: "Kigali Heights",
      date: "April 22, 2025",
      time: "16:30 PM",
      busNumber: "RM-209",
      status: "Cancelled",
      price: "1,200 RWF",
      seat: "A05",
    },
  ];

  // Filter bookings based on selected status without toLowerCase
  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filterStatus);

  // Get status badge style based on status
  const getStatusBadgeStyle = (status: Booking["status"]): string => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <Link
          href="/booking"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <FaTicketAlt /> Book New Trip
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 font-medium ${
            filterStatus === "all"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          All Bookings
        </button>
        <button
          onClick={() => setFilterStatus("Confirmed")}
          className={`px-4 py-2 font-medium ${
            filterStatus === "Confirmed"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Confirmed
        </button>
        <button
          onClick={() => setFilterStatus("Pending")}
          className={`px-4 py-2 font-medium ${
            filterStatus === "Pending"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilterStatus("Completed")}
          className={`px-4 py-2 font-medium ${
            filterStatus === "Completed"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilterStatus("Cancelled")}
          className={`px-4 py-2 font-medium ${
            filterStatus === "Cancelled"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <FaBus className="text-primary" />
                  <span className="font-medium">{booking.busNumber}</span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeStyle(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-start mb-4">
                    <div className="mt-1">
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-gray-400" size={14} />
                        <span className="text-gray-500">From:</span>
                      </div>
                      <div className="h-8 border-l border-dashed border-gray-300 ml-1.5 my-1"></div>
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-primary" size={14} />
                        <span className="text-gray-500">To:</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{booking.from}</p>
                      <div className="h-8"></div>
                      <p className="font-medium">{booking.to}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="text-gray-400" />
                      <span>{booking.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-200 pl-0 lg:pl-4 pt-4 lg:pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ticket ID:</span>
                      <span className="font-medium">
                        BL-{booking.id.toString().padStart(6, "0")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Seat:</span>
                      <span className="font-medium">{booking.seat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price:</span>
                      <span className="font-medium">{booking.price}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2 justify-end">
                    {(booking.status === "Confirmed" ||
                      booking.status === "Pending") && (
                      <>
                        <button className="px-3 py-1.5 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors text-sm">
                          View Ticket
                        </button>
                        {booking.status !== "Pending" && (
                          <button className="px-3 py-1.5 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors text-sm flex items-center gap-1">
                            <FaTimesCircle size={12} /> Cancel
                          </button>
                        )}
                      </>
                    )}
                    {booking.status === "Completed" && (
                      <button className="px-3 py-1.5 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors text-sm">
                        Book Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">
              No {filterStatus !== "all" ? filterStatus : ""} bookings found
            </p>
            <Link
              href="/booking"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors inline-flex items-center gap-2"
            >
              <FaTicketAlt /> Book a Trip
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Make sure to export the component
export default UserBookings;
