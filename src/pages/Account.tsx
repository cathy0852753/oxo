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
        <Flex wrap gap={30} align="flex-start" style={{ padding: "20px 28px" }}>
          <></>
        </Flex>
      </Content>
    </PageLayout>
  );
};

export default AccountPage;
