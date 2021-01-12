import React,{useEffect} from 'react';
import styled from 'styled-components';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {Home, About, NotFound, Community, Schedule, Login, SignUp ,Profile} from './pages';
import Header from '../containers/Header.jsx';
import {getAccountFetch} from '../redux/modules/Account';
import { useDispatch } from 'react-redux';

const MainRouter = () =>{
    const dispatch = useDispatch();

    useEffect(()=>{
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
                    <Route path="/profile/:id" component={Profile}/>
                    <Route component ={NotFound}/>
                </Switch>
            </WebPage>
        </Router>
    )
}

const WebPage = styled.div`
    padding:0 2em;
    padding-top:55px;
    width:100%;
    height:100%;
`
export default MainRouter;