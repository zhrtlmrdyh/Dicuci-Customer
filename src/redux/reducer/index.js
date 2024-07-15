import {combineReducers} from 'redux';
import {registerReducer, photoReducer, authReducer} from './auth';
import {globalReducer} from './global';
import {homeReducer} from './home';
import { myorderReeducer } from './myorder';
import { cashierReducer } from './cashier';
import { laundryBagReducer } from './laundry';
import { userReducer } from './auth';

const reducer = combineReducers({
  registerReducer,
  globalReducer,
  photoReducer,
  authReducer,
  homeReducer,
  myorderReeducer,
  cashierReducer,
  laundryBagReducer,
  userReducer,
});

export default reducer;
