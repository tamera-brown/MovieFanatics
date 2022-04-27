import { createStore } from 'redux'
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import rootReducer from '../reducers/reducers'

const store =createStore(rootReducer);

export default store