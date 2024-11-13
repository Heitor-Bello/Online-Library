const ButtonGroupAuth = ({ onRegisterClick, onLoginClick, isLogin }) => {
  return (
    <div className="flex items-center gap-1 p-1 h-12 bg-button-group-gary mb-12">
      <button 
        onClick={onLoginClick}
        className={`
          w-full 
          py-2 
          px-3 
          h-10 
          rounded-md
          border-purple-700 
          text-purple-button-auth
          ${isLogin ? 'active bg-button-auth-selected' : 'bg-button-group-gary'}
          transition-colors
        `}
      >
        Login
      </button>
      <button 
        onClick={onRegisterClick}
        className={`
          w-full 
          py-2 
          px-3 
          h-10 
          rounded-md
          border-purple-700 
          text-purple-button-auth
          ${!isLogin ? 'active bg-button-auth-selected' : 'bg-button-group-gary'}
          transition-colors
        `}
      >
        Register
      </button>
    </div>
  )
};

export default ButtonGroupAuth;