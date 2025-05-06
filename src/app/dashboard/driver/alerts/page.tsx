'use client';

import { useState, useEffect } from 'react';
import { 
  FaBell, 
  FaExclamationTriangle, 
  FaTachometerAlt, 
  FaTools, 
  FaCalendarDay,
  FaFilter,
  FaCheck,
  FaTimes,
  FaChartLine
} from 'react-icons/fa';

// Import AlertCard component
import AlertCard from '@/app/components/driver/AlertCard';

// Import the alert utilities and mock API
import { 
  Alert, 
  AlertType, 
  getAlertTypeColor, 
  getAlertTypeBgColor,
  getAlertSeverityColor
} from '@/utils/alert-utils';

import {
  fetchAlerts,
  markAlertAsRead,
  markAllAlertsAsRead
} from '@/utils/api-mock';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Fetch alerts from API
    const getAlerts = async () => {
      try {
        const data = await fetchAlerts();
        setAlerts(data);
        setFilteredAlerts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching alerts:', error);
        setIsLoading(false);
      }
    };
    
    getAlerts();
  }, []);
  
  useEffect(() => {
    // Filter alerts based on selected filters
    let filtered = alerts;
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(alert => alert.type === typeFilter);
    }
    
    if (showUnreadOnly) {
      filtered = filtered.filter(alert => !alert.isRead);
    }
    
    setFilteredAlerts(filtered);
  }, [alerts, typeFilter, showUnreadOnly]);
  
  const handleMarkAsRead = async (alertId: number) => {
    try {
      const success = await markAlertAsRead(alertId);
      if (success) {
        setAlerts(prevAlerts => 
          prevAlerts.map(alert => 
            alert.id === alertId 
              ? { ...alert, isRead: true } 
              : alert
          )
        );
      }
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };
  
  const handleMarkAllAsRead = async () => {
    try {
      const success = await markAllAlertsAsRead();
      if (success) {
        setAlerts(prevAlerts => 
          prevAlerts.map(alert => ({ ...alert, isRead: true }))
        );
      }
    } catch (error) {
      console.error('Error marking all alerts as read:', error);
    }
  };
  
  // Count unread alerts
  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  // Count alerts by type
  const safetyCount = alerts.filter(alert => alert.type === 'safety').length;
  const performanceCount = alerts.filter(alert => alert.type === 'performance').length;
  const maintenanceCount = alerts.filter(alert => alert.type === 'maintenance').length;
  const scheduleCount = alerts.filter(alert => alert.type === 'schedule').length;
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Alerts</h1>
          <p className="text-gray-600">Driver performance and vehicle alerts</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md mr-2"
            >
              <FaCheck className="mr-2" /> Mark All as Read
            </button>
          )}
          
          <div className="relative">
            <div className="flex items-center bg-white border rounded-md p-2">
              <FaBell className="text-gray-400 mr-2" />
              <span className="font-medium">{unreadCount}</span>
              <span className="ml-1 text-gray-500">unread</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <FaBell className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Alerts</p>
              <p className="text-xl font-bold">{alerts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <FaExclamationTriangle className="text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Safety Alerts</p>
              <p className="text-xl font-bold">{safetyCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
              <FaTools className="text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Maintenance Alerts</p>
              <p className="text-xl font-bold">{maintenanceCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <FaTachometerAlt className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Performance Updates</p>
              <p className="text-xl font-bold">{performanceCount}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center">
            <FaFilter className="text-gray-400 mr-2" />
            <span className="text-gray-700">Filter by:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                typeFilter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTypeFilter('all')}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                typeFilter === 'safety' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTypeFilter('safety')}
            >
              Safety
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                typeFilter === 'performance' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTypeFilter('performance')}
            >
              Performance
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                typeFilter === 'maintenance' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTypeFilter('maintenance')}
            >
              Maintenance
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                typeFilter === 'schedule' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTypeFilter('schedule')}
            >
              Schedule
            </button>
          </div>
          
          <div className="ml-auto flex items-center">
            <input
              type="checkbox"
              id="unread-filter"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={showUnreadOnly}
              onChange={() => setShowUnreadOnly(!showUnreadOnly)}
            />
            <label htmlFor="unread-filter" className="ml-2 text-sm text-gray-700">
              Show unread only
            </label>
          </div>
        </div>
      </div>
      
      {/* Alerts List */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading alerts...</p>
        </div>
      ) : filteredAlerts.length > 0 ? (
        <div className="space-y-4">
          {filteredAlerts.map(alert => (
            <AlertCard 
              key={alert.id} 
              alert={alert}
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-400 mb-4">
            <FaBell size={48} className="mx-auto opacity-25" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-1">No alerts found</h3>
          <p className="text-gray-600">
            {typeFilter !== 'all' || showUnreadOnly
              ? 'Try changing your filters to see more alerts'
              : 'You have no alerts at this time'}
          </p>
        </div>
      )}
      
      {filteredAlerts.length > 0 && filteredAlerts.length < alerts.length && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Showing {filteredAlerts.length} of {alerts.length} alerts
        </div>
      )}
      
      {/* Coming Soon section for analytics */}
      <div className="mt-10 bg-white rounded-lg shadow p-6 border border-dashed border-gray-300">
        <h2 className="text-xl font-semibold mb-4">Alert Analytics - Coming Soon</h2>
        <p className="text-gray-600 mb-4">
          This page will display detailed alerts about your driving performance. This feature is coming soon.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Safety Score Trends</h3>
            <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Alert Frequency</h3>
            <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Performance Improvement</h3>
            <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;