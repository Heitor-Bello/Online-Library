import { useState } from 'react';

//My components
import Login from '../../components/login';
import Register from "../../components/register";
import ButtonGroupAuth from '../../components/buttonGroupAuth';

//imagens
import AuthImage from '../../assets/auth-image.png';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginClick = () => setIsLogin(true);
  const handleRegisterClick = () => setIsLogin(false);

  return (
    <div className="flex justify-center items-center h-screen gap-14">    

      <div className="auth-image">
        <img className="w-full max-h-[95vh]" src={AuthImage} alt="imagem ilustrativa para página de login" />
      </div>

      <div className="form-group min-w-[500px]">
        <ButtonGroupAuth 
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
          isLogin={isLogin}          
        />
        {isLogin ? <Login /> : <Register onRegisterSuccess={handleLoginClick}/>}
      </div>  
    </div>
  );
};

export default AuthPage;