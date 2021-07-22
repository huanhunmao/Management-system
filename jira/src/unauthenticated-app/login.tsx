import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "utils/use-async";
// 登录函数
const login = (param: { username: string; password: string }) => {};

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync();
  // tsx 部分
  //点击提交函数
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e: any) {
      onError(e);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id="username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
