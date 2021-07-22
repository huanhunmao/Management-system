import React, { useState, useEffect } from "react";
import { SearchPanal } from "./search-panel";
import { List } from "./list";
import { cleanObject, useMount, useDebounce } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import { Typography } from "antd";
import { useAsync } from "utils/use-async";

const apiUrl = process.env.REACT_APP_API_URL; //使用定义的.env
export const ProjectListScreen = () => {
  // 项目名称 ID
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // 负责人 可展开列表
  const [users, setUsers] = useState([]);
  // 列表 服务下面
  // const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 200);

  // //需要定义一个 isLoading 控制loading
  // const [isLoading, setIsLoading] = useState(false);

  // //出错
  // const [error, setError] = useState<Error | null>(null);
  //合并
  const { run, isLoading, error, data: list } = useAsync<[]>();
  //使用 http.ts 内定义的自定义hook
  const client = useHttp();
  //获取接口 param改变就获取
  useEffect(() => {
    run(client("projects", { data: cleanObject(debouncedParam) }));
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <div>
      <SearchPanal users={users} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list || []} />
    </div>
  );
};
