'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaMapMarkerAlt, FaBus, FaUser } from 'react-icons/fa';

// Define types
interface Driver {
  id: number;
  name: string;
  status: 'active' | 'blocked';
  experience: string;
}

interface Route {
  id: number;
  name: string;
  startPoint: string;
  endPoint: string;
  distance: string;
  estimatedTime: string;
  assignedDriver: {
    id: number;
    name: string;
  } | null;
  status: 'active' | 'inactive';
}

// Mock data - replace with actual API calls
const mockRoutes: Route[] = [
  { id: 1, name: 'Kigali - Nyamata', startPoint: 'Nyabugogo Terminal', endPoint: 'Nyamata Center', distance: '35 km', estimatedTime: '45 min', assignedDriver: { id: 1, name: 'John Doe' }, status: 'active' },
  { id: 2, name: 'Kigali - Musanze', startPoint: 'Nyabugogo Terminal', endPoint: 'Musanze Bus Station', distance: '85 km', estimatedTime: '2 hours', assignedDriver: { id: 2, name: 'Jane Smith' }, status: 'active' },
  { id: 3, name: 'Kigali - Huye', startPoint: 'Nyabugogo Terminal', endPoint: 'Huye Bus Terminal', distance: '133 km', estimatedTime: '3 hours', assignedDriver: { id: 3, name: 'Robert Johnson' }, status: 'inactive' },
  { id: 4, name: 'Kigali - Rwamagana', startPoint: 'Remera Bus Stop', endPoint: 'Rwamagana Center', distance: '50 km', estimatedTime: '1 hour', assignedDriver: null, status: 'active' },
  { id: 5, name: 'Kigali - Gisenyi', startPoint: 'Nyabugogo Terminal', endPoint: 'Gisenyi Bus Terminal', distance: '157 km', estimatedTime: '3.5 hours', assignedDriver: { id: 5, name: 'Michael Davis' }, status: 'active' },
  { id: 6, name: 'Kigali - Rusizi', startPoint: 'Nyabugogo Terminal', endPoint: 'Rusizi Bus Station', distance: '218 km', estimatedTime: '5 hours', assignedDriver: { id: 6, name: 'Sarah Wilson' }, status: 'active' },
  { id: 7, name: 'Kigali - Kayonza', startPoint: 'Remera Bus Stop', endPoint: 'Kayonza Center', distance: '75 km', estimatedTime: '1.5 hours', assignedDriver: { id: 7, name: 'David Martinez' }, status: 'active' },
];

const mockDrivers: Driver[] = [
  { id: 1, name: 'John Doe', status: 'active', experience: '5 years' },
  { id: 2, name: 'Jane Smith', status: 'active', experience: '3 years' },
  { id: 3, name: 'Robert Johnson', status: 'blocked', experience: '7 years' },
  { id: 4, name: 'Lisa Brown', status: 'active', experience: '2 years' },
  { id: 5, name: 'Michael Davis', status: 'active', experience: '4 years' },
  { id: 6, name: 'Sarah Wilson', status: 'active', experience: '6 years' },
  { id: 7, name: 'David Martinez', status: 'active', experience: '3 years' },
  { id: 8, name: 'Emily Johnson', status: 'active', experience: '2 years' },
];

const RouteManagement = () => {
  const [routes, setRoutes] = useState<Route[]>(mockRoutes);
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // Filter routes based on search term and status
  const filteredRoutes = routes.filter(route => {
    const matchesSearch = 
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.endPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (route.assignedDriver && route.assignedDriver.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = 
      statusFilter === 'all' || 
      route.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Available drivers (only active ones that are not already assigned)
  const availableDrivers = drivers.filter(driver => {
    // Only include active drivers
    if (driver.status !== 'active') return false;
    
    // Check if the driver is already assigned to a route
    const isAssigned = routes.some(route => 
      route.assignedDriver && route.assignedDriver.id === driver.id
    );
    
    return !isAssigned;
  });

  // Assign driver to route
  const assignDriver = () => {
    if (!selectedRoute || !selectedDriver) return;
    
    setRoutes(routes.map(route => {
      if (route.id === selectedRoute.id) {
        return {
          ...route,
          assignedDriver: {
            id: selectedDriver.id,
            name: selectedDriver.name
          }
        };
      }
      return route;
    }));
    
    setShowAssignModal(false);
    setSelectedRoute(null);
    setSelectedDriver(null);
  };

  // Delete route
  const deleteRoute = (routeId: number) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      setRoutes(routes.filter(route => route.id !== routeId));
    }
  };

  // Toggle route status
  const toggleRouteStatus = (routeId: number) => {
    setRoutes(routes.map(route => {
      if (route.id === routeId) {
        const newStatus = route.status === 'active' ? 'inactive' : 'active';
        return { ...route, status: newStatus };
      }
      return route;
    }));
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Route Management</h1>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search routes..."
              className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="p-2 border rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Routes</option>
            <option value="active">Active Routes</option>
            <option value="inactive">Inactive Routes</option>
          </select>
          
          <Link 
            href="/dashboard/admin/routes/new"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center"
          >
            <FaPlus className="mr-2" /> Add Route
          </Link>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Routes</h3>
          <p className="text-3xl font-bold text-blue-600">{routes.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">Active Routes</h3>
          <p className="text-3xl font-bold text-green-600">{routes.filter(r => r.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">Unassigned Routes</h3>
          <p className="text-3xl font-bold text-yellow-600">{routes.filter(r => !r.assignedDriver).length}</p>
        </div>
      </div>
      
      {/* Routes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance & Time</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Driver</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="text-sm font-medium text-gray-900">{route.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-green-500 mr-1" /> {route.startPoint}
                      </div>
                      <div className="flex items-center mt-1">
                        <FaMapMarkerAlt className="text-red-500 mr-1" /> {route.endPoint}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">{route.distance}</div>
                    <div className="text-xs text-gray-500">{route.estimatedTime}</div>
                  </td>
                  <td className="py-4 px-4">
                    {route.assignedDriver ? (
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                          <FaUser className="text-gray-500" />
                        </div>
                        <span className="text-sm">{route.assignedDriver.name}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedRoute(route);
                          setShowAssignModal(true);
                        }}
                        className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
                      >
                        <FaBus className="mr-1" /> Assign Driver
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      route.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {route.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleRouteStatus(route.id)}
                        className={`p-1 rounded ${
                          route.status === 'active'
                            ? 'text-red-600 hover:bg-red-100'
                            : 'text-green-600 hover:bg-green-100'
                        }`}
                        title={route.status === 'active' ? 'Deactivate Route' : 'Activate Route'}
                      >
                        <span className="sr-only">{route.status === 'active' ? 'Deactivate' : 'Activate'}</span>
                        {route.status === 'active' ? '⊘' : '✓'}
                      </button>
                      <Link
                        href={`/dashboard/admin/routes/${route.id}/edit`}
                        className="p-1 rounded text-indigo-600 hover:bg-indigo-100"
                        title="Edit Route"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => deleteRoute(route.id)}
                        className="p-1 rounded text-red-600 hover:bg-red-100"
                        title="Delete Route"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredRoutes.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No routes found matching your search criteria.
          </div>
        )}
      </div>
      
      {/* Driver Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Assign Driver to Route</h2>
            <p className="mb-4">
              <span className="font-semibold">Route:</span> {selectedRoute?.name}
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Driver
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedDriver ? selectedDriver.id : ''}
                onChange={(e) => {
                  const driverId = parseInt(e.target.value);
                  const driver = availableDrivers.find(d => d.id === driverId);
                  setSelectedDriver(driver || null);
                }}
              >
                <option value="">-- Select a driver --</option>
                {availableDrivers.map(driver => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name} ({driver.experience})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedRoute(null);
                  setSelectedDriver(null);
                }}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={assignDriver}
                disabled={!selectedDriver}
                className={`px-4 py-2 rounded-md text-white ${
                  selectedDriver
                    ? 'bg-primary hover:bg-primary-dark'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Assign Driver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteManagement;