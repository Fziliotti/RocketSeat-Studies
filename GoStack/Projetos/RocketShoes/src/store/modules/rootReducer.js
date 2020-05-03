//  ESSE ARQUIVO SÓ TEM A FUNCIONALIDADE DE JUNTAR TODOS OS REDUCERS AQUI
import { combineReducers } from 'redux';

import cart from './cart/reducer';

export default combineReducers({
  cart,
})
