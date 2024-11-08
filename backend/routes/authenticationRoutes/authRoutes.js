const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyToken } = require('../../controllers/authentication/authController');

// Rota de registro
router.post('/register', registerUser);

// Rota de Login
router.post('/login', loginUser);

// Rota protegida, necessita de um token
router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({
    messagem: 'Dados do usuário autenticado',
    user: req.user,
  });
});

module.exports = router;