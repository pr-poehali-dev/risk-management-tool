
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
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
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from 'recharts';

// Демо-данные для графиков
const historyData = [
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

const riskReturnData = [
  { name: 'Портфель', риск: 12.7, доходность: 8.4, размер: 100 },
  { name: 'S&P 500', риск: 15.2, доходность: 9.8, размер: 80 },
  { name: 'РТС', риск: 20.5, доходность: 10.2, размер: 80 },
  { name: 'Облигации РФ', риск: 5.8, доходность: 5.1, размер: 80 },
  { name: 'Золото', риск: 18.3, доходность: 7.2, размер: 80 },
  { name: 'Биткойн', риск: 65.2, доходность: 28.7, размер: 80 },
];

const pieData = [
  { name: 'Акции', value: 52, fill: '#8B5CF6' },
  { name: 'Облигации', value: 32, fill: '#3B82F6' },
  { name: 'Валюта', value: 10, fill: '#10B981' },
  { name: 'Другое', value: 6, fill: '#F59E0B' },
];

const timeIntervals = ['1M', '3M', '6M', '1Г', '3Г', '5Г', 'MAX'];

const RiskReturnsChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1Г');
  const [benchmark, setBenchmark] = useState('RTS');
  
  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-2">
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
                    <SelectItem value="RTS">Индекс РТС</SelectItem>
                    <SelectItem value="MOEX">Индекс ММВБ</SelectItem>
                    <SelectItem value="SP500">S&P 500</SelectItem>
                    <SelectItem value="NASDAQ">NASDAQ</SelectItem>
                    <SelectItem value="EUROSTOXX">EURO STOXX 50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center bg-gray-700 rounded-md p-1">
                {timeIntervals.map((interval) => (
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
            
            <TabsContent value="performance" className="space-y-4">
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
                  
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800 p-3 rounded-md flex flex-col">
                      <span className="text-sm text-gray-400">Доходность портфеля</span>
                      <span className="text-xl font-bold text-green-400">+8.4%</span>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-md flex flex-col">
                      <span className="text-sm text-gray-400">Доходность бенчмарка</span>
                      <span className="text-xl font-bold text-green-400">+7.2%</span>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-md flex flex-col">
                      <span className="text-sm text-gray-400">Альфа</span>
                      <span className="text-xl font-bold text-green-400">+1.2%</span>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-md flex flex-col">
                      <span className="text-sm text-gray-400">Максимальная просадка</span>
                      <span className="text-xl font-bold text-red-400">-4.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
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
            </TabsContent>
            
            <TabsContent value="risk" className="space-y-4">
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
                </CardContent>
              </Card>
              
              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Статистика по классам активов</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="allocation" className="space-y-4">
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
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-[#8B5CF6] mr-2"></div>
                            <span>Акции</span>
                          </div>
                          <div className="font-medium">52%</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-[#3B82F6] mr-2"></div>
                            <span>Облигации</span>
                          </div>
                          <div className="font-medium">32%</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-[#10B981] mr-2"></div>
                            <span>Валюта</span>
                          </div>
                          <div className="font-medium">10%</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-[#F59E0B] mr-2"></div>
                            <span>Другое</span>
                          </div>
                          <div className="font-medium">6%</div>
                        </div>
                      </div>
                      
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskReturnsChart;
