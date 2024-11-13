import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Home from './pages/Home/home';
import CreateBook from './pages/CreateBook/createBook';
import UpdateBook from './pages/UpdateBook/updateBook';
import AuthPage from './pages/AuthPage/authPage';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/themeComponents';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App bg-application-bg text-whit-default min-h-screen">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthPage />}/>
              <Route path="/insert" element={<CreateBook />} />
              <Route path="/edit/:bookId" element={<UpdateBook />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>      
      </div>
    </ThemeProvider>
  );
}

export default App;
