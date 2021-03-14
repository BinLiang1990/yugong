import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  GroupOutlined,
} from '@ant-design/icons';
import s from './Layout.module.less'
const { Header, Sider, Content } = Layout;


interface Props {}
const MainLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className={s.logo} ><GroupOutlined /> {collapsed ? '' : 'YUG'}</div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className={s.layout} style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '16px',
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

// import React, { useCallback, useState } from "react";

// import { Layout as AntLayout, Menu } from 'antd';
// import {
//   PieChartOutlined,
// } from '@ant-design/icons';

// const Layout: React.FC = ({ children }) => {
//   const { Footer, Sider, Content } = AntLayout;

//   const [collapsed, setCollapsed] = useState(true);

//   const onCollapse = useCallback(
//     () => {
//       setCollapsed(!collapsed)
//     },
//     [collapsed],
//   )

//   return (
//     <AntLayout style={{ minHeight: '100vh' }}>
//         <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
//           <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
//             <Menu.Item key="1" icon={<PieChartOutlined />}>
//               菜单
//             </Menu.Item>
//           </Menu>
//         </Sider>
//         <AntLayout>
//           <Content style={{ margin: '0 16px' }}>
//             {children}
//           </Content>
//           <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
//         </AntLayout>
//       </AntLayout>
//   );
// };

// export default Layout;
