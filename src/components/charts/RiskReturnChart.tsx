
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from 'recharts';

export type RiskReturnDataPoint = {
  name: string;
  риск: number;
  доходность: number;
  размер: number;
};

type RiskReturnChartProps = {
  riskReturnData: RiskReturnDataPoint[];
};

export const RiskMetricsTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-400">Класс активов</th>
            <th className="py-2 px-4 text-right text-sm font-medium text-gray-400">Доля (%)</th>
            <th className="py-2 px-4 text-right text-sm font-medium text-gray-400">Доходность (%)</th>
            <th className="py-2 px-4 text-right text-sm font-medium text-gray-400">Риск (%)</th>
            <th className="py-2 px-4 text-right text-sm font-medium text-gray-400">Коэф. Шарпа</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-4 flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#8B5CF6] mr-2"></div>
              <span>Акции</span>
            </td>
            <td className="py-2 px-4 text-right">52</td>
            <td className="py-2 px-4 text-right text-green-400">12.5</td>
            <td className="py-2 px-4 text-right text-yellow-400">18.7</td>
            <td className="py-2 px-4 text-right">1.45</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-4 flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#3B82F6] mr-2"></div>
              <span>Облигации</span>
            </td>
            <td className="py-2 px-4 text-right">32</td>
            <td className="py-2 px-4 text-right text-green-400">5.2</td>
            <td className="py-2 px-4 text-right text-green-400">3.8</td>
            <td className="py-2 px-4 text-right">0.98</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 px-4 flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></div>
              <span>Валюта</span>
            </td>
            <td className="py-2 px-4 text-right">10</td>
            <td className="py-2 px-4 text-right text-green-400">3.8</td>
            <td className="py-2 px-4 text-right text-green-400">8.2</td>
            <td className="py-2 px-4 text-right">0.72</td>
          </tr>
          <tr>
            <td className="py-2 px-4 flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#F59E0B] mr-2"></div>
              <span>Другое</span>
            </td>
            <td className="py-2 px-4 text-right">6</td>
            <td className="py-2 px-4 text-right text-green-400">8.3</td>
            <td className="py-2 px-4 text-right text-yellow-400">15.5</td>
            <td className="py-2 px-4 text-right">1.12</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const RiskMetricsCards: React.FC = () => {
  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-gray-800 p-3 rounded-md flex flex-col">
        <span className="text-sm text-gray-400">Коэффициент Шарпа</span>
        <span className="text-xl font-bold">1.32</span>
      </div>
      <div className="bg-gray-800 p-3 rounded-md flex flex-col">
        <span className="text-sm text-gray-400">Коэффициент Сортино</span>
        <span className="text-xl font-bold">1.85</span>
      </div>
      <div className="bg-gray-800 p-3 rounded-md flex flex-col">
        <span className="text-sm text-gray-400">Бета</span>
        <span className="text-xl font-bold">0.85</span>
      </div>
    </div>
  );
};

const RiskReturnChart: React.FC<RiskReturnChartProps> = ({ riskReturnData }) => {
  return (
    <Card className="bg-gray-700 border-gray-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Карта риска/доходности</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis 
                type="number" 
                dataKey="риск" 
                name="Риск" 
                unit="%" 
                stroke="#8E9196"
                label={{ value: 'Риск (%)', position: 'bottom', fill: '#8E9196' }} 
              />
              <YAxis 
                type="number" 
                dataKey="доходность" 
                name="Доходность" 
                unit="%" 
                stroke="#8E9196"
                label={{ value: 'Доходность (%)', angle: -90, position: 'left', fill: '#8E9196' }} 
              />
              <ZAxis type="number" dataKey="размер" range={[60, 140]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }}
                formatter={(value: number) => `${value.toFixed(2)}%`} 
              />
              <Scatter name="Портфель" data={riskReturnData} fill="#8B5CF6" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RiskReturnChart;
