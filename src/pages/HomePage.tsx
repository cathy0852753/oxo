import { Card, Layout } from "antd";
import { useNavigate } from "react-router-dom";

import oxo from "../assets/oxo.svg";
import oxo_p from "../assets/oxo_p.png";
import { colorWarn } from "src/components/color";

const { Header } = Layout;
const { Meta } = Card;

interface PageGridProps {
  title: string;
  description: string;
  onclick: () => void;
}

const PageGrid = (props: PageGridProps) => {
  return (
    <Card
      key={props.title}
      hoverable
      variant="borderless"
      style={{
        width: 300,
        backgroundColor: `${colorWarn[Math.floor(Math.random() * 5)]}99`,
      }}
      onClick={props.onclick}
    >
      <Meta title={props.title} description={props.description} />
    </Card>
  );
};

export default function HomePage() {
  const navigate = useNavigate();
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
        }}
      >
        <img
          src={oxo}
          alt="Logo"
          width={40}
          height={30}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </Header>
      <Layout
        style={{
          height: "calc(100vh - 60px)",
          padding: "20px 48px",
          backgroundColor: "white",
        }}
      >
        <div style={{ display: "flex", gap: 30 }}>
          <PageGrid
            title="織圖管理"
            description="紀錄勾針文字織圖"
            key={"card"}
            onclick={() => navigate("/card")}
          />
          <PageGrid
            title="簡易記帳"
            description="月曆/表格(切換?)上顯示每天的收支"
            key={"account"}
            onclick={() => navigate("/account")}
          />
        </div>
        <div style={{ position: "absolute", right: 5, bottom: 5 }}>
          <img src={oxo_p} alt="" width={300} style={{ opacity: 0.5 }} />
        </div>
      </Layout>
    </Layout>
  );
}
