import React from 'react';
import { 
  FaBell, 
  FaExclamationTriangle, 
  FaTachometerAlt, 
  FaTools, 
  FaCalendarDay,
  FaTimes
} from 'react-icons/fa';

// Import the alert type
import { 
  Alert, 
  getAlertTypeBgColor,
  getAlertSeverityColor
} from '@/utils/alert-utils';

interface AlertCardProps {
  alert: Alert;
  onMarkAsRead?: (id: number) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onMarkAsRead }) => {
  // Get alert icon based on type
  const getAlertIcon = () => {
    switch (alert.type) {
      case 'safety':
        return <FaExclamationTriangle className="text-red-500" />;
      case 'performance':
        return <FaTachometerAlt className="text-blue-500" />;
      case 'maintenance':
        return <FaTools className="text-yellow-500" />;
      case 'schedule':
        return <FaCalendarDay className="text-purple-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  // Get border color based on alert type and read status
  const getBorderColor = () => {
    if (alert.isRead) return 'border-gray-200';
    
    switch (alert.type) {
      case 'safety':
        return 'border-red-500';
      case 'performance':
        return 'border-blue-500';
      case 'maintenance':
        return 'border-yellow-500';
      case 'schedule':
        return 'border-purple-500';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow p-4 border-l-4 transition-all ${getBorderColor()}`}>
      <div className="flex items-start">
        <div className={`p-2 rounded-full ${getAlertTypeBgColor(alert.type)} mr-4`}>
          {getAlertIcon()}
        </div>
        
        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{alert.title}</h3>
              <p className="text-gray-600 mt-1">{alert.description}</p>
            </div>
            {!alert.isRead && onMarkAsRead && (
              <button
                onClick={() => onMarkAsRead(alert.id)}
                className="text-gray-400 hover:text-gray-600"
                title="Mark as read"
              >
                <FaTimes />
              </button>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="text-sm text-gray-500">
              {alert.date} at {alert.time}
            </div>
            <div>
              <span className={`px-2 py-1 text-xs rounded-full ${getAlertSeverityColor(alert.severity)}`}>
                {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
              </span>
              {!alert.isRead && (
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                  New
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;