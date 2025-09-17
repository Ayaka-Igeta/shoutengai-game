import React, { useState } from 'react';
import { Card, Modal, Button, Typography, Row, Col, Tag, Space, List, Avatar } from 'antd';
import {
  GiftOutlined,
  LaptopOutlined,
  UserOutlined,
  BookOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
  ShopOutlined,
  WalletOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface Shop {
  id: string;
  name: string;
  emoji: string;
  iconComponent: React.ComponentType<{ style?: React.CSSProperties }>;
  color: string;
  products: Product[];
  description: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  type: 'asset' | 'expense';
  emoji: string;
}

interface ShopGridProps {
  shops: Shop[];
  onPurchase: (product: Product, shopId: string) => void;
  playerMoney: number;
}

const ShopGrid: React.FC<ShopGridProps> = ({ shops, onPurchase, playerMoney }) => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [showPurchaseAnimation, setShowPurchaseAnimation] = useState<string | null>(null);

  const handlePurchase = (product: Product, shopId: string) => {
    if (playerMoney >= product.price) {
      setShowPurchaseAnimation(product.id);
      setTimeout(() => {
        onPurchase(product, shopId);
        setShowPurchaseAnimation(null);
      }, 600);
    }
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div style={{ textAlign: 'center' }}>
        <Space align="center" size="large" style={{ marginBottom: '8px' }}>
          <Avatar
            size={48}
            style={{
              background: 'linear-gradient(135deg, #ff7875, #ff4d4f)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShopOutlined style={{ fontSize: '24px', color: 'white' }} />
          </Avatar>
          <Title level={2} style={{ margin: 0 }}>商店街</Title>
        </Space>
        <Text type="secondary">お店をタップして商品を見てみよう！</Text>
      </div>

      <Row gutter={[16, 16]}>
        {shops.map((shop) => (
          <Col xs={12} sm={8} md={6} lg={6} key={shop.id}>
            <Card
              hoverable
              onClick={() => setSelectedShop(shop)}
              style={{
                borderRadius: '12px',
                height: '100%',
                textAlign: 'center'
              }}
              bodyStyle={{ padding: '20px' }}
            >
              <Space direction="vertical" align="center" size="middle">
                <Avatar
                  size={64}
                  style={{
                    background: `linear-gradient(135deg, ${shop.color}, ${shop.color}E6)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <shop.iconComponent style={{ fontSize: '32px', color: 'white' }} />
                </Avatar>
                <Space direction="vertical" align="center" size={4}>
                  <Title level={5} style={{ margin: 0 }}>{shop.name}</Title>
                  <Text type="secondary" style={{ fontSize: '12px' }}>{shop.description}</Text>
                  <Tag
                    style={{
                      background: `linear-gradient(135deg, ${shop.color}CC, ${shop.color}99)`,
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px'
                    }}
                  >
                    {shop.products.length}商品
                  </Tag>
                </Space>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={
          <Space>
            <Avatar
              size={32}
              style={{
                background: `linear-gradient(135deg, ${selectedShop?.color}, ${selectedShop?.color}CC)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {selectedShop && <selectedShop.iconComponent style={{ fontSize: '16px', color: 'white' }} />}
            </Avatar>
            <div>
              <Title level={4} style={{ margin: 0 }}>{selectedShop?.name}</Title>
              <Text type="secondary" style={{ fontSize: '14px' }}>{selectedShop?.description}</Text>
            </div>
          </Space>
        }
        open={!!selectedShop}
        onCancel={() => setSelectedShop(null)}
        footer={
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <Space>
              <WalletOutlined style={{ color: '#faad14' }} />
              <Text>所持金: ¥{playerMoney.toLocaleString()}</Text>
            </Space>
          </div>
        }
        width={600}
        style={{ top: 20 }}
      >
        <List
          dataSource={selectedShop?.products || []}
          renderItem={(product) => (
            <List.Item
              style={{
                padding: '16px',
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
                marginBottom: '8px',
                backgroundColor: showPurchaseAnimation === product.id ? '#f6ffed' : '#fafafa'
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar style={{ backgroundColor: '#f0f0f0', color: '#666' }}>
                    <GiftOutlined />
                  </Avatar>
                }
                title={
                  <Space>
                    <Text strong>{product.name}</Text>
                    <Tag color={product.type === 'asset' ? 'green' : 'blue'}>
                      {product.type === 'asset' ? '資産' : '支出'}
                    </Tag>
                  </Space>
                }
                description={`¥${product.price.toLocaleString()}`}
              />
              <Button
                type="primary"
                onClick={() => handlePurchase(product, selectedShop!.id)}
                disabled={playerMoney < product.price || showPurchaseAnimation === product.id}
                loading={showPurchaseAnimation === product.id}
                style={{
                  background: playerMoney >= product.price && showPurchaseAnimation !== product.id
                    ? selectedShop?.color
                    : undefined,
                  borderColor: playerMoney >= product.price && showPurchaseAnimation !== product.id
                    ? selectedShop?.color
                    : undefined
                }}
              >
                {showPurchaseAnimation === product.id ? '購入中...' : '購入'}
              </Button>
            </List.Item>
          )}
        />
      </Modal>
    </Space>
  );
};

export const sampleShops: Shop[] = [
  {
    id: 'food',
    name: 'グルメ横丁',
    emoji: '',
    iconComponent: GiftOutlined,
    color: '#FF3B30',
    description: '美味しい食べ物がいっぱい！',
    products: [
      { id: 'ramen', name: 'ラーメン', price: 800, type: 'expense', emoji: '' },
      { id: 'coffee', name: 'コーヒー', price: 300, type: 'expense', emoji: '' },
      { id: 'bento', name: 'お弁当', price: 600, type: 'expense', emoji: '' }
    ]
  },
  {
    id: 'tech',
    name: 'テック商店',
    emoji: '',
    iconComponent: LaptopOutlined,
    color: '#007AFF',
    description: 'IT機器とガジェット',
    products: [
      { id: 'laptop', name: 'ノートPC', price: 80000, type: 'asset', emoji: '' },
      { id: 'phone', name: 'スマートフォン', price: 50000, type: 'asset', emoji: '' },
      { id: 'headphones', name: 'ヘッドフォン', price: 15000, type: 'asset', emoji: '' }
    ]
  },
  {
    id: 'clothing',
    name: 'ファッション館',
    emoji: '',
    iconComponent: UserOutlined,
    color: '#FF9500',
    description: 'おしゃれなお洋服',
    products: [
      { id: 'shirt', name: 'Tシャツ', price: 2000, type: 'expense', emoji: '' },
      { id: 'jeans', name: 'ジーンズ', price: 5000, type: 'expense', emoji: '' },
      { id: 'shoes', name: 'スニーカー', price: 8000, type: 'expense', emoji: '' }
    ]
  },
  {
    id: 'books',
    name: '本の森',
    emoji: '',
    iconComponent: BookOutlined,
    color: '#34C759',
    description: '知識の宝庫',
    products: [
      { id: 'manga', name: '漫画', price: 500, type: 'expense', emoji: '' },
      { id: 'textbook', name: '参考書', price: 3000, type: 'asset', emoji: '' },
      { id: 'novel', name: '小説', price: 800, type: 'expense', emoji: '' }
    ]
  },
  {
    id: 'games',
    name: 'ゲームワールド',
    emoji: '',
    iconComponent: PlayCircleOutlined,
    color: '#5856D6',
    description: 'ゲーム好き集まれ！',
    products: [
      { id: 'console', name: 'ゲーム機', price: 30000, type: 'asset', emoji: '' },
      { id: 'game', name: 'ゲームソフト', price: 6000, type: 'expense', emoji: '' },
      { id: 'controller', name: 'コントローラー', price: 5000, type: 'asset', emoji: '' }
    ]
  },
  {
    id: 'sports',
    name: 'スポーツショップ',
    emoji: '',
    iconComponent: TrophyOutlined,
    color: '#FFCC00',
    description: '運動用具専門店',
    products: [
      { id: 'ball', name: 'サッカーボール', price: 3000, type: 'asset', emoji: '' },
      { id: 'racket', name: 'テニスラケット', price: 12000, type: 'asset', emoji: '' },
      { id: 'uniform', name: 'ユニフォーム', price: 4000, type: 'expense', emoji: '' }
    ]
  }
];

export default ShopGrid;