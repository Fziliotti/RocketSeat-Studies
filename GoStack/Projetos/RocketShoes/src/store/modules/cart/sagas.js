// ESSE SAGA é SEMELHANTE AO MIDDLEWARE QUE TEMOS NO NODEJS, INTERCEPTA AS ACTIONS, INCREMENTANDO COM MAIS FUNCIONALIDADES
// GERALMENTE O SAGA VAI SER RESPONSÁVEL POR FAZER VERIFICAÇÕES ASSINCRONAS, CHAMADAS A APIS, OU SEJA 'OPERACOES DE SIDE EFFECT', USAMOS O SAGA
import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { addToCartSuccess, updateAmountSuccess } from './actions';


// generator é mais potente que o async await por exemplo, existem outras funcoes

// call é um metodo auxiliar do redux saga, ele permite a chamada de metodos assincronos e que retornam promises
// put é um metodo auxiliar que dispara uma action do redux, precisa colocar o yield tbm
// select é um metodo responsavel por realizar uma busca dentro do estado do redux
function* addToCart({ id }) {
  const productExists = yield select(state => state.cart.find(p => p.id === id))

  const stock = yield call(api.get, `/stock/${id}`)

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const newAmount = currentAmount + 1;

  if (newAmount > stockAmount) {
    // console.tron.warn('ERRO');
    toast.error(`Esse produto possui apenas ${stockAmount} items em estoque.`, {
      toastId: productExists.id
    })
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, newAmount));

  } else {
    const response = yield call(api.get, `/products/${id}`);
    // Não daria para fazer yield api.get(`...`)
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    }

    yield put(addToCartSuccess(data));

    history.push('/cart')
  }
}


function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`)
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    // console.tron.warn('ERRO');
    toast.error(`Esse produto possui apenas ${stockAmount} items em estoque.`, {
      toastId: 10
    })
    return;
  }

  yield put(updateAmountSuccess(id, amount))
}

// Esse takeLates faz com que o usuario ao clicar no botao varias vezes, vai ignorar as primeiras vezes e pegar só a ultima,
// legal que o saga ja cuida disso pra gente, é semelhante ao que temos que configurar no front colocando timeout
// EXISTE O takeEvery também, que vai adicionar o tanto de vezes que o usuario clicar.
export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
