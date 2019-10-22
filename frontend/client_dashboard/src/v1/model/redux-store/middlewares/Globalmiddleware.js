import { compose, applyMiddleware } from 'redux'; 
import saga from 'redux-saga';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const sagaMiddleware = saga();

export default composeEnhancer(applyMiddleware(sagaMiddleware));