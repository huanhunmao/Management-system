import qs from "qs";
import * as auth from 'auth-provider'
import { useAuth } from "context/auth-context";
export const apiUrl = process.env.REACT_APP_API_URL; //使用定义的.env

interface Config extends RequestInit {
    token ?: string,
    data ?: string | object
}
export const http = async (endpoint:string,{token,headers,data,...constomConfig}:Config = {}) => {
    // 初始配置 默认是GET请求 
    const config = {
        method : "GET",
        headers:{
            'Access-Control-Allow-Origin' : `*`,
            Authorization : token ? `Bearer ${token}` : '',
            'Content-Type' : data ? 'application/json' : ''
        },
        ...constomConfig // 这个配置会覆盖掉上面 GET请求 和 headers
    }

    // get 参数携带在url上  其他请求 参数在body 内
    if(config.method.toUpperCase() === 'GET'){
        endpoint = endpoint + `?${qs.stringify(data)}`
  
    }else{
        config.body = JSON.stringify(data || {})
    }
    console.log(endpoint);

    return(
        window.fetch(`${apiUrl}/${endpoint}`,config)
            .then(async response => {
                if(response.status === 401){
                   await auth.logout()
                   window.location.reload() //刷新
                   return Promise.reject({message: '请重新登录'})
                }
                // 不为 401时
                const data = await response.json()
                if(response.ok){
                    return data
                    // 手动抛出错误 因为 fetch 只能在断网时会抛出错误 401 500都不抛出错误
                }else{
                    return Promise.reject(data)
                }
            })
    )
}


export const useHttp = () => {
    const {user} = useAuth()
    return (
  // [endpoint,config] : [string,Config]
  (...[endpoint,config]:Parameters<typeof http>) => 
    http(endpoint,{...config,token:user?.token})

    ) 
}


//联合类型
let myFavoriteNumber : string | number
myFavoriteNumber = 9
myFavoriteNumber = '9'
//不能将类型“never[]”分配给类型“string | number”。
// myFavoriteNumber = []

//类型别名 type 和 interface 很多情况下都可互换 
// interface Person {
//     name : string
// }
type Person = {
    name : string
}
const xiaowang : Person = {name : 'fhj'}


//区别 1
//类型别名 type 用在联合类型和交叉类型时 interface 无法替代 
type FavoriteNumber  = string | number
let roseFavoriteNumber : FavoriteNumber = 6

//区别 2
// interface 无法实现 Utility type  
//  这是个典型的例子 [endpoint,config]:Parameters<typeof http>


// Utility type 常规操作
type Person1 = {
    name : string,
    age : number 
}

// Pick
type Person1OnlyName = Pick<Person1,'name'>
type Person1Keys = keyof Person1  // 拿到Person1的key 'name'|'age'
// Exclude
type Age = Exclude<Person1Keys,'name'> // type Age = "age"
// partial 实现
type Partial<T> = {
    [P in keyof T] ?: T[P]
}
// const xiaoMing : Person1 = {name : 'fhj'} //报错因为少了 age
const xiaoMing : Partial<Person1> = {}  // Partial使得所有变量都是可选的
// const shenmiren : Person1 = {age: 9}    // 缺少 name 
const shenmiren : Omit<Person1,'name' | 'age'> = {}  // Omit 删除Person1属性中的第二个参数