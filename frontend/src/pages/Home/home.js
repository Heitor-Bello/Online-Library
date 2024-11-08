import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Home = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>HOME</h1>
      <h1>Bem-vindo, {user ? user.name : 'Convidado'}</h1>
      {isAdmin && <p>Você é um administrador.</p>}
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home;