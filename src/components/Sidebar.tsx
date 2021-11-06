import { Menu, Space } from "antd";
import { useLocation, Link } from "react-router-dom";

import { UserSwitchOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

const navi = [
  {
    title: "회원",
    icon: <UserSwitchOutlined />,
    children: [
      {
        title: "회원목록",
        pathname: "/users",
      },
    ],
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[pathname]}
      defaultOpenKeys={navi.map((group) => group.title)}
    >
      {navi.map((group) => (
        <SubMenu
          title={
            <Space>
              {group.icon}
              {group.title}
            </Space>
          }
          key={group.title}
        >
          {group.children.map((item) => (
            <Menu.Item key={item.pathname}>
              <Link to={item.pathname}>{item.title}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};

export default Sidebar;
