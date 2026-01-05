import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Space, Card, Row, Col, Typography, message, Modal, InputNumber, Select } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getProducts, getCategories, createProduct, createCategory } from '../api';

const { Title } = Typography;
const { Option } = Select;

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [productForm] = Form.useForm();
    const [categoryForm] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [prodRes, catRes] = await Promise.all([getProducts(), getCategories()]);
            setProducts(prodRes.data);
            setCategories(catRes.data);
        } catch (error) {
            message.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateProduct = async (values) => {
        try {
            await createProduct(values);
            message.success('Product created successfully');
            setIsProductModalOpen(false);
            productForm.resetFields();
            fetchData();
        } catch (error) {
            message.error('Failed to create product');
        }
    };

    const handleCreateCategory = async (values) => {
        try {
            await createCategory(values);
            message.success('Category created successfully');
            setIsCategoryModalOpen(false);
            categoryForm.resetFields();
            fetchData();
        } catch (error) {
            message.error('Failed to create category');
        }
    };

    const productColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price', render: (price) => `$${price.toFixed(2)}` },
        { title: 'Category', dataIndex: 'categoryName', key: 'categoryName' },
        {
            title: 'Action',
            key: 'action',
            render: (_) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} type="link">Edit</Button>
                    <Button icon={<DeleteOutlined />} type="link" danger>Delete</Button>
                </Space>
            ),
        },
    ];

    const categoryColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Action',
            key: 'action',
            render: (_) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} type="link">Edit</Button>
                    <Button icon={<DeleteOutlined />} type="link" danger>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="admin-page">
            <Title level={2}>Admin Dashboard</Title>

            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Card
                        variant="outlined"
                        title="Products Management"
                        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsProductModalOpen(true)}>Add Product</Button>}
                    >
                        <Table columns={productColumns} dataSource={products} rowKey="id" loading={loading} />
                    </Card>
                </Col>

                <Col span={24}>
                    <Card
                        variant="outlined"
                        title="Categories Management"
                        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCategoryModalOpen(true)}>Add Category</Button>}
                    >
                        <Table columns={categoryColumns} dataSource={categories} rowKey="id" loading={loading} />
                    </Card>
                </Col>
            </Row>

            {/* Product Modal */}
            <Modal title="Add New Product" open={isProductModalOpen} onCancel={() => setIsProductModalOpen(false)} footer={null}>
                <Form form={productForm} layout="vertical" onFinish={handleCreateProduct}>
                    <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
                    </Form.Item>
                    <Form.Item name="imageUrl" label="Image URL">
                        <Input placeholder="https://example.com/image.jpg" />
                    </Form.Item>
                    <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
                        <Select placeholder="Select a category">
                            {categories.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Create Product</Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Category Modal */}
            <Modal title="Add New Category" open={isCategoryModalOpen} onCancel={() => setIsCategoryModalOpen(false)} footer={null}>
                <Form form={categoryForm} layout="vertical" onFinish={handleCreateCategory}>
                    <Form.Item name="name" label="Category Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Create Category</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Admin;
