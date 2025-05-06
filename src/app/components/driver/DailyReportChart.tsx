import React from 'react';

interface BarData {
  day: string;
  data: {
    [key: string]: number;
  };
}

interface AlertLegend {
  type: string;
  count: number;
  color: string;
}

interface DailyReportChartProps {
  data: BarData[];
  legends: AlertLegend[];
  highlightedDay?: number; // 0-6 index of the day to highlight
}

const DailyReportChart: React.FC<DailyReportChartProps> = ({ 
  data, 
  legends,
  highlightedDay = 6  // Default to Saturday (last day)
}) => {
  // Find the maximum total value for scaling
  const maxValue = data.reduce((max, day) => {
    const dayTotal = Object.values(day.data).reduce((sum, val) => sum + val, 0);
    return Math.max(max, dayTotal);
  }, 0);
  
  // Create empty data structure if no data provided (for testing)
  if (data.length === 0) {
    data = [
      { day: 'S', data: {} },
      { day: 'M', data: {} },
      { day: 'T', data: {} },
      { day: 'W', data: {} },
      { day: 'T', data: {} },
      { day: 'F', data: {} },
      { day: 'S', data: {} },
    ];
  }
  
  return (
    <div className="w-full">
      {/* Day headings */}
      <div className="grid grid-cols-7 gap-2 border-b pb-4 mb-6">
        {data.map((day, index) => (
          <div 
            key={index} 
            className={`text-center font-medium ${
              index === highlightedDay 
                ? 'text-blue-600' 
                : 'text-gray-600'
            }`}
          >
            {day.day}
          </div>
        ))}
      </div>
      
      {/* Chart area */}
      <div className="h-64 w-full mb-6">
        <div className="flex h-full items-end justify-between">
          {data.map((day, dayIndex) => {
            // Calculate total alerts for this day
            const alertsForDay = Object.values(day.data).reduce((sum, val) => sum + val, 0);
            
            // Scale height based on max value
            const heightPercentage = maxValue > 0 ? (alertsForDay / maxValue) * 100 : 0;
            
            return (
              <div key={dayIndex} className="flex-1 flex flex-col items-center justify-end h-full">
                {/* Stacked bar for the day */}
                <div 
                  className={`w-4 flex flex-col-reverse ${
                    dayIndex === highlightedDay ? 'opacity-100' : 'opacity-70'
                  }`}
                  style={{ height: `${heightPercentage}%` }}
                >
                  {/* Generate bar segments for each alert type */}
                  {legends.map((legend, legendIndex) => {
                    const alertCount = day.data[legend.type] || 0;
                    const alertPercentage = alertsForDay > 0 
                      ? (alertCount / alertsForDay) * 100 
                      : 0;
                    
                    return alertCount > 0 ? (
                      <div 
                        key={legendIndex}
                        className="w-full"
                        style={{ 
                          backgroundColor: legend.color,
                          height: `${alertPercentage}%`
                        }}
                      ></div>
                    ) : null;
                  })}
                </div>
                
                {/* Day alert count below the bar */}
                {dayIndex === highlightedDay && alertsForDay > 0 && (
                  <div className="text-xs font-medium text-gray-500 mt-2">
                    {alertsForDay}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-4">
        {legends.map((legend, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-4 h-4 mr-2 rounded-sm" 
              style={{ backgroundColor: legend.color }}
            ></div>
            <span className="text-sm">{legend.type} -{legend.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyReportChart;