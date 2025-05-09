
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

// Демо-данные для графиков
const portfolioData = [
  { name: 'Янв', Акции: 4000, Облигации: 2400, Валюта: 1000, Другое: 500 },
  { name: 'Фев', Акции: 4200, Облигации: 2600, Валюта: 900, Другое: 400 },
  { name: 'Мар', Акции: 3800, Облигации: 2800, Валюта: 950, Другое: 450 },
  { name: 'Апр', Акции: 4300, Облигации: 2700, Валюта: 1200, Другое: 600 },
  { name: 'Май', Акции: 4500, Облигации: 2500, Валюта: 1100, Другое: 550 },
  { name: 'Июн', Акции: 4800, Облигации: 2300, Валюта: 1000, Другое: 500 },
];

const riskData = [
  { name: 'Акции', риск: 85, доходность: 12 },
  { name: 'Облигации', риск: 40, доходность: 5 },
  { name: 'Валюта', риск: 60, доходность: 7 },
  { name: 'Другое', риск: 70, доходность: 9 },
];

const returnData = [
  { месяц: 'Янв', доходность: 2.8 },
  { месяц: 'Фев', доходность: 3.2 },
  { месяц: 'Мар', доходность: -1.5 },
  { месяц: 'Апр', доходность: 4.1 },
  { месяц: 'Май', доходность: 3.8 },
  { месяц: 'Июн', доходность: 5.2 },
];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Общая стоимость портфеля */}
      <Card className="bg-gray-800 border-gray-700 md:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl font-medium">Обзор портфеля</CardTitle>
            <CardDescription>Стоимость активов и динамика роста</CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
            +7.2% с начала года
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-4">₽ 3,762,458</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="colorAkcia" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOblig" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#8E9196" fontSize={12} />
              <YAxis stroke="#8E9196" fontSize={12} />
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }} />
              <Area type="monotone" dataKey="Акции" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorAkcia)" />
              <Area type="monotone" dataKey="Облигации" stroke="#3B82F6" fillOpacity={1} fill="url(#colorOblig)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Ключевые метрики */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Icon name="PieChart" className="mr-2 text-[#8B5CF6]" />
            Распределение активов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#8B5CF6] mr-2"></div>
                <span>Акции</span>
              </div>
              <div className="font-medium">52%</div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#3B82F6] mr-2"></div>
                <span>Облигации</span>
              </div>
              <div className="font-medium">32%</div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></div>
                <span>Валюта</span>
              </div>
              <div className="font-medium">10%</div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#F59E0B] mr-2"></div>
                <span>Другое</span>
              </div>
              <div className="font-medium">6%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Доходность по классам активов */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Icon name="TrendingUp" className="mr-2 text-[#8B5CF6]" />
            Доходность
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={returnData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="месяц" stroke="#8E9196" />
              <YAxis stroke="#8E9196" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }} />
              <Bar dataKey="доходность" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
          <div className="pt-4 text-center text-green-400 font-medium">
            Среднемесячная доходность: +2.93%
          </div>
        </CardContent>
      </Card>

      {/* Соотношение риск/доходность */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Icon name="AlertTriangle" className="mr-2 text-[#8B5CF6]" />
            Риск / Доходность
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[180px]" config={{
            Акции: { color: '#8B5CF6' },
            Облигации: { color: '#3B82F6' },
            Валюта: { color: '#10B981' },
            Другое: { color: '#F59E0B' }
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="name" stroke="#8E9196" />
                <YAxis stroke="#8E9196" />
                <ChartTooltip 
                  content={<ChartTooltipContent labelKey="name" />} 
                />
                <Line type="monotone" dataKey="риск" stroke="#EF4444" strokeWidth={2} dot={{ r: 5 }} name="Риск" />
                <Line type="monotone" dataKey="доходность" stroke="#10B981" strokeWidth={2} dot={{ r: 5 }} name="Доходность" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Ключевые показатели */}
      <Card className="bg-gray-800 border-gray-700 md:col-span-3">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Icon name="Activity" className="mr-2 text-[#8B5CF6]" />
            Ключевые показатели
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Альфа</p>
              <p className="text-2xl font-bold text-green-400">2.4%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Бета</p>
              <p className="text-2xl font-bold">0.85</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Волатильность</p>
              <p className="text-2xl font-bold text-yellow-500">12.7%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Коэф. Шарпа</p>
              <p className="text-2xl font-bold text-green-400">1.32</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
