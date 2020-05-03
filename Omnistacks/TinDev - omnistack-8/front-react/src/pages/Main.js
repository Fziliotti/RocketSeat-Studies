import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './main.css'
import dislike from '../assets/dislike.svg'
import like from '../assets/like.svg'
import logo from '../assets/logo.svg'
import api from '../services/api'


const Main = ({match}) =>{
  const [users, setUsers] = useState([]);

  useEffect( () => {
    async function loadUsers(){
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id
        }
      })
      setUsers(response.data)
      
    }
    loadUsers()
  }, [match.params.id])

  async function handleLike(id){
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params._id }
    })
    setUsers(users.filter(user => user._id !== id))

    console.log('deu dislike')
  }
  
  async function handleDislike(id){
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params._id }
    })
    setUsers(users.filter(user => user._id !== id))

    console.log('deu dislike')
  }

  return (
   <div className="main">
     <Link to="/">
      <img className="main__img" src={logo} alt="logo Tindev"/>
     </Link>
    

    { users.length > 0 ? (
      <ul className="main__list">
        {users.map( user => (
          <li key={user._id} className="main__list__item">
            <img className="main__list__item__image" src={user.avatar} alt={user.name}/>
            <footer className="main__list__item__footer">
              <strong className="main__list__item__footer__name">{user.name}</strong>
              <p className="main__list__item__footer__desc">{user.bio || 'Uma descrição de respeito'}</p>
            </footer>

            <div className="button-group">
              <button className="button-group__btn" type="button" onClick={() => handleDislike(user._id)}>
                <img src={dislike} alt="Botão de deslike"/>
              </button>
              <button className="button-group__btn" type="button" onClick={() => handleLike(user._id)}>
                <img src={like} alt="Botão de Like"/>
              </button>
            </div>
          </li>
        ))}
      </ul>
      ) :  (
        <div className="empty"> Acabou seus Matchs! <span role="img" aria-label="sad">😢</span></div>
      )
    }
   </div>
  )
};

export default Main;
