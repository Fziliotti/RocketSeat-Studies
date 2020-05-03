import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductList } from './styles';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';
import ContentLoader from 'react-content-loader'

class Home extends Component {

  state = {
    products: [],
    isLoading: true
  }

  async componentDidMount() {
    const { data } = await api.get('products')

    //Adjust before render(), improving performance
    const dataWithFormattedPrice = data.map(product => ({
      ...product,
      formattedPrice: formatPrice(product.price)
    }))

    this.setState({ products: dataWithFormattedPrice, isLoading: false })
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;
    // dispatch(CartActions.addToCart(product)) trocado pelo debaixo, devido ao mapDispatchToProps
    addToCartRequest(id);
    // Depois de adicionar o produto no carrinho, nao posso usar this.props.history.push('/cart')
    // Pois a operacao addToCartRequest internamente dispara a action e o saga e isso é assincrono
    // pode ser que navegue antes mesmo da operação ser concluida
  }

  render() {
    const { products, isLoading } = this.state;
    const { amount } = this.props;

    if (isLoading) {
      return (
        <ProductList>
          <li><ProductLoader /></li>
          <li><ProductLoader /></li>
          <li><ProductLoader /></li>
          <li><ProductLoader /></li>
          <li><ProductLoader /></li>
        </ProductList>
      )
    } else {
      return (
        <ProductList>
          {
            products.map(product => (
              <li key={product.id}>
                <div>
                  <img src={product.image} alt={product.title} />
                </div>
                <strong>{product.title}</strong>
                <span>{product.formattedPrice}</span>

                <button type="button" onClick={() => this.handleAddProduct(product.id)}>
                  <div>
                    <MdAddShoppingCart size={16} color="#fff" /> {amount[product.id] || 0}
                  </div>
                  <span>Adicionar ao carrinho</span>
                </button>
              </li>
            ))
          }
        </ProductList>
      );
    }
  }
}

const ProductLoader = () => (
  <ContentLoader
    height={530}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb">
    <rect x="10" y="339" rx="4" ry="4" width="357" height="24" />
    <rect x="10" y="375" rx="4" ry="4" width="98" height="16" />
    <rect x="11" y="61" rx="5" ry="5" width="356" height="256" />
    <rect x="10" y="415" rx="4" ry="4" width="357" height="40" />
  </ContentLoader>
)


const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {})
});

// Converte as actions do redux para as propriedades do componente, ai voce acessa de maneira mais facil
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
//connect retorna outra funcao
