import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginForm from './LoginForm.jsx';
import { LogInApi } from '../lib/api/account/AccountApi';
import * as authActions  from '../redux/modules/Account';

class Login extends React.Component{
    
    constructor(props){
        super();
        
        this.handleChange = this.handleChange.bind(this);
        this.handleEnterKey = this.handleEnterKey.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    handleEnterKey(e){
        if(e.key == 'Enter'){
            this.handleLogIn();
        }
    }

    handleChange(e){ //로그인만 사용 -redux-
        const {AuthActions} = this.props;
        const {name,value} = e.target;

        AuthActions.changeInput({
            name,
            value
        });
    }

    handleLogIn (){
        const {AuthActions} = this.props;
        AuthActions.requestLogin();
    }

    render(){

        const {handleEnterKey,handleChange,handleLogIn} =this;
        return(
            <LoginForm
                onChange={handleChange}
                onKeyPress={handleEnterKey}
                LogIn ={handleLogIn}
            />
        )
    }
}

export default connect(
    (state) =>({

    }),
    (dispatch) =>({
        AuthActions: bindActionCreators(authActions,dispatch)
    })
  )(Login);