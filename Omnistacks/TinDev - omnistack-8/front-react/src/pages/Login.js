import React, { useState } from 'react';
import './login.css'

import logo from '../assets/logo.svg';
import api from '../services/api';

const Login = ({history}) =>{

  const [username, setUsername] = useState('')

  async function handleSubmit(e){
    e.preventDefault();

    try{
      const response = await api.post('/devs', {username})
      const {_id} = response.data;
      history.push(`/dev/${_id}`);
      
    }catch(err){
      alert(err)
    }
  }
  
  return (
   <div className="login">                              
     <form onSubmit={handleSubmit} className="login__form" >
       <img className="login__form__image" src={logo} alt="tindev logo"/>
       <input className="login__form__input" required value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Digite seu usuário no github"/>
       <button className="login__form__btn" type="submit">Entrar</button>
     </form>
   </div>
  )
};

export default Login;
