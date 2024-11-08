import { useState, useContext } from 'react';

import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Autenticação com Firebase Client SDK
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      // Verifique se o token é exibido corretamente
      console.log("ID Token Firebase:", token); 

      // Envia o token para o backend para validação e criação da sessão
      const response = await fetch('api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      const result = await response.json();
      console.log('Usuário logado com sucesso: ', result);

      login(result.token); // armazena o token no contexto

      setEmail('');
      setPassword('');
      setError(null);
    } catch (error) {
      console.error('Erro ao logar com o usuário', error);
      setError(error.message);
    }
  }

  return (
    <div>
      <div>Página de login</div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email da conta"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="senha"
        />        
        <button type="submit">Logar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Login;