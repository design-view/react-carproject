import { useEffect, useReducer } from "react";

//1.상태 초기화
const initialState = {
    loading: false,
    data: null,
    error: null
}
//리듀서 함수
//로딩중일때는 상태 업데이트 LOADING
//데이터성공적으로 받을때는 SUCCESS
//에러가발생했을때 ERROR
function reducer(state,action){
    switch(action.type){
        case "LOADING":
            return {
                loading: true,
                data: null,
                error: null
            };
        case "SUCCESS":
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case "ERROR":
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            return state;
    }
}
function useAsync(callback){
    const [state, dispatch] = useReducer(reducer,initialState);
    //데이터 요청
    //디폴트 매개변수 fetchDate(값)---> 없으면 ({category:1,maker:1})
    async function fetchData(state={
        category:1,
        maker:1
    }){
        //loading의 value를 true로 상태 업데이트
        dispatch({ type:"LOADING"});
        const {category,maker} = state;
        try{
            const data = await callback(category,maker);
            dispatch({ type:"SUCCESS", data: data})
        }
        catch(e){
            dispatch({ type:"ERROR", error: e})
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
    return [state,fetchData];
}
export default useAsync;