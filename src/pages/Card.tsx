import React, {
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Card,
  Flex,
  Form,
  Input,
  InputNumber,
  Layout,
  Modal,
  Select,
  Space,
  Tag,
  Tooltip,
} from "antd";
import type { SelectProps } from "antd";

import useCrochetPatternStore from "../store/crochetStore";
import { CrochetPattern, TagsColor } from "@share/interfaces/crochet";
import { levelColors, DifficultyLevel } from "../components/color";
import { difficultyText } from "../components/constants";
import CrochetInput from "../components/CrochetInput";
import PageLayout from "./Layout";

import "../css/Card.css";
import oxo from "../assets/oxo.png";

const { Meta } = Card;
const { Content, Sider } = Layout;
type TagRender = SelectProps["tagRender"];

interface modalStateRef {
  add: () => void;
  show: (crochetPattern: CrochetPattern) => void;
  edit: (crochetPattern: CrochetPattern) => void;
}

interface CardModalProps {
  onEdit: (id: number, crochet: CrochetPattern) => void;
  onAdd: (crochet: CrochetPattern) => void;
  tags: TagsColor[];
}

interface CrochetCard {
  crochetPattern: CrochetPattern;
  tags: TagsColor[];
  cardModalRef: RefObject<modalStateRef | null>;
}

const CardModal = forwardRef<modalStateRef, CardModalProps>((props, ref) => {
  const { onAdd, onEdit, tags } = props;
  const [showCardModal, setShowCardModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [crochetPattern, setCrochetPattern] = useState<CrochetPattern>();
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => {
    return {
      add() {
        setShowCardModal(true);
        setModalProps({
          title: "新增織圖",
        });
      },
      show(crochetPattern) {
        setShowCardModal(true);
        setIsShow(true);
        setCrochetPattern(crochetPattern);
        setModalProps({
          title: "檢視織圖資訊",
          footer: null,
          maskClosable: true,
        });
      },
      edit(crochetPattern) {
        setShowCardModal(true);
        setIsEdit(true);
        form.setFieldsValue(crochetPattern);
        setModalProps({
          title: "編輯織圖",
        });
      },
    };
  });

  const handleCancel = () => {
    form.resetFields();
    setIsShow(false);
    setIsEdit(false);
    setShowCardModal(false);
  };

  const handleOk = () => {
    form.submit();
  };

  const onFinish = (values: any) => {
    console.log(values);
    const newCrochet: CrochetPattern = { ...values };
    if (isEdit && crochetPattern) {
      onEdit(crochetPattern?.id, newCrochet);
    } else {
      onAdd(newCrochet);
    }
    handleCancel();
  };

  const BuildEditFormItem = () => (
    <>
      <Form.Item
        label="摘要"
        name="title"
        rules={[{ required: true, message: "請填寫摘要" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="難易度" style={{ marginBottom: 0 }}>
        <Space size={15}>
          <Form.Item name="difficulty">
            <Select
              style={{ width: 150 }}
              options={[
                { label: difficultyText.beginner, value: "beginner" },
                { label: difficultyText.intermediate, value: "intermediate" },
                { label: difficultyText.advanced, value: "advanced" },
              ]}
            />
          </Form.Item>

          <Form.Item label="耗時" style={{ marginBottom: 0 }}>
            <Space>
              <Form.Item name="estimatedTime_1">
                <InputNumber />
              </Form.Item>
              <Form.Item name="estimatedTime_2">
                <Select
                  options={[
                    { label: "小時", value: "hour" },
                    { label: "分鐘", value: "minute" },
                  ]}
                />
              </Form.Item>
            </Space>
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item label="標籤" name="tags">
        <Select
          mode="tags"
          style={{ width: "100%" }}
          placeholder="請輸入標籤"
          options={tags}
        />
      </Form.Item>

      <Form.Item label="線材" name="yarn">
        <Input />
      </Form.Item>

      <Form.Item label="勾針大小" name="hookSize">
        <Input />
      </Form.Item>

      <Form.Item
        label="文字圖解"
        name="diagramSteps"
        tooltip="按 Enter 可新增下一行，圈數格式：R1、R1-5"
      >
        <CrochetInput />
      </Form.Item>

      <Form.Item label="備註" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>
    </>
  );

  const BuildShowFormItem = ({
    crochetPattern,
  }: {
    crochetPattern?: CrochetPattern;
  }) => {
    const difficulty = crochetPattern?.difficulty ?? "beginner";
    const timeUnit =
      crochetPattern?.estimatedTime_2 === "hour" ? "小時" : "分鐘";
    const tags: string[] = crochetPattern?.tags ?? [];

    return (
      <>
        <Form.Item label="摘要">
          <span>{crochetPattern?.title}</span>
        </Form.Item>

        <Form.Item label="難易度" style={{ marginBottom: 0 }}>
          <Space size={50}>
            <Form.Item style={{ marginBottom: 0 }}>
              <span>{difficultyText[difficulty]}</span>
            </Form.Item>
            <Form.Item label="耗時" style={{ marginBottom: 0 }}>
              <span>
                {crochetPattern?.estimatedTime_1} {timeUnit}
              </span>
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item label="標籤">
          {tags.map((tag, idx) => (
            <Tag key={idx}>{tag}</Tag>
          ))}
        </Form.Item>

        <Form.Item label="線材">
          <span>{crochetPattern?.yarn}</span>
        </Form.Item>

        <Form.Item label="勾針大小">
          <span>{crochetPattern?.hookSize}</span>
        </Form.Item>

        <Form.Item label="文字圖解">
          <div style={{ whiteSpace: "pre-wrap", padding: 5 }}>
            {(crochetPattern?.diagramSteps || []).join("\n")}
          </div>
        </Form.Item>

        <Form.Item label="備註">
          <div style={{ whiteSpace: "pre-wrap", padding: 5 }}>
            {crochetPattern?.description}
          </div>
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      open={showCardModal}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
      cancelText="取消"
      okText="確定"
      maskClosable={false}
      {...modalProps}
    >
      <Form
        form={form}
        labelCol={{ span: 5 }}
        style={{ marginTop: 20 }}
        onFinish={onFinish}
        initialValues={{
          difficulty: "beginner",
          estimatedTime_2: "hour",
        }}
      >
        {isShow ? (
          <div className="card-show">
            <BuildShowFormItem crochetPattern={crochetPattern} />
          </div>
        ) : (
          <BuildEditFormItem />
        )}
      </Form>
    </Modal>
  );
});

const CrochetPatternCard = ({
  crochetPattern,
  tags,
  cardModalRef,
}: CrochetCard) => {
  const buildTitle = (title: string, difficulty: keyof DifficultyLevel) => {
    const color = levelColors[difficulty];
    const levlelTitle = difficultyText[difficulty];
    return (
      <div
        style={{
          display: "inline-flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <h3>{title}</h3>
        <Tooltip title={levlelTitle}>
          <div
            className="flash_dot"
            style={{
              backgroundColor: color,
              boxShadow: `0px 0px 2px 3px ${color}`,
              animation: "pulse 1.5s infinite ease-in-out",
            }}
          ></div>
        </Tooltip>
      </div>
    );
  };

  return (
    <Card
      key={crochetPattern.id}
      hoverable
      style={{
        width: 300,
      }}
      cover={
        <img style={{ opacity: 0.3 }} alt="example" src={oxo} height={150} />
      }
      onClick={() => cardModalRef.current?.show(crochetPattern)}
      extra={
        <EditOutlined
          key="edit"
          onClick={(e) => {
            e.stopPropagation();
            cardModalRef.current?.edit(crochetPattern);
          }}
        />
      }
    >
      <Meta
        title={buildTitle(crochetPattern.title, crochetPattern.difficulty)}
        description={
          <Flex vertical gap={15} style={{ height: 80 }}>
            <div style={{ height: 50 }}>
              <span className="card-description">
                {crochetPattern.description}
              </span>
            </div>
            <div>
              {crochetPattern.tags?.map((tag) => {
                const color = tags.find((t) => t.value === tag);
                return (
                  <Tag
                    key={tag}
                    color={`${color?.color}66`}
                    style={{ color: color?.textColor }}
                  >
                    {tag}
                  </Tag>
                );
              })}
            </div>
          </Flex>
        }
      ></Meta>
    </Card>
  );
};

const CardPage = () => {
  const {
    crochetPatterns,
    fetchCrochet,
    tags,
    addCrochetPattern,
    editCrochetPattern,
  } = useCrochetPatternStore();
  const defaultCategories: string[] = ["全部", "動物", "髮飾", "杯墊", "其他"];
  const [selectTag, setSelectTag] = useState("全部");
  const cardModalRef = useRef<modalStateRef | null>(null);

  useEffect(() => {
    fetchCrochet();
  }, []);

  const TagButton = (tag: string) => {
    return (
      <div
        key={tag}
        className="card"
        style={{
          backgroundColor: selectTag == tag ? "#F2A490" : "#fafafa",
          border: selectTag == tag ? "1px solid #F2A490" : "",
        }}
        onClick={() => setSelectTag(tag)}
      >
        {tag}
      </div>
    );
  };

  const AddButton = () => {
    return (
      <div
        key={"add"}
        className="card"
        style={{
          backgroundColor: "#fafafa",
          border: "1px dashed gray",
        }}
        onClick={() => cardModalRef.current?.add()}
      >
        <Space>
          <PlusOutlined />
          新增織圖
        </Space>
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
          marginTop: 8,
        }}
      >
        <AddButton />
        {defaultCategories.map((tag) => TagButton(tag))}
      </Sider>
      <Content style={{ overflowY: "auto" }}>
        <Flex wrap gap={30} align="flex-start" style={{ padding: "20px 28px" }}>
          {cardData.map((crochetPattern) => (
            <CrochetPatternCard
              key={crochetPattern.id}
              crochetPattern={crochetPattern}
              tags={tags}
              cardModalRef={cardModalRef}
            />
          ))}
        </Flex>
      </Content>
      <CardModal
        ref={cardModalRef}
        onEdit={(id, crochet) => editCrochetPattern(id, crochet)}
        onAdd={(crochet) => addCrochetPattern(crochet)}
        tags={tags}
      />
    </PageLayout>
  );
};

export default CardPage;
