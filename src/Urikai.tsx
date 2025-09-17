import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Player {
  id: string;
  name: string;
  money: number;
  items: Item[];
}

interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface Shop {
  id: string;
  name: string;
  emoji: string;
  color: string;
  items: Item[];
}

const Urikai = () => {
  const [player, setPlayer] = useState<Player>({
    id: 'player1',
    name: 'あなた',
    money: 10000,
    items: []
  });

  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [gameMessage, setGameMessage] = useState<string>('商店街で買い物を楽しもう！');

  const shops: Shop[] = [
    {
      id: 'bakery',
      name: 'パン屋',
      emoji: '🍞',
      color: '#FFD700',
      items: [
        { id: 'bread', name: 'パン', price: 200, category: 'food' },
        { id: 'croissant', name: 'クロワッサン', price: 300, category: 'food' },
        { id: 'cake', name: 'ケーキ', price: 500, category: 'food' }
      ]
    },
    {
      id: 'bookstore',
      name: '本屋',
      emoji: '📚',
      color: '#4169E1',
      items: [
        { id: 'novel', name: '小説', price: 800, category: 'book' },
        { id: 'manga', name: '漫画', price: 600, category: 'book' },
        { id: 'textbook', name: '教科書', price: 1200, category: 'book' }
      ]
    },
    {
      id: 'flower',
      name: '花屋',
      emoji: '🌸',
      color: '#FF69B4',
      items: [
        { id: 'rose', name: 'バラ', price: 400, category: 'flower' },
        { id: 'tulip', name: 'チューリップ', price: 300, category: 'flower' },
        { id: 'bouquet', name: '花束', price: 1000, category: 'flower' }
      ]
    },
    {
      id: 'cafe',
      name: 'カフェ',
      emoji: '☕',
      color: '#8B4513',
      items: [
        { id: 'coffee', name: 'コーヒー', price: 400, category: 'drink' },
        { id: 'tea', name: '紅茶', price: 350, category: 'drink' },
        { id: 'latte', name: 'ラテ', price: 500, category: 'drink' }
      ]
    },
    {
      id: 'grocery',
      name: '八百屋',
      emoji: '🥬',
      color: '#32CD32',
      items: [
        { id: 'apple', name: 'りんご', price: 150, category: 'fruit' },
        { id: 'carrot', name: 'にんじん', price: 100, category: 'vegetable' },
        { id: 'tomato', name: 'トマト', price: 200, category: 'vegetable' }
      ]
    },
    {
      id: 'pharmacy',
      name: '薬局',
      emoji: '💊',
      color: '#00CED1',
      items: [
        { id: 'medicine', name: '風邪薬', price: 600, category: 'medicine' },
        { id: 'vitamin', name: 'ビタミン', price: 800, category: 'medicine' },
        { id: 'bandage', name: '絆創膏', price: 300, category: 'medicine' }
      ]
    }
  ];

  const handleShopClick = (shop: Shop) => {
    setSelectedShop(shop);
  };

  const handlePurchase = (item: Item) => {
    if (player.money >= item.price) {
      setPlayer(prev => ({
        ...prev,
        money: prev.money - item.price,
        items: [...prev.items, item]
      }));
      setGameMessage(`${item.name}を購入しました！`);
      setSelectedShop(null);
    } else {
      setGameMessage('お金が足りません！');
    }
  };

  const handleSell = (item: Item, index: number) => {
    const sellPrice = Math.floor(item.price * 0.7); // 70%の価格で売却
    setPlayer(prev => ({
      ...prev,
      money: prev.money + sellPrice,
      items: prev.items.filter((_, i) => i !== index)
    }));
    setGameMessage(`${item.name}を${sellPrice}円で売却しました！`);
  };

  return (
    <div className="min-h-screen bg-apple-gray-50 font-sf">
      {/* ヘッダー */}
      <header className="backdrop-blur-apple bg-white/90 border-b border-apple-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏪</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-apple-gray-900 tracking-tight">
                  売買ゲーム
                </h1>
                <p className="text-sm text-apple-gray-600 font-medium">Trading Game</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-apple shadow-apple">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">💰</span>
                  <span className="font-bold text-lg">
                    ¥{player.money.toLocaleString()}
                  </span>
                </div>
              </div>
              <Link
                to="/"
                className="bg-apple-gray-200 hover:bg-apple-gray-300 text-apple-gray-700 hover:text-apple-gray-900 font-medium py-2 px-4 rounded-apple transition-all duration-200 shadow-apple hover:shadow-apple-hover transform hover:scale-105"
              >
                ← 戻る
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ゲームメッセージ */}
        <div className="bg-white/80 backdrop-blur-apple border border-apple-gray-200 rounded-apple-lg p-6 mb-8 shadow-apple">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-lg">💬</span>
            </div>
            <p className="text-lg font-medium text-apple-gray-800">
              {gameMessage}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* 商店街エリア */}
          <div className="xl:col-span-3">
            <div className="bg-white/80 backdrop-blur-apple border border-apple-gray-200 rounded-apple-lg p-8 shadow-apple">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🏬</span>
                  </div>
                  <h2 className="text-2xl font-bold text-apple-gray-900 tracking-tight">
                    商店街
                  </h2>
                </div>
                <div className="text-sm text-apple-gray-600 font-medium">
                  {shops.length} 店舗営業中
                </div>
              </div>
              
              {/* 商店グリッド */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {shops.map(shop => {
                  const getShopColorClasses = (color: string) => {
                    const colorMap: {[key: string]: string} = {
                      '#FFD700': 'from-yellow-400 to-amber-500',
                      '#4169E1': 'from-blue-400 to-indigo-600', 
                      '#FF69B4': 'from-pink-400 to-rose-500',
                      '#8B4513': 'from-amber-600 to-orange-700',
                      '#32CD32': 'from-green-400 to-emerald-600',
                      '#00CED1': 'from-cyan-400 to-teal-600'
                    };
                    return colorMap[color] || 'from-gray-400 to-gray-600';
                  };
                  
                  return (
                    <div
                      key={shop.id}
                      className="group relative bg-white hover:bg-apple-gray-50 border border-apple-gray-200 rounded-apple-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] shadow-apple hover:shadow-apple-hover"
                      onClick={() => handleShopClick(shop)}
                    >
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className={`w-16 h-16 bg-gradient-to-br ${getShopColorClasses(shop.color)} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                          <span className="text-3xl">{shop.emoji}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-apple-gray-900 mb-1">{shop.name}</h3>
                          <p className="text-sm text-apple-gray-600 font-medium">
                            {shop.items.length} 商品
                          </p>
                        </div>
                        <div className="absolute top-3 right-3 w-6 h-6 text-apple-gray-400 group-hover:text-apple-blue transition-colors">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* プレイヤー情報・所持品 */}
          <div className="xl:col-span-1">
            <div className="bg-white/80 backdrop-blur-apple border border-apple-gray-200 rounded-apple-lg p-6 shadow-apple">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">👤</span>
                </div>
                <h3 className="text-xl font-bold text-apple-gray-900">
                  所持品
                </h3>
              </div>
              
              <div className="mb-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-apple shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">残高</p>
                      <p className="text-2xl font-bold">
                        ¥{player.money.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-3xl opacity-80">
                      💰
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {player.items.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4 opacity-30">🛍️</div>
                    <p className="text-apple-gray-500 font-medium">
                      まだ商品を購入していません
                    </p>
                  </div>
                ) : (
                  player.items.map((item, index) => {
                    const getCategoryIcon = (category: string) => {
                      const icons: {[key: string]: string} = {
                        food: '🍞',
                        book: '📚', 
                        flower: '🌸',
                        drink: '☕',
                        fruit: '🍎',
                        vegetable: '🥬',
                        medicine: '💊'
                      };
                      return icons[category] || '📦';
                    };
                    
                    return (
                      <div
                        key={`${item.id}-${index}`}
                        className="bg-apple-gray-50 hover:bg-white border border-apple-gray-200 rounded-apple p-4 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-apple-gray-200">
                              <span className="text-lg">{getCategoryIcon(item.category)}</span>
                            </div>
                            <div>
                              <p className="font-medium text-apple-gray-900">{item.name}</p>
                              <p className="text-sm text-apple-gray-500">購入価格: ¥{item.price.toLocaleString()}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleSell(item, index)}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 text-sm"
                          >
                            売却
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 店舗詳細モーダル */}
      {selectedShop && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-apple border border-apple-gray-300 rounded-apple-lg p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${(() => {
                  const colorMap: {[key: string]: string} = {
                    '#FFD700': 'from-yellow-400 to-amber-500',
                    '#4169E1': 'from-blue-400 to-indigo-600', 
                    '#FF69B4': 'from-pink-400 to-rose-500',
                    '#8B4513': 'from-amber-600 to-orange-700',
                    '#32CD32': 'from-green-400 to-emerald-600',
                    '#00CED1': 'from-cyan-400 to-teal-600'
                  };
                  return colorMap[selectedShop.color] || 'from-gray-400 to-gray-600';
                })()} rounded-full flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl">{selectedShop.emoji}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-apple-gray-900">
                    {selectedShop.name}
                  </h3>
                  <p className="text-apple-gray-600 font-medium">
                    {selectedShop.items.length} 商品を販売中
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedShop(null)}
                className="w-8 h-8 bg-apple-gray-200 hover:bg-apple-gray-300 text-apple-gray-600 hover:text-apple-gray-800 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {selectedShop.items.map(item => {
                const getCategoryIcon = (category: string) => {
                  const icons: {[key: string]: string} = {
                    food: '🍞',
                    book: '📚', 
                    flower: '🌸',
                    drink: '☕',
                    fruit: '🍎',
                    vegetable: '🥬',
                    medicine: '💊'
                  };
                  return icons[category] || '📦';
                };
                
                const canAfford = player.money >= item.price;
                
                return (
                  <div
                    key={item.id}
                    className={`bg-white border rounded-apple-lg p-4 transition-all duration-200 ${
                      canAfford ? 'border-apple-gray-200 hover:border-apple-blue hover:shadow-md' : 'border-apple-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-apple-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">{getCategoryIcon(item.category)}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-apple-gray-900">{item.name}</h4>
                          <span className="inline-block bg-apple-blue text-white text-xs font-medium px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">
                        ¥{item.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={!canAfford}
                        className={`font-medium py-2 px-6 rounded-apple transition-all duration-200 shadow-sm hover:shadow-md transform ${
                          canAfford 
                            ? 'bg-apple-blue hover:bg-blue-600 text-white hover:scale-105'
                            : 'bg-apple-gray-300 text-apple-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? '購入する' : '所持金不足'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Urikai;