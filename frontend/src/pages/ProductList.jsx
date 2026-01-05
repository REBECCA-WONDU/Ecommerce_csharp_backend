import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Select, Typography, Spin, Empty, message } from 'antd';
import { getProducts, getCategories } from '../api';
import ProductCard from '../components/ProductCard';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([getProducts(), getCategories()]);
                setProducts(prodRes.data);
                setCategories(catRes.data);
            } catch (error) {
                message.error('Failed to fetch data');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.categoryName === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) return <div style={{ textAlign: 'center', padding: 50 }}><Spin size="large" /></div>;

    return (
        <div>
            <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Discover Products</Title>
                </Col>
                <Col>
                    <Row gutter={16}>
                        <Col>
                            <Select defaultValue="All" style={{ width: 150 }} onChange={setSelectedCategory}>
                                <Option value="All">All Categories</Option>
                                {categories.map(c => <Option key={c.id} value={c.name}>{c.name}</Option>)}
                            </Select>
                        </Col>
                        <Col>
                            <Search
                                placeholder="Search products..."
                                onSearch={setSearchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                style={{ width: 250 }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

            {filteredProducts.length > 0 ? (
                <Row gutter={[24, 24]}>
                    {filteredProducts.map(product => (
                        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Empty description="No products found" style={{ marginTop: 50 }} />
            )}
        </div>
    );
};

export default ProductList;
