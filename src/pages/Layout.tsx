import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Layout } from "antd";

import oxo from "../assets/oxo.svg";
const { Header } = Layout;

const items1 = [
  {
    key: "user",
    label: "使用者",
  },
  { key: "card", label: "織圖" },
];

interface Props {
  children: ReactNode;
  onDrawerClick?: () => void;
}

const PageLayout = (props: Props) => {
  const { children, onDrawerClick } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const pathName = location.pathname.replace("/", "");

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: 60,
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 5px 2px lightgray",
          transform: " scale(1)",
          padding: "0 25px",
        }}
      >
        <MenuOutlined
          className="menuIcon"
          style={{ marginRight: 20 }}
          onClick={onDrawerClick}
        />
        <img
          src={oxo}
          alt="Logo"
          width={40}
          height={30}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        {/* <Menu
          mode="horizontal"
          items={items1}
          selectedKeys={[pathName]}
          onClick={(e) => navigate(`/${e.key}`)}
          style={{ height: 60 }}
        /> */}
      </Header>
      <Layout hasSider style={{ height: "calc(100vh - 60px)" }}>
        {children}
      </Layout>
    </Layout>
  );
};
export default PageLayout;
