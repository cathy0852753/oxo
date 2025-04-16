import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Flex, Layout, Menu, Select, Tag } from "antd";

import PageLayout from "./Layout";
import useCrochetPatternStore from "src/store/crochetPatternStore";
import {
  CrochetPattern,
  crochetPatternsData,
} from "@share/interfaces/crochetPattern";
import { colorWarn, candyCuteWarmColors } from "src/components/color";

const { Meta } = Card;
const { Header, Content, Sider } = Layout;

const CrochetPatternCard = (crochetPattern: CrochetPattern) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <div
          style={{
            backgroundColor: candyCuteWarmColors[Math.floor(Math.random() * 5)],
            height: 200,
            opacity: 0.5,
          }}
        ></div>
        // <img
        //   alt="example"
        //   src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        // />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        title={crochetPattern.title}
        description={crochetPattern.tags.map((tag) => (
          <Tag>{tag}</Tag>
        ))}
      />
    </Card>
  );
};

const CardPage = () => {
  const { crochetPatterns, setCrochetPatterns } = useCrochetPatternStore();
  const defaultCategories: string[] = ["全部", "動物", "髮飾", "杯墊", "其他"];
  const [selectTag, setSelectTag] = useState("全部");

  useEffect(() => {
    setCrochetPatterns(crochetPatternsData);
  }, []);

  const TagButton = (tag: string) => {
    return (
      <div
        style={{
          width: 180,
          height: 30,
          borderRadius: 8,
          margin: "5px 10px",
          backgroundColor: selectTag == tag ? "#F2A490" : "#fafafa",
          justifyContent: "center",
          alignItems: "center",
          display: "inline-flex",
          border: selectTag == tag ? "1px solid #F2A490" : "",
        }}
        onClick={() => setSelectTag(tag)}
      >
        {tag}
      </div>
    );
  };

  const cardData = crochetPatterns.filter((data) =>
    selectTag == defaultCategories[0]
      ? true
      : selectTag == defaultCategories[defaultCategories.length - 1]
      ? !data.tags.some((item) => defaultCategories.includes(item))
      : data.tags.includes(selectTag)
  );

  return (
    <PageLayout>
      <Sider
        width={200}
        style={{
          background: "white",
          display: "flex",
          justifyContent: "center",
          padding: 10,
        }}
      >
        {defaultCategories.map((tag) => TagButton(tag))}
      </Sider>
      <Content style={{ overflowY: "scroll" }}>
        <Flex wrap gap={30} align="flex-start" style={{ padding: "20px 28px" }}>
          {cardData.map((crochetPattern) => CrochetPatternCard(crochetPattern))}
        </Flex>
      </Content>
    </PageLayout>
  );
};

export default CardPage;
