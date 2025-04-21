"use client";

import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

// Sample driver data
const initialDrivers = [
  { id: 1, name: "Jeanclaude", contact: "0789443784", status: "Active" },
  { id: 2, name: "Jeanclaude", contact: "0789443784", status: "Active" },
  { id: 3, name: "Jeanclaude", contact: "0789443784", status: "Inactive" },
  { id: 4, name: "Jeanclaude", contact: "0789443784", status: "Inactive" },
  { id: 5, name: "Jeanclaude", contact: "0789443784", status: "Inactive" },
  { id: 6, name: "Emmanuel", contact: "0788123456", status: "Active" },
  { id: 7, name: "David", contact: "0799887766", status: "Active" },
  { id: 8, name: "Olivier", contact: "0722334455", status: "Active" },
  { id: 9, name: "Patrick", contact: "0733221100", status: "Blocked" },
  { id: 10, name: "Eric", contact: "0744556677", status: "Blocked" },
  { id: 11, name: "Jean", contact: "0755443322", status: "Blocked" },
  { id: 12, name: "Paul", contact: "0766778899", status: "Blocked" },
];

export default function DriversManagement() {
  const [drivers, setDrivers] = useState(initialDrivers);

  const activeDrivers = drivers.filter((driver) => driver.status === "Active");
  const blockedDrivers = drivers.filter(
    (driver) => driver.status === "Blocked"
  );

  const handleBlock = (id: number) => {
    setDrivers((prevDrivers) =>
      prevDrivers.map((driver) =>
        driver.id === id ? { ...driver, status: "Blocked" } : driver
      )
    );
  };

  const handleUnblock = (id: number) => {
    setDrivers((prevDrivers) =>
      prevDrivers.map((driver) =>
        driver.id === id ? { ...driver, status: "Active" } : driver
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Drivers</h1>

      {/* Driver Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Active Drivers Card */}
        <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-gray-300 font-medium">Active drivers</p>
            <p className="text-blue-400 text-3xl font-bold">
              {activeDrivers.length}
            </p>
          </div>
          <div className="bg-blue-400 rounded-full p-2">
            <FaCheck className="text-white text-xl" />
          </div>
        </div>

        {/* Blocked Drivers Card */}
        <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-gray-300 font-medium">Blocked drivers</p>
            <p className="text-white text-3xl font-bold">
              {blockedDrivers.length}
            </p>
          </div>
          <div className="bg-red-500 rounded-full p-2">
            <FaTimes className="text-white text-xl" />
          </div>
        </div>
      </div>

      {/* All Drivers Section */}
      <h2 className="text-xl font-semibold mb-4">All drivers</h2>

      {/* Drivers Table */}
      <div className="overflow-x-auto bg-primary-dark rounded-lg">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-left">Names</th>
              <th className="py-3 px-4 text-left">Contact</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="border-b border-gray-700">
                <td className="py-3 px-4">{driver.name}</td>
                <td className="py-3 px-4">{driver.contact}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      driver.status === "Active"
                        ? "bg-blue-400 text-white"
                        : driver.status === "Blocked"
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {driver.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    {driver.status !== "Blocked" && (
                      <button
                        onClick={() => handleBlock(driver.id)}
                        className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        Block
                      </button>
                    )}
                    {driver.status === "Blocked" && (
                      <button
                        onClick={() => handleUnblock(driver.id)}
                        className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-500 transition-colors"
                      >
                        Unblock
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
