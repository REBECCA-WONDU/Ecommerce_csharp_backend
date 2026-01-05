import React from 'react';
import { Typography, Button, Space, Row, Col, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, RocketOutlined, SafetyOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <div style={{ textAlign: 'center', padding: '60px 0', background: '#f0f2f5', borderRadius: 16, marginBottom: 40 }}>
                <Title>Welcome to ShopEase</Title>
                <Paragraph style={{ fontSize: 18, color: '#666' }}>
                    Discover the best products at unbeatable prices. Fast delivery and secure payments.
                </Paragraph>
                <Button type="primary" size="large" onClick={() => navigate('/products')}>
                    Start Shopping
                </Button>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                    <Card variant="borderless" style={{ textAlign: 'center', height: '100%' }}>
                        <RocketOutlined style={{ fontSize: 40, color: '#1890ff', marginBottom: 16 }} />
                        <Title level={4}>Fast Delivery</Title>
                        <Paragraph>We ensure your products reach you in record time with our optimized logistics.</Paragraph>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card variant="borderless" style={{ textAlign: 'center', height: '100%' }}>
                        <SafetyOutlined style={{ fontSize: 40, color: '#1890ff', marginBottom: 16 }} />
                        <Title level={4}>Secure Payment</Title>
                        <Paragraph>Multiple secure payment options to keep your transactions safe and private.</Paragraph>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card variant="borderless" style={{ textAlign: 'center', height: '100%' }}>
                        <ShoppingCartOutlined style={{ fontSize: 40, color: '#1890ff', marginBottom: 16 }} />
                        <Title level={4}>Wide Range</Title>
                        <Paragraph>From electronics to fashion, find everything you need in one place.</Paragraph>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
