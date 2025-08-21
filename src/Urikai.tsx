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
              ■ SHOP STREET TRADING ■
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
                          {shop.items.length} ITEMS
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
                    left: '20%',
                    fontSize: '16px',
                    animation: 'walk 8s linear infinite'
                  }}>🚶</div>
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '30%',
                    fontSize: '16px',
                    animation: 'walk-reverse 10s linear infinite'
                  }}>🚶‍♀️</div>
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
                          {shop.items.length} ITEMS
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

          {/* プレイヤー情報・所持品 */}
          <div>
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
                ♦ YOUR ITEMS ♦
              </h3>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  backgroundColor: '#00FF00',
                  border: '3px solid #80FF80',
                  borderTop: '3px solid #FFFFFF',
                  borderLeft: '3px solid #FFFFFF',
                  borderRight: '3px solid #008000',
                  borderBottom: '3px solid #008000',
                  padding: '12px'
                }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#000000',
                    textShadow: '1px 1px 0px #FFFFFF'
                  }}>
                    $ {player.money.toLocaleString()} YEN
                  </div>
                </div>
              </div>

              <div style={{ 
                maxHeight: '256px', 
                overflowY: 'auto',
                border: '2px solid #808080',
                backgroundColor: '#F0F0F0'
              }}>
                {player.items.length === 0 ? (
                  <p style={{
                    color: '#606060',
                    textAlign: 'center',
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>NO ITEMS YET</p>
                ) : (
                  player.items.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        backgroundColor: '#E0E0E0',
                        border: '2px solid #D0D0D0',
                        borderTop: '2px solid #FFFFFF',
                        borderLeft: '2px solid #FFFFFF',
                        borderRight: '2px solid #A0A0A0',
                        borderBottom: '2px solid #A0A0A0',
                        marginBottom: '4px'
                      }}
                    >
                      <div>
                        <div style={{ 
                          fontWeight: 'bold',
                          fontSize: '14px',
                          color: '#000000'
                        }}>{item.name}</div>
                        <div style={{ 
                          fontSize: '12px',
                          color: '#606060'
                        }}>PRICE: ¥{item.price}</div>
                      </div>
                      <button
                        onClick={() => handleSell(item, index)}
                        style={{
                          backgroundColor: '#FF4040',
                          border: '2px solid #FF8080',
                          borderTop: '2px solid #FFFFFF',
                          borderLeft: '2px solid #FFFFFF',
                          borderRight: '2px solid #C00000',
                          borderBottom: '2px solid #C00000',
                          color: '#FFFFFF',
                          padding: '4px 8px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          textShadow: '1px 1px 0px #000000'
                        }}
                      >
                        SELL
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
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
              {selectedShop.items.map(item => (
                <div
                  key={item.id}
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
                    }}>{item.name}</h4>
                    <span style={{
                      padding: '2px 6px',
                      backgroundColor: '#0080FF',
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      border: '2px solid #4080FF',
                      textShadow: '1px 1px 0px #000000'
                    }}>
                      {item.category}
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
                      ¥{item.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handlePurchase(item)}
                      disabled={player.money < item.price}
                      style={{
                        backgroundColor: player.money >= item.price ? '#FF8000' : '#808080',
                        border: player.money >= item.price 
                          ? '3px solid #FFA040' 
                          : '3px solid #A0A0A0',
                        borderTop: '3px solid #FFFFFF',
                        borderLeft: '3px solid #FFFFFF',
                        borderRight: player.money >= item.price 
                          ? '3px solid #C06000' 
                          : '3px solid #606060',
                        borderBottom: player.money >= item.price 
                          ? '3px solid #C06000' 
                          : '3px solid #606060',
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        padding: '8px 16px',
                        cursor: player.money >= item.price ? 'pointer' : 'not-allowed',
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

export default Urikai;