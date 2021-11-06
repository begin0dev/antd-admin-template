import { ReactNode } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Avatar, Dropdown, Layout, Menu, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

import { palette } from "../styles/open-color.styles";
import { RootState, useAppDispatch } from "../stores";
import { userActions } from "../stores/user";
import Sidebar from "./Sidebar";

const { Header, Sider, Content } = Layout;

interface PropsInterface {
  children: ReactNode;
}

const PageTemplate = ({ children }: PropsInterface) => {
  const dispatch = useAppDispatch();

  const { currentUser } = useSelector((root: RootState) => root.user, shallowEqual);

  const onClickLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <LayoutSection>
      <Sider width={240}>
        <LogoSection>antd템플릿</LogoSection>
        <Sidebar />
      </Sider>
      <Layout>
        <CustomHeader>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item onClick={onClickLogout} key="logout">
                  로그아웃
                </Menu.Item>
              </Menu>
            }
          >
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <UserButton>
              <Space>
                <CustomAvatar icon={<UserOutlined />} />
                {currentUser?.username}
              </Space>
            </UserButton>
          </Dropdown>
        </CustomHeader>
        <CustomContent>{children}</CustomContent>
      </Layout>
    </LayoutSection>
  );
};

export default PageTemplate;

const LayoutSection = styled(Layout)`
  height: 100%;
`;
const LogoSection = styled.section`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > img + img {
    margin-left: 12px;
  }
`;
const CustomHeader = styled(Header)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${palette.white};
`;
const UserButton = styled.a`
  width: 120px;
  color: ${palette.gray_9};
`;
const CustomAvatar = styled(Avatar)`
  margin-left: 5px;
  background-color: ${palette.green_5};
`;
const CustomContent = styled(Content)`
  padding: 24px;
  overflow-y: scroll;
`;
