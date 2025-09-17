import React, { useState } from 'react';
import { Card, Button, List, Avatar, Tag, Space, Typography, Row, Col, Modal, Statistic } from 'antd';
import { UserOutlined, TeamOutlined, BarChartOutlined, StarOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  skills: string[];
  contribution: number;
}

interface TeamManagerProps {
  teamMembers: TeamMember[];
  onAddMember: (member: TeamMember) => void;
  onRemoveMember: (memberId: string) => void;
  playerMoney: number;
}

const TeamManager: React.FC<TeamManagerProps> = ({ 
  teamMembers, 
  onAddMember, 
  onRemoveMember, 
  playerMoney 
}) => {
  const [showRecruitment, setShowRecruitment] = useState(false);
  // const [selectedCandidate, setSelectedCandidate] = useState<TeamMember | null>(null);

  const recruitmentCandidates: TeamMember[] = [
    {
      id: 'candidate1',
      name: 'さくら',
      role: 'マーケティング',
      avatar: '👩‍💼',
      skills: ['SNS運用', '広告企画', '市場調査'],
      contribution: 1500
    },
    {
      id: 'candidate2', 
      name: 'ゆうた',
      role: 'エンジニア',
      avatar: '👨‍💻',
      skills: ['プログラミング', 'システム設計', 'データ分析'],
      contribution: 2000
    },
    {
      id: 'candidate3',
      name: 'あやか',
      role: 'デザイナー',
      avatar: '👩‍🎨',
      skills: ['UI/UX', 'グラフィック', 'ブランディング'],
      contribution: 1800
    },
    {
      id: 'candidate4',
      name: 'だいき',
      role: '営業',
      avatar: '👨‍💼',
      skills: ['顧客開拓', 'プレゼン', '交渉'],
      contribution: 1700
    }
  ];

  const hireCost = 10000;

  const handleHire = (candidate: TeamMember) => {
    if (playerMoney >= hireCost) {
      onAddMember(candidate);
      setShowRecruitment(false);
    }
  };

  const totalContribution = teamMembers.reduce((sum, member) => sum + member.contribution, 0);

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div style={{ textAlign: 'center' }}>
        <Space align="center" size="large" style={{ marginBottom: '8px' }}>
          <Avatar
            size={40}
            style={{
              background: '#1890ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <UserOutlined style={{ fontSize: '20px', color: 'white' }} />
          </Avatar>
          <Title level={2} style={{ margin: 0 }}>チーム管理</Title>
        </Space>
        <Text type="secondary">仲間と一緒にビジネスを成功させよう！</Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="チームメンバー"
              value={teamMembers.length}
              suffix="人"
              prefix={<TeamOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="総貢献度"
              value={totalContribution}
              suffix="/月"
              prefix={<BarChartOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="平均スキル"
              value={teamMembers.length > 0 ? Math.round(totalContribution / teamMembers.length) : 0}
              prefix={<StarOutlined style={{ color: '#722ed1' }} />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {teamMembers.length > 0 ? (
        <Card title={<Title level={4} style={{ margin: 0 }}>現在のチーム</Title>}>
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3 }}
            dataSource={teamMembers}
            renderItem={(member) => (
              <List.Item>
                <Card
                  size="small"
                  actions={[
                    <Button
                      key="remove"
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => onRemoveMember(member.id)}
                    >
                      削除
                    </Button>
                  ]}
                >
                  <Card.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: '#1890ff' }}>
                        <UserOutlined />
                      </Avatar>
                    }
                    title={member.name}
                    description={member.role}
                  />
                  <div style={{ marginTop: '12px' }}>
                    <Space direction="vertical" style={{ width: '100%' }} size="small">
                      <div>
                        <Space wrap>
                          {member.skills.map((skill, index) => (
                            <Tag key={index} color="blue" style={{ fontSize: '11px' }}>
                              {skill}
                            </Tag>
                          ))}
                        </Space>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>月間貢献度:</Text>
                        <Text strong style={{ color: '#52c41a' }}>¥{member.contribution.toLocaleString()}</Text>
                      </div>
                    </Space>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </Card>
      ) : (
        <Card style={{ textAlign: 'center', padding: '32px 16px' }}>
          <Avatar
            size={64}
            style={{
              backgroundColor: '#52c41a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <UserOutlined style={{ fontSize: '32px' }} />
          </Avatar>
          <Title level={3}>チームを作ろう！</Title>
          <Text type="secondary">
            一人では限界があります。優秀な仲間を見つけてビジネスを拡大しましょう！
          </Text>
        </Card>
      )}

      <div style={{ textAlign: 'center' }}>
        <Button
          type="primary"
          size="large"
          icon={<SearchOutlined />}
          onClick={() => setShowRecruitment(true)}
        >
          メンバーを募集する
        </Button>
      </div>

      <Modal
        title={
          <Space>
            <SearchOutlined style={{ color: '#1890ff' }} />
            <div>
              <Title level={4} style={{ margin: 0 }}>メンバー募集</Title>
              <Text type="secondary" style={{ fontSize: '14px' }}>優秀な人材を見つけましょう</Text>
            </div>
          </Space>
        }
        open={showRecruitment}
        onCancel={() => setShowRecruitment(false)}
        footer={
          <div style={{ textAlign: 'center' }}>
            <Space>
              <Text>所持金: ¥{playerMoney.toLocaleString()}</Text>
            </Space>
          </div>
        }
        width={800}
        style={{ top: 20 }}
      >
        <List
          grid={{ gutter: 16, xs: 1, sm: 2 }}
          dataSource={recruitmentCandidates.filter(candidate =>
            !teamMembers.some(member => member.id === candidate.id)
          )}
          renderItem={(candidate) => (
            <List.Item>
              <Card
                size="small"
                actions={[
                  <Button
                    key="hire"
                    type="primary"
                    disabled={playerMoney < hireCost}
                    onClick={() => handleHire(candidate)}
                    style={{ width: '100%' }}
                  >
                    雇用する (¥{hireCost.toLocaleString()})
                  </Button>
                ]}
              >
                <Card.Meta
                  avatar={
                    <Avatar style={{ backgroundColor: '#1890ff' }}>
                      <UserOutlined />
                    </Avatar>
                  }
                  title={candidate.name}
                  description={candidate.role}
                />
                <div style={{ marginTop: '12px' }}>
                  <Space direction="vertical" style={{ width: '100%' }} size="small">
                    <div>
                      <Space wrap>
                        {candidate.skills.map((skill, index) => (
                          <Tag key={index} color="green" style={{ fontSize: '11px' }}>
                            {skill}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>月間貢献度:</Text>
                      <Text strong style={{ color: '#52c41a' }}>¥{candidate.contribution.toLocaleString()}</Text>
                    </div>
                  </Space>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </Modal>
    </Space>
  );
};

export default TeamManager;