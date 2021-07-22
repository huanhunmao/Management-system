import React, { useEffect, useState } from "react";

//处理0
export const isFalsy = (value: unknown) => (value === 0 ? false : !value); // 两个叹号变成布尔值

//防止值为 false时被删掉
export const isViod = (value: unknown) =>
  value === undefined || value === null || value === "";
//对象解构类型
// let a : object
// a = {ban :'fd'}
// a = () => {}
// a = new RegExp('')

// let b = {...a}   // {}

// 在函数中 直接改变对象本身不好
export const cleanObject = (object: { [key: string]: unknown }) => {
  // 等价于 Object.assign({},object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isViod(value)) {
      delete result[key];
    }
  });
  return result;
};

//自定义 useMount  hook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// debounce 函数防抖
// const debounce = (func, delay) => {
//   let timeout;
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function () {
//       func(...param);
//     }, delay);
//   };
// };

// const log = debounce(() => console.log("call"), 5000);
// log();
// log();
// log();
// log();

//有了上面的基础 写一下 useDebounce
// export const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);
//   useEffect(() => {
//     //每次value变化之后 设置一个定时器
//     const timeout = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);
//     // 每次在上一个useEffect处理完后再运行
//     return () => clearTimeout(timeout);
//   }, [value, delay]); //[]内的值变化 会触发 useEffect
//   return debouncedValue;
// };

// 函数 防抖
export const useDebounce = (value: unknown, delay?: number): any => {
  const [debouncedValue, setdebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setdebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

interface T {
  name: string;
  age: number;
}
// 自定义hook  useArray
export const useArray = (initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]), //原来的值解构出来并将 新值加上
    clear: () => setValue([]), // 清空
    removeIndex: (index: number) => {
      const copy = [...value]; //复制
      copy.splice(index, 1); // splice使用
      setValue(copy);
    },
  };
};

export default useArray;
