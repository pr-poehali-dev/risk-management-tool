
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip
} from 'recharts';

export type PieDataItem = {
  name: string;
  value: number;
  fill: string;
};

type AllocationChartProps = {
  pieData: PieDataItem[];
};

export const AllocationLegend: React.FC<{ pieData: PieDataItem[] }> = ({ pieData }) => {
  return (
    <div className="space-y-4">
      {pieData.map((item) => (
        <div key={item.name} className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.fill }}></div>
            <span>{item.name}</span>
          </div>
          <div className="font-medium">{item.value}%</div>
        </div>
      ))}
    </div>
  );
};

export const AllocationRecommendations: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-md">
      <h4 className="text-sm font-medium text-gray-300 mb-2">Рекомендации по оптимизации:</h4>
      <ul className="text-sm space-y-2">
        <li className="flex gap-2">
          <Icon name="ArrowRight" className="text-[#8B5CF6] flex-shrink-0" size={18} />
          <span>Увеличить долю облигаций до 35-40% для снижения волатильности</span>
        </li>
        <li className="flex gap-2">
          <Icon name="ArrowRight" className="text-[#8B5CF6] flex-shrink-0" size={18} />
          <span>Диверсифицировать валютную часть портфеля</span>
        </li>
      </ul>
    </div>
  );
};

const AllocationChart: React.FC<AllocationChartProps> = ({ pieData }) => {
  return (
    <Card className="bg-gray-700 border-gray-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Структура портфеля</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-center" style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  />
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-medium mb-4">Распределение по классам активов</h3>
            <AllocationLegend pieData={pieData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AllocationChart;
