import React,{useEffect} from 'react';
import styled from 'styled-components';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {Home, About, NotFound, Community, Schedule, Login, SignUp} from './pages';
import Header from '../containers/Header.jsx';
import {getAccountFetch} from '../redux/modules/Account';
import { useDispatch } from 'react-redux';

const MainRouter = () =>{
    const dispatch = useDispatch();

    useEffect(()=>{
        // jwt토큰 사용 방법을 더 공부한후 자동로그인을 만들자.
        if(localStorage.getItem('jwt') != null){
             dispatch(getAccountFetch());
        }
    })

    return(
        <Router>
            <Header/>
            <WebPage>
                <Switch>
                    <Route exact path = "/" component={Home}/>
                    <Route path = "/about" component={About}/>
                    <Route path="/community" component={Community}/>
                    <Route path="/schedule" component={Schedule}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signUp" component={SignUp}/>
                    
                    <Route component ={NotFound}/>
                </Switch>
            </WebPage>
        </Router>
    )
}

const WebPage = styled.div`
    padding:0 2em;
    padding-top:55px;
`
export default MainRouter;