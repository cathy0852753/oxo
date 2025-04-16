import React, { ReactNode } from "react";
import { Layout, Menu, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import oxo from "../assets/oxo.svg";
const { Header } = Layout;

const items1 = [
  {
    key: "user",
    label: <Typography.Link href="/user">使用者</Typography.Link>,
  },
  { key: "card", label: <Typography.Link href="/card">卡片</Typography.Link> },
];

interface Props {
  children: ReactNode;
}

const PageLayout = (props: Props) => {
  const { children } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const pathName = location.pathname.replace("/", "");
  const selectedKey = pathName === "" ? "user" : pathName;

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: 60,
          backgroundColor: "#ffffff",
        }}
      >
        <img src={oxo} alt="Logo" width={40} height={30} />
        <Menu
          mode="horizontal"
          items={items1}
          selectedKeys={[selectedKey]}
          onClick={(e) => navigate(`/${e.key}`)}
        />
      </Header>
      <Layout style={{ height: "calc(100vh - 60px)", padding: "20px 48px" }}>
        {children}
      </Layout>
    </Layout>
  );
};
export default PageLayout;
