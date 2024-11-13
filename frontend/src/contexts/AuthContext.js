import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Função para lidar com o login e buscar o usuário na coleção
    const handleUserLogin = useCallback(async (token) => {
        try {
            // Decodifica o token para obter o ID do usuário
            const decoded = jwtDecode(token);
            const userId = decoded.user_id;

            // Busca o usuário na coleção de usuários usando o userId
            const response = await fetch(`api/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Inclui o token para autenticação
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar dados do usuário");
            }

            const userData = await response.json();

            // Atualiza o estado com os dados do usuário e a permissão de administrador
            setUser(userData);
            setIsAdmin(userData.isAdmin || false); // Define isAdmin conforme a coleção de usuários
            localStorage.setItem('token', token); // Armazena o token no localStorage

            setLoading(false);
            navigate('/'); // Navegar para a página inicial após o login
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        // Verificar se há um token no localStorage ao carregar o contexto
        const token = localStorage.getItem('token');
        if (token) {
            handleUserLogin(token);
        } else {
            setLoading(false);
        }
    }, [handleUserLogin]);     

    const login = (token) => {
        handleUserLogin(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAdmin(false);
        navigate('/auth');
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
