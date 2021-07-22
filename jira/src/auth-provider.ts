import {User} from 'screens/project-list/search-panel'
 
export const localStorageKey = "__auth_provider_token__"  //设置一个key
const apiUrl = process.env.REACT_APP_API_URL; //使用定义的.env
// 获取token
export const getToken = () => {
   return  window.localStorage.getItem(localStorageKey)
}

// 设置token 
export const handleUserResponse = ({user} : {user: User}) => {
    window.localStorage.setItem(localStorageKey,user.token || '')
    return user 
}

// 登录 将本来在index.tsx的fetch 拿过来 
export const login = (data:{username:string, password:string}) => {
    return (
        fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then(async (resp) => {
            if (resp.ok) {
                return handleUserResponse(await resp.json())
            }else{
                return Promise.reject(await resp.json())
            }
          }
    )
)}

//注册 拷贝上面
export const register = (data:{username:string, password:string}) => {
    return (
        fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then(async (resp) => {
            if (resp.ok) {
                return handleUserResponse(await resp.json())
            }else{
                return Promise.reject(await resp.json())
            }
          }
    )
)}

// 登出
export const logout = async  () => {
  window.localStorage.removeItem(localStorageKey)
}
