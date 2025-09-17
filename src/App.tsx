import { BrowserRouter } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import AppRoute from './AppRoute';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Header style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #e8e8e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: '64px'
        }}>
          <Space align="center">
            <ShopOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={3} style={{ margin: 0, color: '#262626' }}>
              BUYBUY GAME
            </Title>
          </Space>
          <Title level={5} style={{ margin: 0, color: '#595959' }}>
            Demo Mode
          </Title>
        </Header>
        <Content style={{ padding: '0' }}>
          <AppRoute />
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
