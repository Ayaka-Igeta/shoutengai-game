import React, { useState, useEffect } from 'react';
import { Card, Tabs, Row, Col, Statistic, List, Typography, Space, Alert } from 'antd';
import { UserOutlined, TrophyOutlined, RiseOutlined, FallOutlined, DollarOutlined, FileTextOutlined, BarChartOutlined, LineChartOutlined } from '@ant-design/icons';

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

interface GameDashboardProps {
  player: Player;
  onPlayerUpdate?: (player: Player) => void;
}

const { Title, Text } = Typography;

const GameDashboard: React.FC<GameDashboardProps> = ({ player }) => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const totalAssets = player.assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = player.liabilities.reduce((sum, liability) => sum + liability.value, 0);
  const netWorth = totalAssets - totalLiabilities;
  const totalExpenses = player.expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const tabItems = [
    {
      key: 'overview',
      label: (
        <Space>
          <BarChartOutlined />
          概要
        </Space>
      ),
      children: (
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card size="small" title={
              <Space>
                <FileTextOutlined />
                最近の取引
              </Space>
            }>
              <List
                size="small"
                dataSource={player.expenses.slice(-3)}
                renderItem={(expense) => (
                  <List.Item>
                    <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                      <Text>{expense.name}</Text>
                      <Text type="danger" strong>-¥{expense.amount.toLocaleString()}</Text>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" title={
              <Space>
                <TrophyOutlined />
                ゲーム目標
              </Space>
            }>
              <List
                size="small"
                dataSource={[
                  'チームを組んで商売を始めよう',
                  '賢い投資で資産を増やそう',
                  '貸借対照表とP/Lを理解しよう'
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Text>• {item}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      )
    },
    {
      key: 'bs',
      label: (
        <Space>
          <FileTextOutlined />
          貸借対照表
        </Space>
      ),
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Title level={4}>貸借対照表 (Balance Sheet)</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card
                size="small"
                title={
                  <Space>
                    <RiseOutlined style={{ color: '#52c41a' }} />
                    <Text strong style={{ color: '#52c41a' }}>資産 (Assets)</Text>
                  </Space>
                }
              >
                <List
                  size="small"
                  dataSource={[...player.assets, { id: 'total', name: '総資産', value: totalAssets, type: 'total' as any }]}
                  renderItem={(asset) => (
                    <List.Item style={{
                      backgroundColor: asset.type === 'total' ? '#f6ffed' : '#f9f9f9',
                      padding: '8px 12px',
                      border: asset.type === 'total' ? '2px solid #52c41a' : '1px solid #d9d9d9',
                      borderRadius: '6px',
                      marginBottom: '4px'
                    }}>
                      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                        <Text strong={asset.type === 'total'} style={{ color: '#52c41a' }}>{asset.name}</Text>
                        <Text strong={asset.type === 'total'} style={{ color: '#52c41a' }}>¥{asset.value.toLocaleString()}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                size="small"
                title={
                  <Space>
                    <FallOutlined style={{ color: '#f5222d' }} />
                    <Text strong style={{ color: '#f5222d' }}>負債 (Liabilities)</Text>
                  </Space>
                }
              >
                <List
                  size="small"
                  dataSource={[...player.liabilities, { id: 'total', name: '総負債', value: totalLiabilities, type: 'total' as any }]}
                  renderItem={(liability) => (
                    <List.Item style={{
                      backgroundColor: liability.type === 'total' ? '#fff2e8' : '#f9f9f9',
                      padding: '8px 12px',
                      border: liability.type === 'total' ? '2px solid #f5222d' : '1px solid #d9d9d9',
                      borderRadius: '6px',
                      marginBottom: '4px'
                    }}>
                      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                        <Text strong={liability.type === 'total'} style={{ color: '#f5222d' }}>{liability.name}</Text>
                        <Text strong={liability.type === 'total'} style={{ color: '#f5222d' }}>¥{liability.value.toLocaleString()}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
          <Card style={{ backgroundColor: '#e6f7ff', border: '2px solid #1890ff' }}>
            <Statistic
              title={<Text strong style={{ color: '#1890ff' }}>純資産 (Net Worth)</Text>}
              value={netWorth}
              precision={0}
              prefix="¥"
              valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
            />
          </Card>
        </Space>
      )
    },
    {
      key: 'pl',
      label: (
        <Space>
          <LineChartOutlined />
          損益計算書
        </Space>
      ),
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Title level={4}>損益計算書 (P&L Statement)</Title>
          <Card
            size="small"
            title={
              <Space>
                <DollarOutlined style={{ color: '#f5222d' }} />
                <Text strong style={{ color: '#f5222d' }}>支出 (Expenses)</Text>
              </Space>
            }
          >
            <List
              size="small"
              dataSource={[...player.expenses, { id: 'total', name: '総支出', amount: totalExpenses, date: new Date() }]}
              renderItem={(expense) => (
                <List.Item style={{
                  backgroundColor: expense.id === 'total' ? '#fff2e8' : '#f9f9f9',
                  padding: '8px 12px',
                  border: expense.id === 'total' ? '2px solid #f5222d' : '1px solid #d9d9d9',
                  borderRadius: '6px',
                  marginBottom: '4px'
                }}>
                  <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Space direction="vertical" size={0}>
                      <Text strong={expense.id === 'total'} style={{ color: '#f5222d' }}>{expense.name}</Text>
                      {expense.id !== 'total' && (
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {expense.date.toLocaleDateString()}
                        </Text>
                      )}
                    </Space>
                    <Text strong={expense.id === 'total'} style={{ color: '#f5222d' }}>¥{expense.amount.toLocaleString()}</Text>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Space>
      )
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {showAnimation && (
          <Alert
            message={
              <Space>
                <span style={{ fontSize: '24px' }}>🎮</span>
                <Title level={3} style={{ margin: 0, color: 'white' }}>商店街ゲームへようこそ！</Title>
              </Space>
            }
            description="楽しく学ぼう、お金の仕組み"
            type="info"
            showIcon={false}
            style={{
              background: 'linear-gradient(135deg, #1890ff, #722ed1)',
              border: 'none',
              borderRadius: '12px',
              color: 'white'
            }}
          />
        )}

        <Card style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1890ff, #722ed1)',
            margin: '-24px -24px 24px -24px',
            padding: '24px',
            color: 'white'
          }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Space align="center" size="large">
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px'
                  }}>
                    <UserOutlined />
                  </div>
                  <Space direction="vertical" size={0}>
                    <Title level={2} style={{ margin: 0, color: 'white' }}>{player.name}</Title>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>プレイヤー</Text>
                  </Space>
                </Space>
              </Col>
              <Col>
                <Statistic
                  title={<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>所持金</Text>}
                  value={player.money}
                  precision={0}
                  prefix="¥"
                  valueStyle={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}
                />
              </Col>
            </Row>
          </div>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Statistic
                title="総資産"
                value={totalAssets}
                precision={0}
                prefix={<RiseOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic
                title="負債"
                value={totalLiabilities}
                precision={0}
                prefix={<FallOutlined style={{ color: '#f5222d' }} />}
                valueStyle={{ color: '#f5222d' }}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic
                title="純資産"
                value={netWorth}
                precision={0}
                prefix={<DollarOutlined style={{ color: '#faad14' }} />}
                valueStyle={{ color: '#faad14' }}
              />
            </Col>
          </Row>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <Tabs items={tabItems} />
        </Card>
      </Space>
    </div>
  );
};

export default GameDashboard;