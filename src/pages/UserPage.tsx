import { Button, Table } from "antd";
import { useQuery } from "react-query";
import { TableProps } from "antd/lib/table/Table";
import { SettingOutlined } from "@ant-design/icons";

import { getUsersApi, UserInterface } from "../lib/services/users";
import { apiDataGetter } from "../lib/services/apiClient";
import { customFilters, filters, formatters } from "../lib/helpers/tableHelpers";
import useClientPagination from "../lib/hooks/useClientPagination";

const UserPage = () => {
  const { status, data } = useQuery("users", () => getUsersApi().then(apiDataGetter));
  const tableProps = useClientPagination<UserInterface>({
    status,
    data: data?.users,
    customFilter: {
      email: customFilters.keyword,
      createdAt: customFilters.date,
    },
  });

  const columns: TableProps<UserInterface>["columns"] = [
    {
      title: "아이디",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
      ...filters.keyword,
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      render: formatters.gender,
      ...filters.gender,
    },
    {
      title: "가입일",
      dataIndex: "createdAt",
      key: "createdAt",
      render: formatters.date,
      ...filters.date,
    },
    {
      title: "액션",
      dataIndex: "id",
      key: "action",
      render: (id: number) => <Button shape="circle" icon={<SettingOutlined />} />,
    },
  ];

  return <Table {...tableProps} columns={columns} />;
};

export default UserPage;
