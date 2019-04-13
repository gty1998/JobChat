import axios from 'axios'
import {getRedirectPath} from '../util'
const AUTH_SUCCESS='AUTH_SUCCESS'
const ERROR_MSG='ERROR_MSG'
const LOAD_DATA='LOAD_DATA'
const LOGOUT='LOGOUT'
const initState={
    redirectTo:'',
    msg:null,
    user:'',
    pwd:'',
    type:''
}

export function user(state=initState,action){
    switch(action.type){
        case AUTH_SUCCESS:
          return {...state,msg:'',redirectTo:getRedirectPath(action.data),...action.data}
        case LOAD_DATA:
          return {...state,...action.data}
        case ERROR_MSG:
          return {...state,isAuth:false,msg:action.msg}
        case LOGOUT:
          return {...initState,redirectTo:'/login'}
        default: 
            return state
    }
}
function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}
function authSuccess(data){
    return {type:AUTH_SUCCESS,data}
}

export function update(data){
    return dispatch=>{
        axios.post('/user/update',data).then(res=>{
            if(res.status==200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function loadData(data){
	return { type:LOAD_DATA, data}
}
export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('请输入用户名或密码')
    }
    if(pwd!==repeatpwd){
        return errorMsg('两次密码不一致')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
        .then(res=>{
            if(res.status==200&&res.data.code===0){
                dispatch(authSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('请输入用户名或密码')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then(res=>{
            if(res.status==200&&res.data.code==0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function logoutSubmit(){
     return {type:LOGOUT}
}