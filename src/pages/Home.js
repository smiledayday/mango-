import React from 'react';
import { useState } from "react";
import styled from '@emotion/styled'
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DownOutlined
} from "@ant-design/icons";
import Help from "./Help";
import Favorite from "./Favorite";
import Rabbsh from "./Rabbsh";
import CreateDocs from './docs/CreateDocs'
import RencentDocs from './docs/RencentDocs'
import ParticipateDocs from './docs/ParticipateDocs'
import EditDocs from './docs/EditDocs'
import Header from './components/Header';


const { Sider, Content } = Layout;

const LeftIcon = styled.div``

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/docs/recent">最近浏览的文档</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/docs/create">我创建的文档</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/docs/participate">我参与的文档</Link>
    </Menu.Item>
  </Menu>
);

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="5" icon={<UploadOutlined />}>
            <Link to="docs/write">写文档</Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Dropdown overlay={menu} trigger={['click']}>
              <div>所有文档 <DownOutlined /></div>
            </Dropdown>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="favorite">我的收藏</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="rabbsh">回收站</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}>
            <Link to="help">帮助</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route path="docs/create" element={<CreateDocs />} />
            <Route path="docs/write" element={<EditDocs />} />
            <Route path="docs/recent" element={<RencentDocs />} />
            <Route path="docs/participate" element={<ParticipateDocs />} />
            <Route path="help" element={<Help />} />
            <Route path="favorite" element={<Favorite />} />
            <Route path="rabbsh" element={<Rabbsh />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
