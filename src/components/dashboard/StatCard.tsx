
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  trend,
  className,
}) => {
  return (
    <div className={cn("bg-white p-6 rounded-xl shadow-sm border border-gray-100", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {change && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-xs font-medium",
                trend === 'up' && "text-emerald-600",
                trend === 'down' && "text-red-600",
                trend === 'neutral' && "text-gray-600"
              )}>
                {change}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-2 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
