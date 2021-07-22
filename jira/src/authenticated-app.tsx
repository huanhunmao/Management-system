import styled from "@emotion/styled";
import { Button, Divider, Dropdown, Menu } from "antd";
import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { Row } from "../src/components/lib";
import logo from "./assets/imgs/test_photo.png";
export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <div>
      <Container>
        <Header between={true}>
          <HeaderLeft gap={true}>
            <img src={logo} style={{ width: "2rem", height: "2rem" }} />
            <h3>项目</h3>
            <h3>用户</h3>
          </HeaderLeft>
          <HeaderRight>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key={"logout"}>
                    <a onClick={logout}>登出</a>
                  </Menu.Item>
                </Menu>
              }
            >
              <a onClick={(e) => e.preventDefault()}>Hi,{user?.name}</a>
            </Dropdown>
          </HeaderRight>
        </Header>
        {/* <Nav>Nav</Nav> */}
        <Main>
          <ProjectListScreen />
        </Main>
        {/* <Aside>Aside</Aside> */}
        {/* <Footer>Footer</Footer> */}
      </Container>
    </div>
  );
};

// const PageHeader = styled.header`
//   height: 6rem;
//   background: pink;
// `;

// const Main = styled.main`
//   height: calc(100vh - 6rem);
// `;

// gird 容器
const Container = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-areas:
    "header header header"
    "main main main"
    "footer footer footer";
  height: 100vh;
  grid-gap: 10rem;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  grid-area: header;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
  margin-top: -7rem;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;
