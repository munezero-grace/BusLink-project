// Alert Type Definitions
export type AlertType = 'safety' | 'performance' | 'maintenance' | 'schedule';
export type AlertSeverity = 'high' | 'medium' | 'low';

export interface Alert {
  id: number;
  type: AlertType;
  title: string;
  description: string;
  date: string;
  time: string;
  severity: AlertSeverity;
  isRead: boolean;
}

// Helper functions for alert visuals
export const getAlertTypeLabel = (type: AlertType): string => {
  switch (type) {
    case 'safety':
      return 'Safety Alert';
    case 'performance':
      return 'Performance Update';
    case 'maintenance':
      return 'Maintenance';
    case 'schedule':
      return 'Schedule Change';
    default:
      return 'Alert';
  }
};

export const getAlertTypeColor = (type: AlertType): string => {
  switch (type) {
    case 'safety':
      return 'text-red-500';
    case 'performance':
      return 'text-blue-500';
    case 'maintenance':
      return 'text-yellow-500';
    case 'schedule':
      return 'text-purple-500';
    default:
      return 'text-gray-500';
  }
};

export const getAlertTypeBgColor = (type: AlertType): string => {
  switch (type) {
    case 'safety':
      return 'bg-red-100';
    case 'performance':
      return 'bg-blue-100';
    case 'maintenance':
      return 'bg-yellow-100';
    case 'schedule':
      return 'bg-purple-100';
    default:
      return 'bg-gray-100';
  }
};

export const getAlertSeverityLabel = (severity: AlertSeverity): string => {
  switch (severity) {
    case 'high':
      return 'High Priority';
    case 'medium':
      return 'Medium Priority';
    case 'low':
      return 'Low Priority';
    default:
      return 'Unknown Priority';
  }
};

export const getAlertSeverityColor = (severity: AlertSeverity): string => {
  switch (severity) {
    case 'high':
      return 'text-red-800 bg-red-100';
    case 'medium':
      return 'text-yellow-800 bg-yellow-100';
    case 'low':
      return 'text-green-800 bg-green-100';
    default:
      return 'text-gray-800 bg-gray-100';
  }
};

// Format date for display
export const formatAlertDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Get time passed since alert was created (for "x hours ago" display)
export const getTimeSinceAlert = (dateString: string, timeString: string): string => {
  const now = new Date();
  const alertDateTime = new Date(`${dateString} ${timeString}`);
  
  const diffInMilliseconds = now.getTime() - alertDateTime.getTime();
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  
  if (diffInHours >= 24) {
    const days = Math.floor(diffInHours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  
  if (diffInHours >= 1) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  if (diffInMinutes >= 1) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  return 'Just now';
};

// Mock alert data generation (for demo purposes)
export const generateMockAlerts = (count: number): Alert[] => {
  const types: AlertType[] = ['safety', 'performance', 'maintenance', 'schedule'];
  const severities: AlertSeverity[] = ['high', 'medium', 'low'];
  
  const safetyTitles = [
    'Sudden Braking Detected',
    'Speeding Alert',
    'Sharp Turn Warning',
    'Tailgating Detected',
    'Lane Departure Warning'
  ];
  
  const performanceTitles = [
    'Fuel Efficiency Improvement',
    'On-Time Performance Recognition',
    'Smooth Driving Achievement',
    'Passenger Rating Increase',
    'Optimal Route Selection'
  ];
  
  const maintenanceTitles = [
    'Tire Pressure Warning',
    'Oil Change Due',
    'Engine Check Required',
    'Brake System Inspection',
    'Scheduled Maintenance'
  ];
  
  const scheduleTitles = [
    'Route Change Notification',
    'Schedule Update',
    'Shift Assignment',
    'Special Event Transport',
    'Holiday Schedule Change'
  ];
  
  const alerts: Alert[] = [];
  
  for (let i = 1; i <= count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    
    let title = '';
    switch (type) {
      case 'safety':
        title = safetyTitles[Math.floor(Math.random() * safetyTitles.length)];
        break;
      case 'performance':
        title = performanceTitles[Math.floor(Math.random() * performanceTitles.length)];
        break;
      case 'maintenance':
        title = maintenanceTitles[Math.floor(Math.random() * maintenanceTitles.length)];
        break;
      case 'schedule':
        title = scheduleTitles[Math.floor(Math.random() * scheduleTitles.length)];
        break;
    }
    
    // Generate a random date within the last 7 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 7));
    const dateString = date.toISOString().split('T')[0];
    
    // Generate a random time
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    const period = Math.random() > 0.5 ? 'AM' : 'PM';
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    
    alerts.push({
      id: i,
      type,
      title,
      description: `This is a sample ${type} alert description. In a real application, this would contain detailed information about the ${type} issue.`,
      date: dateString,
      time: timeString,
      severity,
      isRead: Math.random() > 0.7 // 30% chance of being unread
    });
  }
  
  return alerts;
};