import { useState } from 'react';
import { styled } from '@mui/material/styles';

//Components material
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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

const Register = ({ onRegisterSuccess }) => {

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

      onRegisterSuccess();
    } catch (error) {
      console.error('Erro ao criar usuário', error);
      setError(error.message)
    }
  }  

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-4xl mb-7">Crie sua conta</h1>
      <form onSubmit={handleCreateUser} className="flex flex-col gap-3 max-w-[500px]">
        <CustomTextField
          id="outlined-basic-name" 
          label="Nome de Usuário" 
          variant="outlined"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}               
        />
        
        <CustomTextField
          id="outlined-basic-email" 
          label="E-mail para registro" 
          variant="outlined"
          type="text"
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

        <FormControlLabel 
          control={
            <Checkbox 
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              sx={{
                color: '#7A7B9F',
                '&.Mui-checked': {
                  color: '#7A7B9F',
                },
              }}
            />
          } label="Administrador?" 
        />

        <Button
          type="submit"
          variant="contained" 
          color="success"
        >
          Registrar
        </Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Register;