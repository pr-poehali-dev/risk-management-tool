
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import Icon from '@/components/ui/icon';
import { ru } from 'date-fns/locale';

const ReportGenerator = () => {
  const [reportType, setReportType] = useState('summary');
  const [format, setFormat] = useState('pdf');
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReports, setGeneratedReports] = useState([
    {
      id: 1,
      name: 'Ежемесячный отчет - Апрель 2025',
      date: '01.05.2025',
      type: 'summary',
      format: 'pdf',
      size: '1.2 МБ'
    },
    {
      id: 2,
      name: 'Квартальный отчет - Q1 2025',
      date: '05.04.2025',
      type: 'extended',
      format: 'xlsx',
      size: '3.5 МБ'
    },
    {
      id: 3,
      name: 'Годовой отчет - 2024',
      date: '15.01.2025',
      type: 'full',
      format: 'pdf',
      size: '5.8 МБ'
    }
  ]);

  // Включенные секции отчета
  const [includeSections, setIncludeSections] = useState({
    overview: true,
    performance: true,
    assets: true,
    risks: true,
    recommendations: true,
    forecast: false,
    taxAnalysis: false
  });

  const handleSectionToggle = (section: keyof typeof includeSections) => {
    setIncludeSections({
      ...includeSections,
      [section]: !includeSections[section]
    });
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Имитация запроса на генерацию отчета
    setTimeout(() => {
      const reportName = 
        reportType === 'summary' ? 'Краткий отчет' :
        reportType === 'extended' ? 'Расширенный отчет' :
        'Полный отчет';
      
      const newReport = {
        id: generatedReports.length + 1,
        name: `${reportName} - ${formatDate(new Date())}`,
        date: formatDate(new Date()),
        type: reportType,
        format,
        size: `${(Math.random() * 5 + 0.5).toFixed(1)} МБ`
      };
      
      setGeneratedReports([newReport, ...generatedReports]);
      setIsGenerating(false);
    }, 2000);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-medium flex items-center">
            <Icon name="FileText" className="mr-2 text-[#8B5CF6]" />
            Генератор отчетов
          </CardTitle>
          <CardDescription>Создание и выгрузка отчетов по портфелю</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Тип отчета</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Выберите тип отчета" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="summary">Краткий отчет</SelectItem>
                    <SelectItem value="extended">Расширенный отчет</SelectItem>
                    <SelectItem value="full">Полный отчет (с аналитикой)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Формат</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Выберите формат файла" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Дата начала</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start bg-gray-700 border-gray-600">
                        <Icon name="Calendar" className="mr-2 h-4 w-4" />
                        {fromDate ? formatDate(fromDate) : "Выберите дату"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600">
                      <Calendar
                        mode="single"
                        selected={fromDate}
                        onSelect={setFromDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>Дата окончания</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start bg-gray-700 border-gray-600">
                        <Icon name="Calendar" className="mr-2 h-4 w-4" />
                        {toDate ? formatDate(toDate) : "Выберите дату"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600">
                      <Calendar
                        mode="single"
                        selected={toDate}
                        onSelect={setToDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-md border border-gray-600">
              <h3 className="font-medium mb-3">Содержание отчета</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="overview"
                    checked={includeSections.overview}
                    onCheckedChange={() => handleSectionToggle('overview')}
                  />
                  <Label htmlFor="overview" className="text-sm">Обзор портфеля</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="performance"
                    checked={includeSections.performance}
                    onCheckedChange={() => handleSectionToggle('performance')}
                  />
                  <Label htmlFor="performance" className="text-sm">Анализ доходности</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="assets"
                    checked={includeSections.assets}
                    onCheckedChange={() => handleSectionToggle('assets')}
                  />
                  <Label htmlFor="assets" className="text-sm">Структура активов</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="risks"
                    checked={includeSections.risks}
                    onCheckedChange={() => handleSectionToggle('risks')}
                  />
                  <Label htmlFor="risks" className="text-sm">Оценка рисков</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recommendations"
                    checked={includeSections.recommendations}
                    onCheckedChange={() => handleSectionToggle('recommendations')}
                  />
                  <Label htmlFor="recommendations" className="text-sm">Рекомендации</Label>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="forecast"
                    checked={includeSections.forecast}
                    onCheckedChange={() => handleSectionToggle('forecast')}
                  />
                  <Label htmlFor="forecast" className="text-sm">Прогноз на будущие периоды</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="taxAnalysis"
                    checked={includeSections.taxAnalysis}
                    onCheckedChange={() => handleSectionToggle('taxAnalysis')}
                  />
                  <Label htmlFor="taxAnalysis" className="text-sm">Налоговый анализ</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            className="bg-[#8B5CF6] hover:bg-[#7E69AB]"
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                Генерация...
              </>
            ) : (
              <>
                <Icon name="FileDown" className="mr-2 h-4 w-4" />
                Создать отчет
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Icon name="History" className="mr-2 text-[#8B5CF6]" />
            История отчетов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-700 rounded-md border border-gray-600">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Название</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Дата</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Тип</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Формат</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Размер</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedReports.map((report) => (
                    <tr key={report.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Icon 
                            name={report.format === 'pdf' ? 'FileText' : 'Table'} 
                            className={`mr-2 ${report.format === 'pdf' ? 'text-red-400' : 'text-green-400'}`} 
                            size={16} 
                          />
                          <span>{report.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{report.date}</td>
                      <td className="py-3 px-4">
                        <span className={
                          report.type === 'summary' ? 'text-blue-400' :
                          report.type === 'extended' ? 'text-green-400' :
                          'text-purple-400'
                        }>
                          {report.type === 'summary' ? 'Краткий' :
                           report.type === 'extended' ? 'Расширенный' :
                           'Полный'}
                        </span>
                      </td>
                      <td className="py-3 px-4 uppercase text-gray-300">{report.format}</td>
                      <td className="py-3 px-4 text-gray-300">{report.size}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Icon name="Eye" size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400">
                            <Icon name="Download" size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400">
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Icon name="CalendarClock" className="mr-2 text-[#8B5CF6]" />
            Запланированные отчеты
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-700 p-4 rounded-md border border-gray-600 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center mr-4">
                <Icon name="CalendarClock" className="text-[#8B5CF6]" />
              </div>
              <div>
                <h3 className="font-medium">Ежемесячный отчет</h3>
                <p className="text-sm text-gray-400">Автоматическая генерация каждого 1-го числа месяца</p>
              </div>
            </div>
            <div className="flex items-center">
              <Badge className="mr-4 bg-green-900/30 text-green-400 border-green-800" variant="outline">
                Активно
              </Badge>
              <Button variant="outline" size="sm">
                Настроить
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Создаем компонент Badge для его использования
const Badge = ({ children, className, variant = "default" }: { 
  children: React.ReactNode; 
  className?: string;
  variant?: string; 
}) => {
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {children}
    </div>
  );
};

export default ReportGenerator;
