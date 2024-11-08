import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Home from './pages/Home/home';
import CreateBook from './pages/CreateBook/createBook';
import UpdateBook from './pages/UpdateBook/updateBook';
import Register from './pages/Register/register';
import Login from './pages/Login/login';

function App() {

  return (
    <div className="App">
      <h1>Frontend com react</h1>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/insert" element={<CreateBook />} />
            <Route path="/edit/:bookId" element={<UpdateBook />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>      
    </div>
  );
}

export default App;
