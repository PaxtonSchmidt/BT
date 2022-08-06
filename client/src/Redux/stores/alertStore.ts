import { useDispatch } from 'react-redux';
import { applyMiddleware, Dispatch, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import alertReducer from '../reducers/alertReducer';

export const alertStore = createStore(alertReducer, {}, applyMiddleware(thunk));
