import React from 'react'
import Logo from '../../component/logo/Logo.js'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
    state=>state.user,
    {register}
)
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'genius'
        }
        this.handleRegister=this.handleRegister.bind(this)
    }

    handleRegister(){
        this.props.register(this.state)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const RadioItem=Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <h2>注册</h2>
                <WingBlank>
                <List>
                    {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                    <InputItem onChange={v=>this.handleChange('user',v)}>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem onChange={v=>this.handleChange('pwd',v)} type='password'>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem onChange={v=>this.handleChange('repeatpwd',v)} type='password'>确认密码</InputItem>
                    <WhiteSpace/>
                </List>
                <RadioItem checked={this.state.type==='genius'}
                onChange={v=>this.handleChange('type','genius')}
                >
                    牛人
                </RadioItem>
                <RadioItem checked={this.state.type==='boss'}
                onChange={v=>this.handleChange('type','boss')}>
                    BOSS
                </RadioItem>
                <WhiteSpace/>
                <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Register