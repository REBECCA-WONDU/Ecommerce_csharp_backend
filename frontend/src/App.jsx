import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Typography, ConfigProvider, theme, App as AntApp } from 'antd';
import { ShopOutlined, DatabaseOutlined, HomeOutlined } from '@ant-design/icons';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Admin from './pages/Admin';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <AntApp>
        <Router>
          <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="logo" style={{ marginRight: 24 }}>
                <Title level={4} style={{ margin: 0, color: '#1890ff' }}>ShopEase</Title>
              </div>
              <Menu
                mode="horizontal"
                defaultSelectedKeys={['home']}
                style={{ flex: 1, borderBottom: 'none' }}
                items={[
                  { key: 'home', icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
                  { key: 'products', icon: <ShopOutlined />, label: <Link to="/products">Products</Link> },
                  { key: 'admin', icon: <DatabaseOutlined />, label: <Link to="/admin">Admin</Link> },
                ]}
              />
            </Header>
            <Content style={{ padding: '24px 50px' }}>
              <div className="site-layout-content" style={{ background: 'transparent', minHeight: 280 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              ShopEase ©{new Date().getFullYear()} Created with Ant Design & .NET
            </Footer>
          </Layout>
        </Router>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
