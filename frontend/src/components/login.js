import { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';

//firebase
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../contexts/AuthContext';

//Components material
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#7A7B9F'
    },
    '&:hover fieldset': {
      borderColor: '#7A7B9F',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#7A7B9F',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#7A7B9F',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#7A7B9F',
  },
  '& .MuiInputBase-input': {
    color: '#7A7B9F',
  },
});

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
    <div className="flex flex-col min-h-[362px] justify-center">
      <h1 className="font-bold text-4xl mb-7">Acesse sua conta</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 max-w-[500px] w-full">
        <CustomTextField
          id="outlined-basic" 
          label="E-mail" 
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}          
        />
        <CustomTextField
          id="outlined-password-input"
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />   
        <Button
          type="submit" 
          variant="contained" 
          color="success"
        >
          Entrar
        </Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Login;