import React from 'react'
import {connect} from 'react-redux'
import {Result,List, WhiteSpace, Button,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends React.Component{
    constructor(props){
        super(props)
        this.logout=this.logout.bind(this)
    }
    logout(){
        console.log('logout')
        const alert=Modal.alert

        alert('注销', '确认退出吗', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {browserCookie.erase('userid')
              this.props.logoutSubmit()
         }},
          ]) 

    }
    render(){
            const props=this.props
            return props.user?(
            <div>
                <Result img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:50}}></img>}
                title={this.props.user}
                message={props.type=='boss'?props.company:null}></Result>
                <List renderHeader={()=>'简介'}>
                <List.Item multipleLine>
                   {props.title} 
                   {props.desc.split('\n').map(v=><List.Item.Brief key={v}>{v}</List.Item.Brief>)}
                   {props.money?<List.Item.Brief>薪资:{props.money}</List.Item.Brief>:null}
                </List.Item>
            </List>
            <WhiteSpace></WhiteSpace>
            <List>
                <List.Item onClick={this.logout}>退出登录</List.Item>
            </List>
            </div>
        ):<Redirect to={this.props.redirectTo}/>

    }
}
export default User