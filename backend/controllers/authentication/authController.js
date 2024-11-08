const { auth } = require('../../firebase/config'); //serviço de autenticação do firebase
const bcrypt = require('bcryptjs'); //usado para criptografar senhas
const jwt = require('jsonwebtoken'); // para gerar e verificar JWT

const { addUserToCollection } = require('../usersColection/usersController');

//Registrar um usuário
const registerUser = async (req, res) => {
  const { email, password, displayName, isAdmin } = req.body;

  try {
    // Criação do usuário com Firebase Authentication
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });

    // inserir o user na coleção
    await addUserToCollection(userRecord.uid, email, displayName, isAdmin)

    // resposta com os dados do usuário
    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        isAdmin,
      },
    });
  } catch (error) {
    console.error('Erro ao criar usuário: ', error);
    res.status(500).json({ message: error.message });
  }
};

// Login do usuário
const loginUser = async (req, res) => {
  const { token } = req.body;

  try {
    // Verifica o token JWT do Firebase
    const decodedToken = await auth.verifyIdToken(token);

    res.status(200).json({
      message: 'Login realizado com sucesso',
      token,
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(400).json({ message: error.message });
  }
};

// Middleware para verificar o token JWT
const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(403).json({ message: 'Acesso negado, token não fornecido' });
  }

  try {
    // Remove o "Bearer" do token se presente
    const tokenStripped = token.replace('Bearer', '').trim();
    console.log('Token recebido:', tokenStripped);

    // Decodifica o token
    const decoded = await auth.verifyIdToken(tokenStripped);
    console.log('Token decodificado:', decoded);

    if (!decoded || !decoded.uid) {
      console.error('Erro: Token decodificado não contém UID');
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }

    req.user = decoded; // contém o UID e outras informações
    next();
  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
};