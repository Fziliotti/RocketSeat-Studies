import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
`;


export const Cart = styled(Link)`
  display:flex;
  align-items:center;
  text-decoration:none;
  transition: opacity .3s;

  svg path{
    transition: fill .3s;
  }

  &:hover > svg path {
    fill: #fce57e;
  }

  &:hover {
    opacity:.9;
  }

  .cart-box {
    text-align:right;
    margin-right:10px;

    strong{
       display:block;
       color: #fff;
    }

    span{
      font-size:12px;
      color: #999;
    }
  }

`
