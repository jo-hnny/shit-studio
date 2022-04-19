import React from 'react';
import { Layout, Typography, Menu } from 'antd';
import { MergeApp } from './modules';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export function App() {
  return (
    <Layout>
      <Header>
        <Title
          level={3}
          style={{
            color: '#fff',
            height: '100%',
            margin: 0,
            lineHeight: '64px',
          }}
        >
          Shit Studio
        </Title>
      </Header>

      <Layout>
        <Sider>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['merge']}>
            <Menu.Item key="merge">合并表格</Menu.Item>
          </Menu>
        </Sider>

        <Content style={{ height: 'calc(100vh - 64px)', padding: '25px' }}>
          <MergeApp />
        </Content>
      </Layout>
    </Layout>
  );
}
