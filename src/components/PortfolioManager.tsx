
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

// Демо-данные для активов портфеля
const portfolioAssets = [
  { id: 1, name: 'Акции Сбербанк', ticker: 'SBER', type: 'Акции', count: 150, price: 315.45, value: 47317.50, change: 2.35 },
  { id: 2, name: 'Акции Газпром', ticker: 'GAZP', type: 'Акции', count: 200, price: 172.37, value: 34474.00, change: -1.18 },
  { id: 3, name: 'ОФЗ 26220', ticker: 'SU26220RMFS9', type: 'Облигации', count: 15, price: 1012.55, value: 15188.25, change: 0.35 },
  { id: 4, name: 'Доллар США', ticker: 'USD', type: 'Валюта', count: 1000, price: 91.45, value: 91450.00, change: 0.75 },
  { id: 5, name: 'Акции Яндекс', ticker: 'YNDX', type: 'Акции', count: 30, price: 2850.00, value: 85500.00, change: 3.42 },
  { id: 6, name: 'Евро', ticker: 'EUR', type: 'Валюта', count: 500, price: 100.15, value: 50075.00, change: -0.22 },
  { id: 7, name: 'ВТБ Корпоративный', ticker: 'RU000A101RT5', type: 'Облигации', count: 10, price: 1067.30, value: 10673.00, change: 0.12 },
];

// Типы активов
const assetTypes = ['Акции', 'Облигации', 'Валюта', 'Другое'];

const PortfolioManager = () => {
  const [assets, setAssets] = useState(portfolioAssets);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [newAsset, setNewAsset] = useState({
    name: '',
    ticker: '',
    type: 'Акции',
    count: '',
    price: ''
  });

  // Фильтрация активов по поисковому запросу
  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    asset.ticker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Расчет общей стоимости портфеля
  const totalValue = assets.reduce((total, asset) => total + asset.value, 0);

  // Обработчик для добавления нового актива
  const handleAddAsset = () => {
    if (!newAsset.name || !newAsset.ticker || !newAsset.count || !newAsset.price) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const count = parseFloat(newAsset.count as string);
    const price = parseFloat(newAsset.price as string);
    
    const asset = {
      id: assets.length + 1,
      name: newAsset.name,
      ticker: newAsset.ticker,
      type: newAsset.type,
      count,
      price,
      value: count * price,
      change: 0
    };

    setAssets([...assets, asset]);
    setOpenAdd(false);
    setNewAsset({
      name: '',
      ticker: '',
      type: 'Акции',
      count: '',
      price: ''
    });
  };

  // Обработчик для удаления актива
  const handleDeleteAsset = (id: number) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl font-medium">Управление портфелем</CardTitle>
            <CardDescription>Добавление, редактирование и мониторинг активов</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-400">
              Общая стоимость:
              <span className="ml-2 font-bold text-white">₽ {totalValue.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-72">
              <Input
                className="bg-gray-700 border-gray-600 pl-9"
                placeholder="Поиск по активам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Icon 
                name="Search" 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                size={16} 
              />
            </div>
            <Dialog open={openAdd} onOpenChange={setOpenAdd}>
              <DialogTrigger asChild>
                <Button className="bg-[#8B5CF6] hover:bg-[#7E69AB]" size="sm">
                  <Icon name="Plus" className="mr-1" size={16} />
                  Добавить актив
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700">
                <DialogHeader>
                  <DialogTitle>Добавить новый актив</DialogTitle>
                  <DialogDescription>Введите информацию о новом активе для портфеля</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="asset-name" className="text-right">Название</Label>
                    <Input
                      id="asset-name"
                      className="col-span-3 bg-gray-700 border-gray-600"
                      value={newAsset.name}
                      onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="asset-ticker" className="text-right">Тикер</Label>
                    <Input
                      id="asset-ticker"
                      className="col-span-3 bg-gray-700 border-gray-600"
                      value={newAsset.ticker}
                      onChange={(e) => setNewAsset({...newAsset, ticker: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="asset-type" className="text-right">Тип</Label>
                    <Select 
                      value={newAsset.type} 
                      onValueChange={(value) => setNewAsset({...newAsset, type: value})}
                    >
                      <SelectTrigger id="asset-type" className="col-span-3 bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Выберите тип актива" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {assetTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="asset-count" className="text-right">Количество</Label>
                    <Input
                      id="asset-count"
                      type="number"
                      className="col-span-3 bg-gray-700 border-gray-600"
                      value={newAsset.count}
                      onChange={(e) => setNewAsset({...newAsset, count: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="asset-price" className="text-right">Цена (₽)</Label>
                    <Input
                      id="asset-price"
                      type="number"
                      className="col-span-3 bg-gray-700 border-gray-600"
                      value={newAsset.price}
                      onChange={(e) => setNewAsset({...newAsset, price: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenAdd(false)}>Отмена</Button>
                  <Button className="bg-[#8B5CF6] hover:bg-[#7E69AB]" onClick={handleAddAsset}>Добавить</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader className="bg-gray-900">
                <TableRow>
                  <TableHead>Название / Тикер</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead className="text-right">Количество</TableHead>
                  <TableHead className="text-right">Цена (₽)</TableHead>
                  <TableHead className="text-right">Стоимость (₽)</TableHead>
                  <TableHead className="text-right">Изменение</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((asset) => (
                    <TableRow key={asset.id} className="hover:bg-gray-700/50">
                      <TableCell>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-sm text-gray-400">{asset.ticker}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          asset.type === 'Акции' ? 'border-purple-500 text-purple-400' :
                          asset.type === 'Облигации' ? 'border-blue-500 text-blue-400' :
                          asset.type === 'Валюта' ? 'border-green-500 text-green-400' :
                          'border-yellow-500 text-yellow-400'
                        }>
                          {asset.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{asset.count.toLocaleString('ru-RU')}</TableCell>
                      <TableCell className="text-right">{asset.price.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                      <TableCell className="text-right font-medium">{asset.value.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                      <TableCell className="text-right">
                        <span className={asset.change > 0 ? 'text-green-400' : asset.change < 0 ? 'text-red-400' : 'text-gray-400'}>
                          {asset.change > 0 ? '+' : ''}{asset.change}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Icon name="Edit2" size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:text-red-400"
                            onClick={() => handleDeleteAsset(asset.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-400">
                      Активы не найдены. Попробуйте изменить поисковый запрос или добавьте новый актив.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Icon name="TrendingUp" className="mr-2 text-[#8B5CF6]" />
            Рекомендации по оптимизации портфеля
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-900/20 rounded-md border border-green-800/30">
              <div className="flex items-start">
                <Icon name="TrendingUp" className="text-green-400 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-400">Увеличить долю акций технологического сектора</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Для повышения доходности портфеля рекомендуется увеличить долю акций технологического сектора на 3-5%. 
                    Ожидаемый прирост: +1.2% к годовой доходности.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-900/20 rounded-md border border-yellow-800/30">
              <div className="flex items-start">
                <Icon name="AlertTriangle" className="text-yellow-400 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-400">Высокая концентрация в акциях "Яндекс"</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Доля акций "Яндекс" составляет 25% от стоимости всего портфеля. 
                    Для снижения риска рекомендуется уменьшить позицию до 15-20%.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-900/20 rounded-md border border-blue-800/30">
              <div className="flex items-start">
                <Icon name="Shield" className="text-blue-400 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-400">Диверсификация валютных активов</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Рекомендуется добавить в портфель активы, номинированные в юанях или швейцарских франках,
                    для снижения валютных рисков и улучшения диверсификации.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioManager;
