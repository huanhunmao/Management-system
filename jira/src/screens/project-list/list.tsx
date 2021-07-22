import { Table, TableProps } from "antd";
import React from "react";
import { User } from "./search-panel";
import dayjs from "dayjs";
interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: string;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}
export const List = ({ users, ...porps }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name), //中文排序
        },
        {
          title: "项目",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知名称"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...porps}
    />
  );
};
