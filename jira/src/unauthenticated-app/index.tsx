import React, { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import { Button, Card, Divider, Typography } from "antd";
import styled from "@emotion/styled";
import logo from "../assets/imgs/test_photo.png";
import background from "../assets/imgs/zhengzhou.png";
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  //登录错误报错
  const [error, setError] = useState<Error | null>(null);
  return (
    <Container>
      <Background />
      <Header />
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        {error ? (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null}
        {isRegister ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <LongButton onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </LongButton>
      </ShadowCard>
    </Container>
  );
};

//background
const Background = styled.div`
  background: url(${background}) no-repeat;
  width: 200rem;
  height: 90rem;
  left: -25rem;
  /* top: 50%;
  left: 70%;
  transform: translate(-50%, -50%); */
  position: absolute;
`;

//LongButton
export const LongButton = styled(Button)`
  width: 100%;
`;

//标题
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

//logo
const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 5rem;
  width: 100%;
  position: relative;
  z-index: 10;
`;

//第二层
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

// 最外层
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
