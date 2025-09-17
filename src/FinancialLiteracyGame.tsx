import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Player {
  id: string;
  name: string;
  money: number;
  assets: Asset[];
  liabilities: Liability[];
  expenses: Expense[];
}

interface Expense {
  id: string;
  name: string;
  amount: number;
  date: Date;
}

interface Asset {
  id: string;
  name: string;
  value: number;
  type: 'current' | 'fixed';
}

interface Liability {
  id: string;
  name: string;
  value: number;
  type: 'current' | 'long-term';
}

interface Shop {
  id: string;
  name: string;
  emoji: string;
  color: string;
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  type: 'asset' | 'expense';
}

const FinancialLiteracyGame = () => {
  // const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);
  const [player, setPlayer] = useState<Player>({
    id: 'player1',
    name: 'あなた',
    money: 100000,
    assets: [
      { id: 'cash', name: '現金', value: 100000, type: 'current' }
    ],
    liabilities: [],
    expenses: []
  });

  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [showBSPL, setShowBSPL] = useState(false);
  const [gameMessage, setGameMessage] = useState<string>('商店街で買い物をしてBS/PLを学ぼう！');

  const shops: Shop[] = [
    {
      id: 'restaurant',
      name: 'レストラン',
      emoji: '🍽️',
      color: '#E60012',
      products: [
        { id: 'meal', name: '食事', price: 1000, type: 'expense' },
        { id: 'cookware', name: '調理器具', price: 5000, type: 'asset' },
        { id: 'drinks', name: '飲み物', price: 500, type: 'expense' }
      ]
    },
    {
      id: 'bookstore',
      name: '本屋',
      emoji: '📚',
      color: '#4169E1',
      products: [
        { id: 'magazine', name: '雑誌', price: 800, type: 'expense' },
        { id: 'computer', name: 'パソコン', price: 80000, type: 'asset' },
        { id: 'books', name: '参考書', price: 2000, type: 'expense' }
      ]
    },
    {
      id: 'bank',
      name: '銀行',
      emoji: '🏦',
      color: '#32CD32',
      products: [
        { id: 'loan_fee', name: '手数料', price: 200, type: 'expense' },
        { id: 'savings', name: '定期預金', price: 10000, type: 'asset' },
        { id: 'investment', name: '投資信託', price: 5000, type: 'asset' }
      ]
    },
    {
      id: 'electronics',
      name: '家電店',
      emoji: '📱',
      color: '#FF69B4',
      products: [
        { id: 'phone_bill', name: '携帯代', price: 8000, type: 'expense' },
        { id: 'smartphone', name: 'スマートフォン', price: 60000, type: 'asset' },
        { id: 'warranty', name: '保証料', price: 3000, type: 'expense' }
      ]
    },
    {
      id: 'car_dealer',
      name: '車屋',
      emoji: '🚗',
      color: '#8B4513',
      products: [
        { id: 'gas', name: 'ガソリン代', price: 5000, type: 'expense' },
        { id: 'car', name: '自動車', price: 200000, type: 'asset' },
        { id: 'insurance', name: '自動車保険', price: 4000, type: 'expense' }
      ]
    },
    {
      id: 'realestate',
      name: '不動産屋',
      emoji: '🏠',
      color: '#00CED1',
      products: [
        { id: 'rent', name: '家賃', price: 80000, type: 'expense' },
        { id: 'house', name: 'マイホーム', price: 3000000, type: 'asset' },
        { id: 'utilities', name: '光熱費', price: 12000, type: 'expense' }
      ]
    }
  ];

  const handleShopClick = (shop: Shop) => {
    setSelectedShop(shop);
  };

  const handlePurchase = (product: Product) => {
    if (player.money >= product.price) {
      const updatedPlayer = { ...player };
      updatedPlayer.money -= product.price;

      if (product.type === 'asset') {
        // 資産として追加
        updatedPlayer.assets.push({
          id: product.id + '_' + Date.now(),
          name: product.name,
          value: product.price,
          type: 'current'
        });
        // 現金資産を減らす
        const cashAsset = updatedPlayer.assets.find(a => a.id === 'cash');
        if (cashAsset) {
          cashAsset.value = updatedPlayer.money;
        }
      } else {
        // 費用として追加
        updatedPlayer.expenses.push({
          id: product.id + '_' + Date.now(),
          name: product.name,
          amount: product.price,
          date: new Date()
        });
      }

      setPlayer(updatedPlayer);
      setGameMessage(`${product.name}を購入しました！(${product.type === 'asset' ? '資産' : '費用'})`);
      setSelectedShop(null);
    } else {
      setGameMessage('お金が足りません！');
    }
  };

  const calculateTotalAssets = () => {
    return player.assets.reduce((sum, asset) => sum + asset.value, 0);
  };

  const calculateTotalLiabilities = () => {
    return player.liabilities.reduce((sum, liability) => sum + liability.value, 0);
  };

  const calculateTotalExpenses = () => {
    return player.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const calculateNetWorth = () => {
    return calculateTotalAssets() - calculateTotalLiabilities();
  };

  return (
    <div className="min-h-screen" style={{ 
      fontFamily: 'Courier New, monospace',
      backgroundColor: '#2D5A27',
      backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px),
        repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px)
      `,
      imageRendering: 'pixelated'
    }}>
      {/* ヘッダー */}
      <header style={{
        backgroundColor: '#4A4A4A',
        border: '4px solid #6A6A6A',
        borderTop: '4px solid #8A8A8A',
        borderLeft: '4px solid #8A8A8A',
        borderRight: '4px solid #2A2A2A',
        borderBottom: '4px solid #2A2A2A',
        boxShadow: 'inset 2px 2px 0px #9A9A9A, inset -2px -2px 0px #1A1A1A'
      }}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#FFFF00',
              textShadow: '2px 2px 0px #000000',
              letterSpacing: '2px'
            }}>
              ■ ACCOUNTING GAME (BS/PL) ■
            </h1>
            <div className="flex items-center gap-4">
              <div style={{
                backgroundColor: '#FFD700',
                border: '3px solid #FFFF80',
                borderTop: '3px solid #FFFFFF',
                borderLeft: '3px solid #FFFFFF',
                borderRight: '3px solid #B8860B',
                borderBottom: '3px solid #B8860B',
                padding: '8px 12px'
              }}>
                <span style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#000000',
                  textShadow: '1px 1px 0px #FFFFFF'
                }}>
                  MONEY: ¥{player.money.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setShowBSPL(!showBSPL)}
                style={{
                  backgroundColor: '#0080FF',
                  border: '3px solid #4080FF',
                  borderTop: '3px solid #80C0FF',
                  borderLeft: '3px solid #80C0FF',
                  borderRight: '3px solid #0040C0',
                  borderBottom: '3px solid #0040C0',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  padding: '8px 16px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textShadow: '1px 1px 0px #000000'
                }}
              >
                BS/PL VIEW
              </button>
              <Link
                to="/"
                style={{
                  backgroundColor: '#808080',
                  border: '3px solid #A0A0A0',
                  borderTop: '3px solid #C0C0C0',
                  borderLeft: '3px solid #C0C0C0',
                  borderRight: '3px solid #404040',
                  borderBottom: '3px solid #404040',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  padding: '8px 16px',
                  textDecoration: 'none',
                  textShadow: '1px 1px 0px #000000',
                  fontSize: '14px'
                }}
              >
                BACK
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* ゲームメッセージ */}
        <div style={{
          backgroundColor: '#E0E0E0',
          border: '4px solid #F0F0F0',
          borderTop: '4px solid #FFFFFF',
          borderLeft: '4px solid #FFFFFF',
          borderRight: '4px solid #A0A0A0',
          borderBottom: '4px solid #A0A0A0',
          padding: '16px',
          marginBottom: '24px',
          textAlign: 'center',
          boxShadow: 'inset 2px 2px 0px #F8F8F8, inset -2px -2px 0px #808080'
        }}>
          <p style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#000080',
            textShadow: '1px 1px 0px #FFFFFF',
            margin: 0
          }}>{gameMessage}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 商店街エリア */}
          <div className="lg:col-span-2">
            <div style={{
              backgroundColor: '#C0C0C0',
              border: '4px solid #D0D0D0',
              borderTop: '4px solid #FFFFFF',
              borderLeft: '4px solid #FFFFFF',
              borderRight: '4px solid #808080',
              borderBottom: '4px solid #808080',
              padding: '24px',
              boxShadow: 'inset 2px 2px 0px #F0F0F0, inset -2px -2px 0px #606060'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '16px',
                color: '#800080',
                textShadow: '1px 1px 0px #FFFFFF',
                letterSpacing: '2px'
              }}>
                ▲ SHOP STREET ▲
              </h2>
              
              {/* 商店街の道路レイアウト */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px',
                position: 'relative'
              }}>
                {/* 上側の店舗 */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-around' }}>
                  {shops.slice(0, 3).map(shop => (
                    <div
                      key={shop.id}
                      className="cursor-pointer"
                      onClick={() => handleShopClick(shop)}
                      style={{
                        transition: 'transform 0.1s',
                        flex: '1',
                        maxWidth: '120px'
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: shop.color,
                          border: '4px solid',
                          borderTopColor: '#FFFFFF',
                          borderLeftColor: '#FFFFFF', 
                          borderRightColor: '#000000',
                          borderBottomColor: '#000000',
                          padding: '12px',
                          textAlign: 'center',
                          boxShadow: 'inset 2px 2px 0px rgba(255,255,255,0.8), inset -2px -2px 0px rgba(0,0,0,0.8)',
                          position: 'relative',
                          minHeight: '100px'
                        }}
                      >
                        <div style={{
                          fontSize: '24px',
                          marginBottom: '6px',
                          filter: 'contrast(2) brightness(1.2)',
                          textShadow: '2px 2px 0px #000000'
                        }}>{shop.emoji}</div>
                        <h3 style={{
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 0px #000000',
                          marginBottom: '6px',
                          letterSpacing: '1px'
                        }}>
                          {shop.name}
                        </h3>
                        <div style={{
                          fontSize: '10px',
                          color: '#FFFFFF',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          border: '2px solid #000000',
                          padding: '2px 6px',
                          textShadow: '1px 1px 0px #000000'
                        }}>
                          {shop.products.length} ITEMS
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 道路 */}
                <div style={{
                  height: '40px',
                  backgroundColor: '#606060',
                  border: '3px solid #404040',
                  borderTop: '3px solid #808080',
                  borderLeft: '3px solid #808080',
                  borderRight: '3px solid #202020',
                  borderBottom: '3px solid #202020',
                  position: 'relative',
                  backgroundImage: `
                    repeating-linear-gradient(90deg, 
                      transparent 0px, 
                      transparent 10px, 
                      rgba(255,255,255,0.2) 10px, 
                      rgba(255,255,255,0.2) 12px,
                      transparent 12px, 
                      transparent 22px
                    )
                  `
                }}>
                  {/* 道路の中央線 */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    right: '0',
                    height: '2px',
                    backgroundColor: '#FFFF00',
                    transform: 'translateY(-50%)',
                    backgroundImage: `
                      repeating-linear-gradient(90deg, 
                        #FFFF00 0px, 
                        #FFFF00 12px, 
                        transparent 12px, 
                        transparent 20px
                      )
                    `
                  }} />
                  
                  {/* 歩行者 */}
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '15%',
                    fontSize: '16px',
                    animation: 'walk 12s linear infinite'
                  }}>💼</div>
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '25%',
                    fontSize: '16px',
                    animation: 'walk-reverse 15s linear infinite'
                  }}>🚶‍♂️</div>
                </div>

                {/* 下側の店舗 */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-around' }}>
                  {shops.slice(3, 6).map(shop => (
                    <div
                      key={shop.id}
                      className="cursor-pointer"
                      onClick={() => handleShopClick(shop)}
                      style={{
                        transition: 'transform 0.1s',
                        flex: '1',
                        maxWidth: '120px'
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: shop.color,
                          border: '4px solid',
                          borderTopColor: '#FFFFFF',
                          borderLeftColor: '#FFFFFF', 
                          borderRightColor: '#000000',
                          borderBottomColor: '#000000',
                          padding: '12px',
                          textAlign: 'center',
                          boxShadow: 'inset 2px 2px 0px rgba(255,255,255,0.8), inset -2px -2px 0px rgba(0,0,0,0.8)',
                          position: 'relative',
                          minHeight: '100px'
                        }}
                      >
                        <div style={{
                          fontSize: '24px',
                          marginBottom: '6px',
                          filter: 'contrast(2) brightness(1.2)',
                          textShadow: '2px 2px 0px #000000'
                        }}>{shop.emoji}</div>
                        <h3 style={{
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 0px #000000',
                          marginBottom: '6px',
                          letterSpacing: '1px'
                        }}>
                          {shop.name}
                        </h3>
                        <div style={{
                          fontSize: '10px',
                          color: '#FFFFFF',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          border: '2px solid #000000',
                          padding: '2px 6px',
                          textShadow: '1px 1px 0px #000000'
                        }}>
                          {shop.products.length} ITEMS
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* アニメーション用CSS */}
              <style>{`
                @keyframes walk {
                  0% { left: -20px; }
                  100% { left: calc(100% + 20px); }
                }
                @keyframes walk-reverse {
                  0% { right: -20px; }
                  100% { right: calc(100% + 20px); }
                }
              `}</style>
            </div>
          </div>

          {/* BS/PL表示エリア */}
          <div>
            {showBSPL ? (
              <div style={{
                backgroundColor: '#C0C0C0',
                border: '4px solid #D0D0D0',
                borderTop: '4px solid #FFFFFF',
                borderLeft: '4px solid #FFFFFF',
                borderRight: '4px solid #808080',
                borderBottom: '4px solid #808080',
                padding: '24px',
                boxShadow: 'inset 2px 2px 0px #F0F0F0, inset -2px -2px 0px #606060'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                  color: '#000080',
                  textShadow: '1px 1px 0px #FFFFFF',
                  letterSpacing: '1px'
                }}>
                  ♦ BS & PL DISPLAY ♦
                </h3>
                
                {/* 貸借対照表 */}
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: '#008000',
                    textShadow: '1px 1px 0px #FFFFFF'
                  }}>BALANCE SHEET (BS)</h4>
                  <div style={{
                    backgroundColor: '#80FF80',
                    border: '3px solid #A0FFA0',
                    borderTop: '3px solid #FFFFFF',
                    borderLeft: '3px solid #FFFFFF',
                    borderRight: '3px solid #40C040',
                    borderBottom: '3px solid #40C040',
                    padding: '12px',
                    marginBottom: '8px'
                  }}>
                    <div style={{ fontWeight: 'bold', color: '#000000', marginBottom: '4px' }}>ASSETS</div>
                    <div style={{ fontSize: '12px' }}>
                      {player.assets.map(asset => (
                        <div key={asset.id} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          color: '#000000'
                        }}>
                          <span>{asset.name}</span>
                          <span>¥{asset.value.toLocaleString()}</span>
                        </div>
                      ))}
                      <div style={{
                        borderTop: '2px solid #000000',
                        paddingTop: '4px',
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        <span>TOTAL ASSETS</span>
                        <span>¥{calculateTotalAssets().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    backgroundColor: '#FF8080',
                    border: '3px solid #FFA0A0',
                    borderTop: '3px solid #FFFFFF',
                    borderLeft: '3px solid #FFFFFF',
                    borderRight: '3px solid #C04040',
                    borderBottom: '3px solid #C04040',
                    padding: '12px'
                  }}>
                    <div style={{ fontWeight: 'bold', color: '#000000', marginBottom: '4px' }}>LIABILITIES</div>
                    <div style={{ fontSize: '12px' }}>
                      {player.liabilities.length === 0 ? (
                        <div style={{ color: '#000000' }}>NO LIABILITIES</div>
                      ) : (
                        player.liabilities.map(liability => (
                          <div key={liability.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: '#000000'
                          }}>
                            <span>{liability.name}</span>
                            <span>¥{liability.value.toLocaleString()}</span>
                          </div>
                        ))
                      )}
                      <div style={{
                        borderTop: '2px solid #000000',
                        paddingTop: '4px',
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        <span>NET WORTH</span>
                        <span>¥{calculateNetWorth().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 損益計算書 */}
                <div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: '#800080',
                    textShadow: '1px 1px 0px #FFFFFF'
                  }}>PROFIT & LOSS (PL)</h4>
                  <div style={{
                    backgroundColor: '#C080FF',
                    border: '3px solid #D0A0FF',
                    borderTop: '3px solid #FFFFFF',
                    borderLeft: '3px solid #FFFFFF',
                    borderRight: '3px solid #8040C0',
                    borderBottom: '3px solid #8040C0',
                    padding: '12px'
                  }}>
                    <div style={{ fontWeight: 'bold', color: '#000000', marginBottom: '4px' }}>EXPENSES</div>
                    <div style={{ 
                      fontSize: '12px', 
                      maxHeight: '128px', 
                      overflowY: 'auto',
                      border: '2px solid #8040C0'
                    }}>
                      {player.expenses.length === 0 ? (
                        <div style={{ color: '#000000', padding: '4px' }}>NO EXPENSES</div>
                      ) : (
                        player.expenses.map(expense => (
                          <div key={expense.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: '#000000',
                            padding: '2px 4px'
                          }}>
                            <span>{expense.name}</span>
                            <span>¥{expense.amount.toLocaleString()}</span>
                          </div>
                        ))
                      )}
                      <div style={{
                        borderTop: '2px solid #000000',
                        paddingTop: '4px',
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '4px'
                      }}>
                        <span>TOTAL EXPENSES</span>
                        <span>¥{calculateTotalExpenses().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                backgroundColor: '#C0C0C0',
                border: '4px solid #D0D0D0',
                borderTop: '4px solid #FFFFFF',
                borderLeft: '4px solid #FFFFFF',
                borderRight: '4px solid #808080',
                borderBottom: '4px solid #808080',
                padding: '24px',
                boxShadow: 'inset 2px 2px 0px #F0F0F0, inset -2px -2px 0px #606060'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                  color: '#000080',
                  textShadow: '1px 1px 0px #FFFFFF',
                  letterSpacing: '1px'
                }}>
                  ♦ GAME INFO ♦
                </h3>
                <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '12px', color: '#000000' }}>
                    <strong>ASSETS:</strong> Items that generate money (PC, car, house)
                  </p>
                  <p style={{ marginBottom: '12px', color: '#000000' }}>
                    <strong>EXPENSES:</strong> Items that are consumed (food, gas, magazines)
                  </p>
                  <p style={{ marginBottom: '12px', color: '#000000' }}>
                    <strong>BS:</strong> Shows assets and liabilities
                  </p>
                  <p style={{ marginBottom: '12px', color: '#000000' }}>
                    <strong>PL:</strong> Shows expenses
                  </p>
                  <p style={{ color: '#000080', fontWeight: 'bold' }}>
                    Buy items and learn the difference between assets and expenses!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 店舗詳細モーダル */}
      {selectedShop && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#C0C0C0',
            border: '6px solid #E0E0E0',
            borderTop: '6px solid #FFFFFF',
            borderLeft: '6px solid #FFFFFF',
            borderRight: '6px solid #808080',
            borderBottom: '6px solid #808080',
            padding: '24px',
            maxWidth: '480px',
            width: '100%',
            boxShadow: 'inset 4px 4px 0px #F0F0F0, inset -4px -4px 0px #606060'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: selectedShop.color,
                textShadow: '2px 2px 0px #000000',
                letterSpacing: '1px'
              }}>
                {selectedShop.emoji} {selectedShop.name}
              </h3>
              <button
                onClick={() => setSelectedShop(null)}
                style={{
                  backgroundColor: '#FF4040',
                  border: '3px solid #FF8080',
                  borderTop: '3px solid #FFFFFF',
                  borderLeft: '3px solid #FFFFFF',
                  borderRight: '3px solid #C00000',
                  borderBottom: '3px solid #C00000',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  textShadow: '1px 1px 0px #000000'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedShop.products.map(product => (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: '#E0E0E0',
                    border: '3px solid #F0F0F0',
                    borderTop: '3px solid #FFFFFF',
                    borderLeft: '3px solid #FFFFFF',
                    borderRight: '3px solid #A0A0A0',
                    borderBottom: '3px solid #A0A0A0',
                    padding: '12px',
                    boxShadow: 'inset 2px 2px 0px #F8F8F8, inset -2px -2px 0px #808080'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <h4 style={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: '#000000'
                    }}>{product.name}</h4>
                    <span style={{
                      padding: '2px 6px',
                      backgroundColor: product.type === 'asset' ? '#00FF00' : '#FF4040',
                      color: product.type === 'asset' ? '#000000' : '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      border: `2px solid ${product.type === 'asset' ? '#40FF40' : '#FF8080'}`,
                      textShadow: '1px 1px 0px #000000'
                    }}>
                      {product.type === 'asset' ? 'ASSET' : 'EXPENSE'}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#008000',
                      textShadow: '1px 1px 0px #FFFFFF'
                    }}>
                      ¥{product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handlePurchase(product)}
                      disabled={player.money < product.price}
                      style={{
                        backgroundColor: player.money >= product.price ? '#FF8000' : '#808080',
                        border: player.money >= product.price 
                          ? '3px solid #FFA040' 
                          : '3px solid #A0A0A0',
                        borderTop: '3px solid #FFFFFF',
                        borderLeft: '3px solid #FFFFFF',
                        borderRight: player.money >= product.price 
                          ? '3px solid #C06000' 
                          : '3px solid #606060',
                        borderBottom: player.money >= product.price 
                          ? '3px solid #C06000' 
                          : '3px solid #606060',
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        padding: '8px 16px',
                        cursor: player.money >= product.price ? 'pointer' : 'not-allowed',
                        fontSize: '14px',
                        textShadow: '1px 1px 0px #000000'
                      }}
                    >
                      BUY
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialLiteracyGame;