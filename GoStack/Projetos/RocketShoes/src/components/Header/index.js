import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {Container, Cart} from './styles';
import {MdShoppingBasket} from 'react-icons/md';

import logoSrc from '../../assets/images/logo.svg'

function Header( {cartSize} ) {
  return (
    <Container>
      <Link to='/'>
        <img src={logoSrc} alt="RocketShoes"/>
      </Link>

      <Cart to='/cart'>
        <div className="cart-box">
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF"/>
      </Cart>
    </Container>
  );
}

export default connect(state => ({
  cartSize: state.cart.length
}))(Header)
