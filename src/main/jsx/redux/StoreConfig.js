import {createStore,applyMiddleware,compose, bindActionCreators} from 'redux';
import createSagaMiddleware  from 'redux-saga';
import modules from './modules';
import {RootSaga} from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware()

const StoreConfig = () =>{
    const store = createStore(modules,composeEnhancers(
        applyMiddleware(sagaMiddleware)
    ));
    sagaMiddleware.run(RootSaga)
    return store;
}


export default StoreConfig;