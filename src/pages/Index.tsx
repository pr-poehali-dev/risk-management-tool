
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Dashboard from '@/components/Dashboard';
import PortfolioManager from '@/components/PortfolioManager';
import RiskReturnsChart from '@/components/RiskReturnsChart';
import ReportGenerator from '@/components/ReportGenerator';
import { buttonVariants } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-[#F6F6F7] flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="BarChart2" className="text-[#8B5CF6] h-6 w-6" />
            <h1 className="text-xl font-bold font-serif">Инвестиционный анализатор</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "gap-2")}>
              <Icon name="HelpCircle" size={16} />
              <span>Справка</span>
            </a>
            <a href="#" className={cn(buttonVariants({ variant: 'default', size: 'sm' }), "bg-[#8B5CF6] hover:bg-[#7E69AB] gap-2")}>
              <Icon name="User" size={16} />
              <span>Профиль</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Система анализа инвестиционного портфеля</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-4 gap-2">
                <TabsTrigger value="dashboard" className="gap-2">
                  <Icon name="LayoutDashboard" size={16} />
                  <span>Дашборд</span>
                </TabsTrigger>
                <TabsTrigger value="portfolio" className="gap-2">
                  <Icon name="Briefcase" size={16} />
                  <span>Портфель</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="gap-2">
                  <Icon name="TrendingUp" size={16} />
                  <span>Аналитика</span>
                </TabsTrigger>
                <TabsTrigger value="reports" className="gap-2">
                  <Icon name="FileText" size={16} />
                  <span>Отчеты</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="space-y-4 animate-fade-in">
                <Dashboard />
              </TabsContent>
              
              <TabsContent value="portfolio" className="space-y-4 animate-fade-in">
                <PortfolioManager />
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4 animate-fade-in">
                <RiskReturnsChart />
              </TabsContent>
              
              <TabsContent value="reports" className="space-y-4 animate-fade-in">
                <ReportGenerator />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 p-4 text-center text-gray-500 text-sm">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Система оценки и управления инвестиционными рисками</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
