import React from 'react';
import Link from 'next/link';
import { FaBell, FaAngleRight } from 'react-icons/fa';
import AlertCard from './AlertCard';
import { Alert } from '@/utils/alert-utils';

interface AlertsWidgetProps {
  alerts: Alert[];
  limit?: number;
}

const AlertsWidget: React.FC<AlertsWidgetProps> = ({ alerts, limit = 3 }) => {
  // Get only the most recent unread alerts
  const recentAlerts = [...alerts]
    .filter(alert => !alert.isRead)
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB.getTime() - dateA.getTime(); // Sort descending (newest first)
    })
    .slice(0, limit);

  // Count alerts by type
  const safetyCount = alerts.filter(alert => alert.type === 'safety' && !alert.isRead).length;
  const performanceCount = alerts.filter(alert => alert.type === 'performance' && !alert.isRead).length;
  const maintenanceCount = alerts.filter(alert => alert.type === 'maintenance' && !alert.isRead).length;
  const scheduleCount = alerts.filter(alert => alert.type === 'schedule' && !alert.isRead).length;

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FaBell className="text-blue-500 mr-2" />
          <h2 className="text-lg font-semibold">Recent Alerts</h2>
        </div>
        <Link 
          href="/dashboard/driver/alerts" 
          className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
        >
          View All <FaAngleRight className="ml-1" />
        </Link>
      </div>

      {/* Summary */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {safetyCount > 0 && (
          <div className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
            {safetyCount} Safety
          </div>
        )}
        {performanceCount > 0 && (
          <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
            {performanceCount} Performance
          </div>
        )}
        {maintenanceCount > 0 && (
          <div className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
            {maintenanceCount} Maintenance
          </div>
        )}
        {scheduleCount > 0 && (
          <div className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
            {scheduleCount} Schedule
          </div>
        )}
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {recentAlerts.length > 0 ? (
          recentAlerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            <FaBell className="mx-auto mb-2 opacity-25" size={24} />
            <p>No unread alerts</p>
          </div>
        )}
      </div>

      {recentAlerts.length > 0 && (
        <div className="mt-4 text-center">
          <Link 
            href="/dashboard/driver/alerts" 
            className="inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {alerts.filter(a => !a.isRead).length - recentAlerts.length > 0 
              ? `View ${alerts.filter(a => !a.isRead).length - recentAlerts.length} more alert${alerts.filter(a => !a.isRead).length - recentAlerts.length > 1 ? 's' : ''}` 
              : 'View all alerts'}
          </Link>
        </div>
      )}
    </div>
  );
};

export default AlertsWidget;