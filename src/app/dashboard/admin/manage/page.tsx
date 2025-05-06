'use client';

import { useState, useEffect } from 'react';
import { 
  FaBus, 
  FaChartLine, 
  FaGasPump, 
  FaRoute, 
  FaMapMarkerAlt,
  FaRoad,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaUserCog,
  FaBell,
  FaEdit,
  FaExclamationTriangle
} from 'react-icons/fa';
import Link from 'next/link';

// Define types
interface Bus {
  id: string;
  plateNumber: string;
  model: string;
  capacity: number;
  manufactureYear: number;
  driver: {
    id: number;
    name: string;
  } | null;
  status: 'active' | 'maintenance' | 'inactive';
  lastMaintenance: string;
  fuelEfficiency: number;
  currentRoute: string | null;
  totalDistance: number;
  alerts: number;
}

// Mock data
const mockBuses: Bus[] = [
  {
    id: 'BUS-001',
    plateNumber: 'RAC 123A',
    model: 'Toyota Coaster',
    capacity: 30,
    manufactureYear: 2020,
    driver: { id: 1, name: 'John Driver' },
    status: 'active',
    lastMaintenance: '2023-04-15',
    fuelEfficiency: 8.5,
    currentRoute: 'Kigali - Nyamata',
    totalDistance: 24568.5,
    alerts: 0
  },
  {
    id: 'BUS-002',
    plateNumber: 'RAD 456B',
    model: 'Toyota Coaster',
    capacity: 30,
    manufactureYear: 2020,
    driver: { id: 2, name: 'Jane Smith' },
    status: 'active',
    lastMaintenance: '2023-05-02',
    fuelEfficiency: 7.9,
    currentRoute: 'Kigali - Musanze',
    totalDistance: 31245.8,
    alerts: 2
  },
  {
    id: 'BUS-003',
    plateNumber: 'RAE 789C',
    model: 'Hyundai County',
    capacity: 25,
    manufactureYear: 2019,
    driver: { id: 3, name: 'Robert Johnson' },
    status: 'maintenance',
    lastMaintenance: '2023-05-18',
    fuelEfficiency: 9.2,
    currentRoute: null,
    totalDistance: 42367.1,
    alerts: 3
  },
  {
    id: 'BUS-004',
    plateNumber: 'RAF 012D',
    model: 'Toyota Coaster',
    capacity: 30,
    manufactureYear: 2021,
    driver: null,
    status: 'inactive',
    lastMaintenance: '2023-02-28',
    fuelEfficiency: 8.7,
    currentRoute: null,
    totalDistance: 12543.6,
    alerts: 1
  },
  {
    id: 'BUS-005',
    plateNumber: 'RAG 345E',
    model: 'Hyundai County',
    capacity: 25,
    manufactureYear: 2019,
    driver: { id: 4, name: 'Lisa Brown' },
    status: 'active',
    lastMaintenance: '2023-04-10',
    fuelEfficiency: 8.1,
    currentRoute: 'Kigali - Rwamagana',
    totalDistance: 38762.3,
    alerts: 0
  },
  {
    id: 'BUS-006',
    plateNumber: 'RAH 678F',
    model: 'Toyota Coaster',
    capacity: 30,
    manufactureYear: 2020,
    driver: { id: 5, name: 'Michael Davis' },
    status: 'active',
    lastMaintenance: '2023-05-12',
    fuelEfficiency: 8.3,
    currentRoute: 'Kigali - Huye',
    totalDistance: 29854.7,
    alerts: 0
  },
  {
    id: 'BUS-007',
    plateNumber: 'RAI 901G',
    model: 'Mitsubishi Rosa',
    capacity: 30,
    manufactureYear: 2018,
    driver: { id: 6, name: 'Sarah Wilson' },
    status: 'active',
    lastMaintenance: '2023-03-25',
    fuelEfficiency: 7.6,
    currentRoute: 'Kigali - Gisenyi',
    totalDistance: 51236.9,
    alerts: 4
  },
];

// Fleet summary
interface FleetSummary {
  totalBuses: number;
  activeBuses: number;
  maintenanceBuses: number;
  inactiveBuses: number;
  totalDistance: number;
  averageFuelEfficiency: number;
  totalAlerts: number;
}

const BusManagement = () => {
  const [buses, setBuses] = useState<Bus[]>(mockBuses);
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>(mockBuses);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof Bus>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Calculate fleet summary
  const fleetSummary: FleetSummary = {
    totalBuses: buses.length,
    activeBuses: buses.filter(bus => bus.status === 'active').length,
    maintenanceBuses: buses.filter(bus => bus.status === 'maintenance').length,
    inactiveBuses: buses.filter(bus => bus.status === 'inactive').length,
    totalDistance: buses.reduce((sum, bus) => sum + bus.totalDistance, 0),
    averageFuelEfficiency: buses.reduce((sum, bus) => sum + bus.fuelEfficiency, 0) / buses.length,
    totalAlerts: buses.reduce((sum, bus) => sum + bus.alerts, 0)
  };
  
  // Filter buses based on search term and status
  useEffect(() => {
    let filtered = buses;
    
    if (searchTerm) {
      filtered = filtered.filter(bus => 
        bus.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (bus.driver && bus.driver.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (bus.currentRoute && bus.currentRoute.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(bus => bus.status === statusFilter);
    }
    
    // Sort buses
    filtered = [...filtered].sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      
      if (fieldA === null && fieldB !== null) return sortDirection === 'asc' ? -1 : 1;
      if (fieldA !== null && fieldB === null) return sortDirection === 'asc' ? 1 : -1;
      if (fieldA === null && fieldB === null) return 0;
      
      // For nested object properties
      if (sortField === 'driver') {
        const nameA = a.driver ? a.driver.name : '';
        const nameB = b.driver ? b.driver.name : '';
        return sortDirection === 'asc' 
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
      
      // For numeric fields
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }
      
      // For string fields
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      
      return 0;
    });
    
    setFilteredBuses(filtered);
  }, [buses, searchTerm, statusFilter, sortField, sortDirection]);
  
  // Handle sorting
  const handleSort = (field: keyof Bus) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bus Management</h1>
      
      {/* Fleet Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-3">
              <FaBus className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Fleet Size</p>
              <div className="flex items-center">
                <p className="text-xl font-bold mr-2">{fleetSummary.totalBuses}</p>
                <div className="text-xs">
                  <span className="text-green-600">{fleetSummary.activeBuses} active</span>
                  <span className="mx-1">•</span>
                  <span className="text-yellow-600">{fleetSummary.maintenanceBuses} maintenance</span>
                  <span className="mx-1">•</span>
                  <span className="text-red-600">{fleetSummary.inactiveBuses} inactive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-3">
              <FaRoad className="text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Distance</p>
              <p className="text-xl font-bold">{fleetSummary.totalDistance.toLocaleString()} km</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 mr-3">
              <FaGasPump className="text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Fuel Efficiency</p>
              <p className="text-xl font-bold">{fleetSummary.averageFuelEfficiency.toFixed(1)} km/L</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 mr-3">
              <FaBell className="text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Alerts</p>
              <p className="text-xl font-bold">{fleetSummary.totalAlerts}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fleet Efficiency Map - Placeholder */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Fleet Distribution</h2>
        </div>
        <div className="p-4 bg-gray-50 flex items-center justify-center" style={{ height: '300px' }}>
          <div className="text-center">
            <FaMapMarkerAlt className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500">The interactive map showing real-time bus locations will be available soon.</p>
          </div>
        </div>
      </div>
      
      {/* Bus List */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Bus Fleet</h2>
        </div>
        
        {/* Search and Filters */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex flex-wrap gap-4">
            <div className="flex-grow max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search buses..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <FaFilter className="text-gray-400 mr-2" />
              <select
                className="p-2 border rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <Link 
              href="/dashboard/admin/buses/add"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md ml-auto flex items-center"
            >
              <FaBus className="mr-2" /> Add Bus
            </Link>
          </div>
        </div>
        
        {/* Bus Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    ID/Plate
                    {sortField === 'id' && (
                      sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Model/Capacity
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('driver')}
                >
                  <div className="flex items-center">
                    Driver
                    {sortField === 'driver' && (
                      sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('currentRoute')}
                >
                  <div className="flex items-center">
                    Current Route
                    {sortField === 'currentRoute' && (
                      sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('fuelEfficiency')}
                >
                  <div className="flex items-center">
                    Efficiency
                    {sortField === 'fuelEfficiency' && (
                      sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('alerts')}
                >
                  <div className="flex items-center">
                    Alerts
                    {sortField === 'alerts' && (
                      sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBuses.map((bus) => (
                <tr key={bus.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{bus.id}</div>
                    <div className="text-sm text-gray-500">{bus.plateNumber}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{bus.model}</div>
                    <div className="text-sm text-gray-500">{bus.capacity} seats • {bus.manufactureYear}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {bus.driver ? (
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                          <FaUserCog className="text-gray-500" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">{bus.driver.name}</div>
                      </div>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {bus.currentRoute ? (
                      <div className="flex items-center">
                        <FaRoute className="text-blue-500 mr-2" />
                        <span className="text-sm text-gray-900">{bus.currentRoute}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(bus.status)}`}>
                      {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        bus.fuelEfficiency > 8.5 ? 'bg-green-500' :
                        bus.fuelEfficiency > 7.5 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm font-medium">{bus.fuelEfficiency.toFixed(1)} km/L</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {bus.alerts > 0 ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center w-fit">
                        <FaExclamationTriangle className="mr-1" /> {bus.alerts}
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        None
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Link 
                        href={`/dashboard/admin/buses/${bus.id}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        View
                      </Link>
                      <span className="text-gray-300">|</span>
                      <Link 
                        href={`/dashboard/admin/buses/${bus.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit Bus"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredBuses.length === 0 && (
          <div className="p-8 text-center">
            <FaBus className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500">No buses found matching your criteria.</p>
          </div>
        )}
      </div>
      
      {/* Bus Maintenance Schedule */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Upcoming Maintenance</h2>
        </div>
        <div className="p-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="text-yellow-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  This feature is coming soon. You will be able to view and manage maintenance schedules for all buses in your fleet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusManagement;