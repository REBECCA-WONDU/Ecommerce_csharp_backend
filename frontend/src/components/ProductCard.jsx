import React from 'react';
import { Card, Typography, Tag, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Text } = Typography;

const ProductCard = ({ product }) => {
    return (
        <Card
            hoverable
            variant="outlined"
            style={{ width: '100%', borderRadius: 12, overflow: 'hidden' }}
            cover={
                <div style={{ height: 200, background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        alt={product.name}
                        src={product.imageUrl || `https://via.placeholder.com/200x200?text=${encodeURIComponent(product.name)}`}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                    />
                </div>
            }
            actions={[
                <Button type="link" icon={<ShoppingCartOutlined />}>Add to Cart</Button>
            ]}
        >
            <div style={{ marginBottom: 8 }}>
                <Tag color="blue">{product.categoryName || 'General'}</Tag>
            </div>
            <Meta
                title={product.name}
                description={
                    <div style={{ marginTop: 8 }}>
                        <Text type="secondary" style={{ fontSize: 16, fontWeight: 'bold', color: '#1890ff' }}>
                            ${product.price.toFixed(2)}
                        </Text>
                    </div>
                }
            />
        </Card>
    );
};

export default ProductCard;
