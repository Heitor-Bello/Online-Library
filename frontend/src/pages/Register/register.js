import { useState } from 'react';

const Register = () => {

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const newUser = {
      displayName,
      email,
      password,
      isAdmin
    };

    try {
      const response = await fetch('api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if(!response.ok) {
        throw new Error("Erro ao criar usuário");
      }

      const result = await response.json();
      console.log('Usuário criado com sucesso: ', result);

      setDisplayName('');
      setEmail('');
      setPassword('');
      setIsAdmin(false);
      setError(null);
    } catch (error) {
      console.error('Erro ao criar usuário', error);
      setError(error.message)
    }
  }

  return (
    <>
      <div>Registrar usuário</div>
      <div>
        <form onSubmit={handleCreateUser}>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Nome de usuário"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email para cadastrar"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="senha"
          /> 
          <input
            type="checkbox"
            value={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            placeholder="senha"
          />         
          <button type="submit">Registrar</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </>
  )
}

export default Register;