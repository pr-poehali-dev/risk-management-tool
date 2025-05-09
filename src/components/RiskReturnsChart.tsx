
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

// Импорт компонентов после рефакторинга
import PerformanceChart, { 
  PerformanceDataPoint, 
  PerformanceMetrics, 
  VolatilityChart 
} from './charts/PerformanceChart';
import RiskReturnChart, {
  RiskReturnDataPoint,
  RiskMetricsCards,
  RiskMetricsTable
} from './charts/RiskReturnChart';
import AllocationChart, {
  PieDataItem,
  AllocationRecommendations
} from './charts/AllocationChart';

// Временные интервалы для фильтрации данных
const TIME_INTERVALS = ['1M', '3M', '6M', '1Г', '3Г', '5Г', 'MAX'];

// Бенчмарки для сравнения
const BENCHMARKS = [
  { value: 'RTS', label: 'Индекс РТС' },
  { value: 'MOEX', label: 'Индекс ММВБ' },
  { value: 'SP500', label: 'S&P 500' },
  { value: 'NASDAQ', label: 'NASDAQ' },
  { value: 'EUROSTOXX', label: 'EURO STOXX 50' }
];

// Демо-данные для графиков
const historyData: PerformanceDataPoint[] = [
  { month: 'Янв', portfolio: 5.2, benchmark: 4.8, risk: 8.3 },
  { month: 'Фев', portfolio: 3.8, benchmark: 2.1, risk: 9.2 },
  { month: 'Мар', portfolio: -2.3, benchmark: -3.5, risk: 15.7 },
  { month: 'Апр', portfolio: 4.7, benchmark: 4.1, risk: 10.2 },
  { month: 'Май', portfolio: 2.9, benchmark: 2.4, risk: 7.5 },
  { month: 'Июн', portfolio: 6.1, benchmark: 5.3, risk: 9.1 },
  { month: 'Июл', portfolio: 1.8, benchmark: 2.2, risk: 6.8 },
  { month: 'Авг', portfolio: 3.5, benchmark: 3.3, risk: 8.0 },
  { month: 'Сен', portfolio: -1.2, benchmark: -0.8, risk: 12.3 },
  { month: 'Окт', portfolio: 4.2, benchmark: 3.9, risk: 10.8 },
  { month: 'Ноя', portfolio: 5.3, benchmark: 4.7, risk: 9.4 },
  { month: 'Дек', portfolio: 3.7, benchmark: 3.2, risk: 7.9 },
];

const riskReturnData: RiskReturnDataPoint[] = [
  { name: 'Портфель', риск: 12.7, доходность: 8.4, размер: 100 },
  { name: 'S&P 500', риск: 15.2, доходность: 9.8, размер: 80 },
  { name: 'РТС', риск: 20.5, доходность: 10.2, размер: 80 },
  { name: 'Облигации РФ', риск: 5.8, доходность: 5.1, размер: 80 },
  { name: 'Золото', риск: 18.3, доходность: 7.2, размер: 80 },
  { name: 'Биткойн', риск: 65.2, доходность: 28.7, размер: 80 },
];

const pieData: PieDataItem[] = [
  { name: 'Акции', value: 52, fill: '#8B5CF6' },
  { name: 'Облигации', value: 32, fill: '#3B82F6' },
  { name: 'Валюта', value: 10, fill: '#10B981' },
  { name: 'Другое', value: 6, fill: '#F59E0B' },
];

/**
 * Заголовок и элементы управления для анализа портфеля
 */
const AnalysisHeader: React.FC<{
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  benchmark: string;
  setBenchmark: (benchmark: string) => void;
}> = ({ selectedPeriod, setSelectedPeriod, benchmark, setBenchmark }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <CardTitle className="text-xl font-medium">Анализ портфеля</CardTitle>
        <CardDescription>Доходность и риски вашего портфеля</CardDescription>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="benchmark" className="text-sm">Бенчмарк:</Label>
          <Select value={benchmark} onValueChange={setBenchmark}>
            <SelectTrigger id="benchmark" className="w-36 h-9 bg-gray-700 border-gray-600">
              <SelectValue placeholder="Выберите индекс" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {BENCHMARKS.map(benchmark => (
                <SelectItem key={benchmark.value} value={benchmark.value}>
                  {benchmark.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center bg-gray-700 rounded-md p-1">
          {TIME_INTERVALS.map((interval) => (
            <Button
              key={interval}
              variant={selectedPeriod === interval ? 'default' : 'ghost'}
              className={`h-8 px-3 text-xs ${selectedPeriod === interval ? 'bg-[#8B5CF6]' : ''}`}
              onClick={() => setSelectedPeriod(interval)}
            >
              {interval}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Главный компонент для анализа рисков и доходности
 */
const RiskReturnsChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1Г');
  const [benchmark, setBenchmark] = useState('RTS');
  
  // Здесь можно добавить функции для фильтрации данных на основе выбранного периода

  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-2">
          <AnalysisHeader 
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            benchmark={benchmark}
            setBenchmark={setBenchmark}
          />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance" className="space-y-4">
            <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-gray-700 p-1 text-gray-400">
              <TabsTrigger value="performance" className="rounded-md px-3 py-1 text-sm font-medium">
                Динамика
              </TabsTrigger>
              <TabsTrigger value="risk" className="rounded-md px-3 py-1 text-sm font-medium">
                Риск/Доходность
              </TabsTrigger>
              <TabsTrigger value="allocation" className="rounded-md px-3 py-1 text-sm font-medium">
                Распределение
              </TabsTrigger>
            </TabsList>
            
            {/* Вкладка Динамика доходности */}
            <TabsContent value="performance" className="space-y-4">
              <PerformanceChart historyData={historyData} />
              <PerformanceMetrics 
                portfolioReturn={8.4} 
                benchmarkReturn={7.2} 
                alpha={1.2} 
                maxDrawdown={4.8}
              />
              <VolatilityChart historyData={historyData} />
            </TabsContent>
            
            {/* Вкладка Риск/Доходность */}
            <TabsContent value="risk" className="space-y-4">
              <RiskReturnChart riskReturnData={riskReturnData} />
              <RiskMetricsCards />
              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Статистика по классам активов</CardTitle>
                </CardHeader>
                <CardContent>
                  <RiskMetricsTable />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Вкладка Распределение */}
            <TabsContent value="allocation" className="space-y-4">
              <AllocationChart pieData={pieData} />
              <AllocationRecommendations />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskReturnsChart;
