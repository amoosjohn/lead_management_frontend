import { Layout, Menu } from 'antd';
import {
  UserOutlined
} from '@ant-design/icons';

const { Sider} = Layout;

const NavigationSidebar = () => {
  return (
    <Sider width={220} className="bg-white shadow-md">
        <div className="text-xl text-center font-bold py-6">Lead Management</div>
        <Menu mode="inline" defaultSelectedKeys={['leads']}>
        <Menu.Item key="leads" icon={<UserOutlined />}>
            Leads
        </Menu.Item>
        </Menu>
    </Sider>
  );
};

export default NavigationSidebar;