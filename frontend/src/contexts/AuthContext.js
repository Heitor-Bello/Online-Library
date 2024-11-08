import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar se há um token no localStorage ao carregar o contexto
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
                setIsAdmin(decoded.isAdmin);
            } catch (error) {
                console.error('Token inválido');
            }
        }
        setLoading(false);
    }, []);

    const login = (token) => {
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAdmin(decoded.isAdmin);
      navigate('/'); // Navegar para a página home após o login
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAdmin(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
