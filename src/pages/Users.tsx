import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import {
  Table,
  Layout,
  Button,
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
} from "antd";
import type { TableProps } from "antd";
import dayjs from "dayjs";

import { User } from "@share/interfaces/user";
import useUserStore from "../store/userStore";
import PageLayout from "./Layout";

import { userData } from "src/data/user";

interface modalStateRef {
  add: () => void;
  edit: (user: User) => void;
}

export default function Users() {
  const { users, setUsers } = useUserStore();
  const modalRef = useRef<modalStateRef>(null);

  useEffect(() => {
    // fetch 後端 API
    setUsers(userData);
  }, []);

  const userCol: TableProps<User>["columns"] = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        record.role === "admin" ? (
          text
        ) : (
          <a onClick={() => modalRef.current?.edit(record)}>{text}</a>
        ),
    },
    {
      title: "信箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "聯絡電話",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "生日",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "權限",
      dataIndex: "role",
      key: "role",
      render: (text) => (text === "admin" ? "系統管理者" : "一般使用者"),
    },
    {
      title: "建立時間",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  return (
    <PageLayout>
      <div style={{ padding: "20px 48px" }}>
        <div style={{ marginBottom: 10 }}>
          <Button type="primary" onClick={() => modalRef.current?.add()}>
            新增人員
          </Button>
        </div>
        <Table
          columns={userCol}
          dataSource={users}
          pagination={false}
          rowKey={"id"}
          scroll={{ y: "calc(100vh - 250px)" }}
        />
      </div>
      <AddUserModal ref={modalRef} />
    </PageLayout>
  );
}

const AddUserModal = forwardRef<modalStateRef>((props, ref) => {
  const { users, addUser, editUser } = useUserStore();
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [originUser, setOriginUser] = useState<User>();
  const [title, setTitle] = useState("");

  const [form] = Form.useForm();
  useImperativeHandle(ref, () => {
    return {
      add() {
        setShowAddUserModal(true);
        setTitle("新增人員");
      },
      edit(user) {
        setShowAddUserModal(true);
        setIsEdit(true);
        setTitle("編輯人員");
        setOriginUser(user);
        form.setFieldsValue({
          user_name: user.name,
          user_phone: user.phone,
          user_email: user.email,
          user_gender: user.gender,
          user_birthday: dayjs(user.birthday),
        });
      },
    };
  });

  const handleCancel = () => {
    form.resetFields();
    setShowAddUserModal(false);
  };

  const handleOk = () => {
    form.submit();
  };

  const onFinish = (values: any) => {
    if (isEdit && originUser) {
      const user: User = {
        ...originUser,
        name: values.user_name,
        email: values.user_email,
        phone: values.user_phone,
        gender: values.user_gender,
        birthday: dayjs(values.user_birthday).format("YYYY-MM-DD"),
      };
      editUser(originUser.id, user);
    } else {
      const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
      const user: User = {
        id: maxId + 1,
        name: values.user_name,
        email: values.user_email,
        phone: values.user_phone,
        gender: values.user_gender,
        birthday: dayjs(values.user_birthday).format("YYYY-MM-DD"),
        role: values.role || "user",
        is_active: values.is_active ?? false,
        created_at: new Date().toISOString(),
      };
      addUser(user);
    }
    handleCancel();
  };

  return (
    <Modal
      open={showAddUserModal}
      title={title}
      onCancel={handleCancel}
      onOk={handleOk}
      cancelText="取消"
      okText="確定"
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        style={{ marginTop: 20 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="姓名"
          name="user_name"
          rules={[{ required: true, message: "請填寫姓名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="信箱"
          name="user_email"
          rules={[{ required: true, message: "請填寫信箱" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="聯絡電話" name="user_phone">
          <Input />
        </Form.Item>
        <Form.Item label="性別" name="user_gender">
          <Radio.Group
            options={[
              { value: "female", label: "女性" },
              { value: "male", label: "男性" },
            ]}
          />
        </Form.Item>
        <Form.Item label="生日" name="user_birthday">
          <DatePicker format={"YYYY-MM-DD"} />
        </Form.Item>
      </Form>
    </Modal>
  );
});
