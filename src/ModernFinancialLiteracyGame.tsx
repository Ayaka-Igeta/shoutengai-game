import { useState, useEffect } from 'react';
import { Card, Statistic, Row, Col, Button, Modal, Space, Typography, Tabs } from 'antd';
import { WalletOutlined, UserOutlined, RiseOutlined, TrophyOutlined, BarChartOutlined, ShopOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import GameDashboard from './components/GameDashboard';
import ShopGrid, { sampleShops } from './components/ShopGrid';
import TeamManager from './components/TeamManager';

const { Title, Text } = Typography;

interface Player {
  id: string;
  name: string;
  money: number;
  assets: Asset[];
  liabilities: Liability[];
  expenses: Expense[];
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

interface Expense {
  id: string;
  name: string;
  amount: number;
  date: Date;
}

interface Product {
  id: string;
  name: string;
  price: number;
  type: 'asset' | 'expense';
  emoji: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  skills: string[];
  contribution: number;
}

const ModernFinancialLiteracyGame = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'shop' | 'team'>('dashboard');
  const [showTutorial, setShowTutorial] = useState(true);
  const [player, setPlayer] = useState<Player>({
    id: 'player1',
    name: 'あなた',
    money: 100000,
    assets: [
      { id: 'cash', name: '現金', value: 100000, type: 'current' },
      { id: 'savings', name: '普通預金', value: 50000, type: 'current' }
    ],
    liabilities: [
      { id: 'loan', name: '学生ローン', value: 30000, type: 'long-term' }
    ],
    expenses: [
      { id: 'lunch', name: '昼食', amount: 800, date: new Date() }
    ]
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [gameStats, setGameStats] = useState({
    totalTransactions: 0,
    businessGrowth: 0,
    financialLiteracyScore: 75
  });

  // 月次収入計算
  useEffect(() => {
    const interval = setInterval(() => {
      const monthlyIncome = teamMembers.reduce((sum, member) => sum + member.contribution, 0);
      if (monthlyIncome > 0) {
        setPlayer(prev => ({
          ...prev,
          money: prev.money + monthlyIncome,
          assets: prev.assets.map(asset => 
            asset.id === 'cash' 
              ? { ...asset, value: asset.value + monthlyIncome }
              : asset
          )
        }));
        setGameStats(prev => ({
          ...prev,
          businessGrowth: prev.businessGrowth + monthlyIncome
        }));
      }
    }, 10000); // 10秒ごとに収入発生（デモ用）

    return () => clearInterval(interval);
  }, [teamMembers]);

  const handlePurchase = (product: Product, _shopId: string) => {
    if (player.money >= product.price) {
      const updatedPlayer = { ...player };
      updatedPlayer.money -= product.price;

      if (product.type === 'asset') {
        updatedPlayer.assets.push({
          id: `${product.id}_${Date.now()}`,
          name: product.name,
          value: product.price,
          type: 'fixed'
        });
        // 現金資産を減らす
        const cashAsset = updatedPlayer.assets.find(asset => asset.id === 'cash');
        if (cashAsset) cashAsset.value -= product.price;
      } else {
        updatedPlayer.expenses.push({
          id: `${product.id}_${Date.now()}`,
          name: product.name,
          amount: product.price,
          date: new Date()
        });
      }

      setPlayer(updatedPlayer);
      setGameStats(prev => ({
        ...prev,
        totalTransactions: prev.totalTransactions + 1,
        financialLiteracyScore: product.type === 'asset' ? prev.financialLiteracyScore + 1 : prev.financialLiteracyScore
      }));
    }
  };

  const handleAddTeamMember = (member: TeamMember) => {
    const hireCost = 10000;
    if (player.money >= hireCost) {
      setPlayer(prev => ({ ...prev, money: prev.money - hireCost }));
      setTeamMembers(prev => [...prev, member]);
    }
  };

  const handleRemoveTeamMember = (memberId: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const tabItems = [
    {
      key: 'dashboard',
      label: (
        <Space>
          <BarChartOutlined />
          ダッシュボード
        </Space>
      ),
      children: <GameDashboard player={player} />
    },
    {
      key: 'shop',
      label: (
        <Space>
          <ShopOutlined />
          商店街
        </Space>
      ),
      children: <ShopGrid shops={sampleShops} onPurchase={handlePurchase} playerMoney={player.money} />
    },
    {
      key: 'team',
      label: (
        <Space>
          <UserOutlined />
          チーム
        </Space>
      ),
      children: (
        <TeamManager
          teamMembers={teamMembers}
          onAddMember={handleAddTeamMember}
          onRemoveMember={handleRemoveTeamMember}
          playerMoney={player.money}
        />
      )
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '24px' }}>
      <Modal
        title={
          <Space>
            <QuestionCircleOutlined style={{ color: '#1890ff' }} />
            <Title level={3} style={{ margin: 0 }}>Welcome to BUYBUY GAME</Title>
          </Space>
        }
        open={showTutorial}
        onCancel={() => setShowTutorial(false)}
        footer={
          <Button
            type="primary"
            size="large"
            onClick={() => setShowTutorial(false)}
            style={{ width: '100%' }}
          >
            GAME START
          </Button>
        }
        width={500}
        centered
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text>• お金を使って賢く買い物をしよう</Text>
          <Text>• チームメンバーを雇って収入を増やそう</Text>
          <Text>• 貸借対照表（BS）と損益計算書（P/L）を学ぼう</Text>
        </Space>
      </Modal>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="所持金"
                value={player.money}
                precision={0}
                prefix={<WalletOutlined style={{ color: '#faad14' }} />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="チーム"
                value={teamMembers.length}
                prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="取引数"
                value={gameStats.totalTransactions}
                prefix={<RiseOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="金融スコア"
                value={gameStats.financialLiteracyScore}
                prefix={<TrophyOutlined style={{ color: '#ff7875' }} />}
                valueStyle={{ color: '#ff7875' }}
              />
            </Card>
          </Col>
        </Row>

        <Card style={{ borderRadius: '12px' }}>
          <Tabs
            activeKey={activeView}
            onChange={(key) => setActiveView(key as 'dashboard' | 'shop' | 'team')}
            items={tabItems}
            size="large"
          />
        </Card>

        {teamMembers.length > 0 && (
          <Card
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              background: '#52c41a',
              border: 'none',
              borderRadius: '12px',
              color: 'white'
            }}
            bodyStyle={{ padding: '16px' }}
          >
            <Space>
              <WalletOutlined style={{ color: 'white', fontSize: '20px' }} />
              <div>
                <div style={{ fontWeight: 'bold', color: 'white' }}>月次収入</div>
                <div style={{ color: 'white' }}>
                  ¥{teamMembers.reduce((sum, member) => sum + member.contribution, 0).toLocaleString()}/月
                </div>
              </div>
            </Space>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ModernFinancialLiteracyGame;