const express = require('express');
const cors = require('cors');
const booksRoutes = require('./routes/booksRoutes/booksRoutes');
const authRoutes = require('./routes/authenticationRoutes/authRoutes');
const usersRoutes = require('./routes/usersRoutes/usersRoutes');

const app = express();

//configuração do middleware
app.use(cors());
app.use(express.json());

//usando as rotas
app.use('/api/books', booksRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

//inicializando servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});