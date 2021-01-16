import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import GlobalStyle from './lib/style/GlobalStyle'

import MainRouter from './routes/MainRouter.jsx';

import StoreConfig from './redux/StoreConfig';
import { Provider } from 'react-redux';

const store = StoreConfig();

class App extends React.Component {
    
    render() {
        return(
            <FullLayout>
                <MainRouter/>
            </FullLayout>
        );
    }

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