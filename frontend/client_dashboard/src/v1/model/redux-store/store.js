import { createStore } from 'redux';
import Globalreducer from './reducers/Globalreducer';
import Globalmiddleware, { sagaMiddleware } from './middlewares/Globalmiddleware';
import Globalsaga from './middlewares/saga/Globalsaga';

const store = createStore(Globalreducer, Globalmiddleware);

sagaMiddleware.run(Globalsaga);

export default store;