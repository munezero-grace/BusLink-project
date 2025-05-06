'use client';

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface BusEfficiencyChartProps {
  data?: Array<{
    date: string;
    fuelEfficiency: number;
    ecoScore: number;
  }>;
}

const defaultData = [
  { date: 'Apr 2', fuelEfficiency: 8.5, ecoScore: 78 },
  { date: 'Apr 9', fuelEfficiency: 8.3, ecoScore: 80 },
  { date: 'Apr 16', fuelEfficiency: 8.1, ecoScore: 82 },
  { date: 'Apr 23', fuelEfficiency: 8.2, ecoScore: 81 },
  { date: 'Apr 30', fuelEfficiency: 7.9, ecoScore: 84 },
];

const BusEfficiencyChart: React.FC<BusEfficiencyChartProps> = ({ data = defaultData }) => {
  return (
    <div className="w-full h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="#4F46E5" />
          <YAxis yAxisId="right" orientation="right" stroke="#10B981" domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="fuelEfficiency"
            name="Fuel Efficiency (L/100km)"
            stroke="#4F46E5"
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="ecoScore"
            name="Eco Score"
            stroke="#10B981"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BusEfficiencyChart;
