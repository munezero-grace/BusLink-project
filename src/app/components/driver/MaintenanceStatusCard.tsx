'use client';

import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaWrench, FaOilCan, FaTachometerAlt, FaRoad } from 'react-icons/fa';

interface MaintenanceItem {
  id: number;
  title: string;
  status: 'good' | 'warning' | 'critical';
  icon: React.ReactNode;
  value: string;
  nextDue?: string;
}

interface MaintenanceStatusCardProps {
  items?: MaintenanceItem[];
}

const defaultItems: MaintenanceItem[] = [
  {
    id: 1,
    title: 'Engine Oil',
    status: 'good',
    icon: <FaOilCan />,
    value: '80%',
    nextDue: '1,500 km',
  },
  {
    id: 2,
    title: 'Brake Pads',
    status: 'warning',
    icon: <FaTachometerAlt />,
    value: '30%',
    nextDue: '700 km',
  },
  {
    id: 3,
    title: 'Air Filter',
    status: 'good',
    icon: <FaWrench />,
    value: '85%',
    nextDue: '2,000 km',
  },
  {
    id: 4,
    title: 'Tire Tread',
    status: 'good',
    icon: <FaRoad />,
    value: '75%',
    nextDue: '5,000 km',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'good':
      return 'text-green-500';
    case 'warning':
      return 'text-yellow-500';
    case 'critical':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'good':
      return <FaCheckCircle className="text-green-500" />;
    case 'warning':
      return <FaExclamationTriangle className="text-yellow-500" />;
    case 'critical':
      return <FaExclamationTriangle className="text-red-500" />;
    default:
      return null;
  }
};

const MaintenanceStatusCard: React.FC<MaintenanceStatusCardProps> = ({ items = defaultItems }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Maintenance Status</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-full mr-3 ${getStatusColor(item.status)} bg-opacity-20`}>
                {item.icon}
              </div>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">Next check: {item.nextDue}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className={`font-bold mr-2 ${getStatusColor(item.status)}`}>{item.value}</p>
              {getStatusIcon(item.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceStatusCard;
