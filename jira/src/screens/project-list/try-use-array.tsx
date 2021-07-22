// 测试自定义的hook
import React, { useState } from "react";
import { useArray, useMount } from "utils/index";
export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 22 },
    { name: "test", age: 25 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);
  useMount(() => {
    //     console.log(value.notExist)
    //    add({name:"test"})
    //    removeIndex('123')
  });
  return (
    <div>
      <button onClick={() => add({ name: "cjk", age: 9 })}>add</button>
      <button onClick={() => removeIndex(0)}>removeIndex</button>
      <button onClick={() => clear()}>clear</button>
      {value.map((person, index) => (
        <div key={index}>
          <span>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};

export default TsReactTest;
