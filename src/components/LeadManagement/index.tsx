import { useEffect, useState } from 'react';
import { Table, Input, Spin, message, Card, Layout, Tooltip, Button, Modal} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { motion } from 'framer-motion';
import CustomPagination from '../../CommonUI/CustomPagination';
import {ResponsePagination, Lead} from './../../Types/api';
import {
  EyeOutlined
} from '@ant-design/icons';
const { Content } = Layout;
const { Search } = Input;

const LeadManagement = () => {
  const [data, setData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<ResponsePagination>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/v1/leads', {
        params: {
          page: currentPage,
          page_size: pageSize,
          search,
        },
      });
      setData(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      message.error('Failed to load leads.');
    } finally {
      setLoading(false);
    }
  };

  const getLead = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/v1/leads/${id}`);
      setSelectedLead(response.data);
    } catch (error) {
      message.error('Failed to load lead.');
    } finally {
      setIsLoading(false);
    }
  }
  const handleCloseModal = () => {
    setSelectedLead(null)
    setModalVisible(false)
  }

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, currentPage, pageSize]);

  const columns: ColumnsType<Lead> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Personal Phone', dataIndex: 'personal_phone', key: 'personal_phone' },
    { title: 'Nationality', dataIndex: 'nationality', key: 'nationality' },
    { title: 'Country of residence', dataIndex: 'country_of_residence', key: 'country_of_residence' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Tooltip title="View Details">
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => {
              getLead(record.id);
              setModalVisible(true);
            }}
            type="link"
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content className="p-6">
        
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-screen-xl mx-auto"
          >
            <Card className="rounded-2xl shadow-md">
            <h2>Lead Management</h2>
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4" style={{marginBottom: '20px'}}>
                <Search
                  placeholder="Search leads"
                  allowClear
                  onSearch={val => {
                    setCurrentPage(1);
                    setSearch(val);
                  }}
                  style={{ width: 300 }}
                  size="large"
                />
      
              </div>

              <Spin spinning={loading} tip="Loading leads...">
                <Table
                  rowKey="id"
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  bordered
                  size="middle"
                />
                <CustomPagination
                  pagination={pagination}
                  onChange={(page: number, size: number) => {
                    setCurrentPage(page);
                    setPageSize(size);
                  }}
                />
              </Spin>
            </Card>
          </motion.div>

          <Modal
              open={modalVisible}
              title="Lead Details"
              footer={<Button onClick={() => handleCloseModal()}>Close</Button>}
              onCancel={() => handleCloseModal()}
            >
              <Spin spinning={isLoading} tip="Loading lead">
                {selectedLead && (
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {selectedLead.name}</p>
                    <p><strong>Email:</strong> {selectedLead.email}</p>
                    <p><strong>Personal Phone:</strong> {selectedLead.personal_phone}</p>
                    <p><strong>Nationality:</strong> {selectedLead.nationality}</p>
                    <p><strong>Country of residence:</strong> {selectedLead.country_of_residence}</p>
                    <p><strong>Address:</strong> {selectedLead.address}</p>
                    <p><strong>Business Phone:</strong> {selectedLead.business_phone}</p>
                    <p><strong>Home Phone:</strong> {selectedLead.home_phone}</p>
                    <p><strong>Gender:</strong> {selectedLead.gender}</p>
                    <p><strong>Date of birth:</strong> {selectedLead.dob}</p>
                    <p><strong>Description:</strong> {selectedLead.description}</p>
                    <p><strong>Created At:</strong> {selectedLead.created_at}</p>
                  </div>
                )}
                
              </Spin>
            </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LeadManagement;
