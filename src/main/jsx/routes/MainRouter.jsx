import React from 'react';
import styled from 'styled-components';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {Home, About, NotFound, Community, Schedule, Login, SignUp ,Profile, StudyGroup} from './pages';
import Header from '../containers/Header.jsx';

const MainRouter = () =>{
    return(
        <Router>
            <Header/>
            <WebPage>
                <Switch>
                    <Route exact path = "/" component={Home}/>
                    <Route path= "/about" component={About}/>
                    <Route path="/community/:forumType" component={Community}/>
                    <Route path="/studyGroup" component={StudyGroup}/>
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

    @media only screen and (max-width:800px){
        padding:0 1em;
        padding-top:55px;
    }
`
export default MainRouter;