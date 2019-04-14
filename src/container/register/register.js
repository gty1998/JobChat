import React from 'react'
import Logo from '../../component/logo/Logo.js'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import imoccForm from '../../component/imocc-form/imocc-form'
@connect(
    state=>state.user,
    {register}
)
@imoccForm
class Register extends React.Component{
    constructor(props){
        super(props)
        this.handleRegister=this.handleRegister.bind(this)
    }
    componentDidMount(){
        this.props.handleChange('type','genius')
    }
    handleRegister(){
        this.props.register(this.props.state)
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
                    <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem onChange={v=>this.props.handleChange('pwd',v)} type='password'>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem onChange={v=>this.props.handleChange('repeatpwd',v)} type='password'>确认密码</InputItem>
                    <WhiteSpace/>
                </List>
                <RadioItem checked={this.props.state.type==='genius'}
                onChange={v=>this.props.handleChange('type','genius')}
                >
                    牛人
                </RadioItem>
                <RadioItem checked={this.props.state.type==='boss'}
                onChange={v=>this.props.handleChange('type','boss')}>
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