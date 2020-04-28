export const ACTION_EDIT_A = "edit_a";
export const ACTION_ASYNCFETCH_DATA= "asyncFetch_data";


export function editA(payload){
    return {
        type:ACTION_EDIT_A,
        payload
    }
}

export  function asyncFetchData(payload){
    //return new Promise((resolve,reject)=>{
    //     setTimeout(()=>{
    //         resolve("async data")
    //     },3000)
    // }).then((res)=>{
    //     return {
    //         type:ACTION_ASYNCFETCH_DATA,
    //         payload:res
    //     }
    // })
    return dispatch=>{
         new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve(payload)
                },3000)
            }).then((res)=>{
                dispatch({
                    type:ACTION_ASYNCFETCH_DATA,
                    payload:res
                })
            })
    }
}