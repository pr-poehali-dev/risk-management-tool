
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export type PerformanceDataPoint = {
  month: string;
  portfolio: number;
  benchmark: number;
  risk: number;
};

type PerformanceChartProps = {
  historyData: PerformanceDataPoint[];
};

export const PerformanceMetrics: React.FC<{
  portfolioReturn: number;
  benchmarkReturn: number;
  alpha: number;
  maxDrawdown: number;
}> = ({ portfolioReturn, benchmarkReturn, alpha, maxDrawdown }) => {
  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gray-800 p-3 rounded-md flex flex-col">
        <span className="text-sm text-gray-400">Доходность портфеля</span>
        <span className="text-xl font-bold text-green-400">+{portfolioReturn}%</span>
      </div>
      <div className="bg-gray-800 p-3 rounded-md flex flex-col">
        <span className="text-sm text-gray-400">Доходность бенчмарка</span>
        <span className="text-xl font-bold text-green-400">+{benchmarkReturn}%</span>
      </div>
      <div className="bg-gray-800 p-3 rounded-md flex flex-col">
        <span className="text-sm text-gray-400">Альфа</span>
        <span className="text-xl font-bold text-green-400">+{alpha}%</span>
      </div>
      <div className="bg-gray-800 p-3 rounded-md flex flex-col">
        <span className="text-sm text-gray-400">Максимальная просадка</span>
        <span className="text-xl font-bold text-red-400">-{maxDrawdown}%</span>
      </div>
    </div>
  );
};

export const VolatilityChart: React.FC<{ historyData: PerformanceDataPoint[] }> = ({ historyData }) => {
  return (
    <Card className="bg-gray-700 border-gray-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Анализ волатильности</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="month" stroke="#8E9196" />
              <YAxis stroke="#8E9196" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }} />
              <Line
                type="monotone"
                dataKey="risk"
                name="Волатильность"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

const PerformanceChart: React.FC<PerformanceChartProps> = ({ historyData }) => {
  return (
    <Card className="bg-gray-700 border-gray-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Сравнительная динамика доходности</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[350px]" config={{
          Портфель: { color: '#8B5CF6' },
          Бенчмарк: { color: '#3B82F6' }
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="month" stroke="#8E9196" />
              <YAxis stroke="#8E9196" />
              <ChartTooltip 
                content={<ChartTooltipContent />} 
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Портфель"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Бенчмарк"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
