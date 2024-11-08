const { db } = require('../../firebase/config');

// busca os usuários
async function getAllUsers(req, res) {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os usuários', error });
  }
}

// busca um usuário pelo id
async function getUserById(req, res) {
  try {
    const { id } = req.params; // pega o id da url
    const docSnap = await db.collection('users').doc(id).get();

    //verifica se o documento existe
    if (!docSnap.exists) {
      return res.status(404).json({ message: 'User não encontrado' });
    }

    res.status(201).json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    console.error('Error ao buscar o usuário', error)
    res.status(500).json({ message: 'Erro ao buscar usuário', error })
  }
}

// Adiciona um usuário na coleção users
const addUserToCollection = async (uid, email, displayName, isAdmin) => {
  try {
    const userRef = db.collection('users').doc(uid);
    await userRef.set({
      displayName,
      email,
      isAdmin,
    });
  } catch (error) {
    console.error('Erro ao inserir usuário na coleção', error);
    throw new Error('Erro ao inserir usuário na coleção');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUserToCollection,
};