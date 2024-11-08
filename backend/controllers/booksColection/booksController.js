const { db } = require('../../firebase/config');

// Obter todos os Livros
async function getAllBooks(req, res) {
  try {
    const snapshot = await db.collection('books').get();
    const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error ao buscar livros', error });
  }
}

// Obtem um livro pelo ID
async function getBookById(req, res) {
  
  try {
    const { id } = req.params; // Vai pegar o ID da URL
    // Acesse o documento no Firestore com o ID
    const docSnap = await db.collection('books').doc(id).get(); 
    // Verifique se o documento existe
    if (!docSnap.exists) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    // Retorna o livro encontrado
    res.status(200).json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    res.status(500).json({ message: 'Erro ao buscar livro', error });
  }
}

// Adicionar um novo livro
async function addBook(req, res) {
  try {
    const newBook = req.body;
    const docRef = await db.collection('books').add(newBook);
    res.status(201).json({ id: docRef.id, ...newBook });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar Livro', error });
  }
}

// Atualizar um livro
async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const updateBook = req.body;
    await db.collection('books').doc(id).update(updateBook);
    res.status(201).json({ id, ...updateBook });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar os dados do Livro', error });
  }
}

// Delete um Livro
async function deleteBook(req, res) {
  try {
    const { id } = req.params;
    await db.collection('books').doc(id).delete();
    res.status(200).json({ message: 'Livro deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar Livro', error });
  }
}

module.exports = {getAllBooks, getBookById, addBook, updateBook, deleteBook};