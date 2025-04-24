import { Flex, Layout } from "antd";
import PageLayout from "./Layout";

const { Content, Sider } = Layout;

const AccountPage = () => {
  return (
    <PageLayout>
      <Sider
        width={200}
        style={{
          background: "white",
          display: "flex",
          justifyContent: "center",
          padding: 10,
          marginTop: 8,
        }}
      ></Sider>
      <Content style={{ overflowY: "auto" }}>
        <div
          style={{
            margin: "20px 28px",
            backgroundColor: "white",
            height: "calc(100% - 40px)",
            borderRadius: 8,
          }}
        >
          <></>
        </div>
      </Content>
    </PageLayout>
  );
};

export default AccountPage;
