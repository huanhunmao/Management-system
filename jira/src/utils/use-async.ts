import React,{useState} from "react";

interface State<D> {
    error : Error | null;
    data : D | null;
    stat : 'idle' | 'loading' | 'error' | 'success'
}

//默认类型
const defaultInitialState : State<null> = {
    error: null,
    data : null ,
    stat : 'idle'
}

//initialState表示用户传入的属性 优先级高于默认的default
export const useAsync = <D>(initialState ?: State<D>) => {
    const [state,setState] = useState({
        ...defaultInitialState,
        ...initialState
    })

    //成功时
    const setData = (data:D) => setState({
        data,
        stat:'success',
        error:null
    })
    //失败
    const setError = (error:Error) => setState({
        error,
        stat: 'error',
        data : null
    })
    //run 用来 触发异步请求
    const run = (promise:Promise<D>) => {
        //先排除传入非promise情况
        if(!promise || !promise.then ) {
            throw new Error('请传入 Promise类型')
        }
        //loading开始
        setState({...state,stat:'loading'})
        //成功请求时
        return promise.then(data => {
            setData(data) // 触发上面的setData函数 
            return data     //返回data
        })
        //请求出错时
        .catch((error) => {
            setError(error)
            return error
        })
    }

    //返回什么东西呢
    return {
        isIdle: state.stat === 'idle',
        isLoading : state.stat === 'loading',
        isError : state.stat === 'error',
        isSuccess : state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }
      
    
}