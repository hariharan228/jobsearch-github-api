import axios from 'axios';
import { useReducer, useEffect } from 'react'

const ACTIONS = {
    MAKE_REQUEST: "make-request",
    GET_DATA: "get-data",
    ERROR: "error",
    UPDATE_HAS_NEXT_PAGE :"update-has-next-page"
}

function reducer(state, action){
    switch(action.type){
        case ACTIONS.MAKE_REQUEST:
            return { loading : true , jobs : [] }; 
            
        case ACTIONS.GET_DATA:
            return {...state, loading : false, jobs:action.payload.jobs};
            
        case ACTIONS.ERROR:
            return {...state,loading:false,error:action.payload.error,jobs:[]};
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return {...state,hasNextPage:action.payload.hasNextPage};
            
        default:
            return state;
    }
}

export default function useFetchJobs(params, page) {
const [state, dispatch] = useReducer(reducer, {jobs:[], loading:true})
const BASE_URL = 'https://vast-beyond-06954.herokuapp.com/https://jobs.github.com/positions.json'
const cancelToken = axios.CancelToken.source();
const cancelToken2 = axios.CancelToken.source();
useEffect(()=>{
    dispatch({type:ACTIONS.MAKE_REQUEST});
    axios.get(BASE_URL,{
        cancelToken:cancelToken.token,
        params:{ markdown:true, page:page,...params}
    }).then(res=>{
        dispatch({type:ACTIONS.GET_DATA,payload:{jobs:res.data}});
    }).catch(err=>{
        if(axios.isCancel(err)){
            return;
        }
        dispatch({type:ACTIONS.ERROR,payload:{error:err}});
    })
    axios.get(BASE_URL,{
        cancelToken2:cancelToken.token,
        params:{ markdown:true, page:page+1,...params}
    }).then(res=>{
        dispatch({type:ACTIONS.UPDATE_HAS_NEXT_PAGE,payload:{hasNextPage:res.data.length!==0}});
    }).catch(err=>{
        if(axios.isCancel(err)){
            return;
        }
        dispatch({type:ACTIONS.ERROR,payload:{error:err}});
    })
    
    return()=>{
        cancelToken.cancel();
        cancelToken2.cancel();
    }
},[params,page])
 return state;
}