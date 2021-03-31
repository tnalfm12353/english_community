import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import GlobalStyle from './lib/style/GlobalStyle'

import {getAccountFetch} from './redux/modules/Account';
import { useDispatch } from 'react-redux';
import MainRouter from './routes/MainRouter.jsx';

import StoreConfig from './redux/StoreConfig';
import { Provider } from 'react-redux';

const store = StoreConfig();

const App = () => {
    
    const dispatch = useDispatch();

    useEffect(()=>{
        if(localStorage.getItem('jwt') != null){
             dispatch(getAccountFetch());
        }
    },[])

    return(
        <FullLayout>
            <MainRouter/>
        </FullLayout>
    );

}


const FullLayout = styled.div `
    width:100%;
    height: auto;
    background-color: #fafafa;
`
ReactDOM.render(
    <Provider store={store}>
        <GlobalStyle/>
        <App/>
    </Provider>, document.getElementById('root'));