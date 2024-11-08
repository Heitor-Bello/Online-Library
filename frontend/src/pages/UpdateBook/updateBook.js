import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';


const UpdateBook = () => {

  const { bookId } = useParams();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [available, setAvailable] = useState(true);
  const [pages, setPages] = useState(0);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${bookId}`);
        const bookData = await response.json();

        setTitle(bookData.title);
        setAuthor(bookData.author);
        setImage(bookData.image);
        setDescription(bookData.description);
        setTags(bookData.tags);
        setAvailable(bookData.available);
        setPages(bookData.pages);
        setStatus(bookData.status);
      } catch (err) {
        console.error("Erro ao buscar Livro", err)
      }
    };
    fetchBook();
  }, [bookId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedBook = {
      title,
      author,
      image,
      description,
      tags,
      available,
      pages,
      status,
    };

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Correção no cabeçalho
        },
        body: JSON.stringify(updatedBook),
      });
  
      // Verifique se a resposta foi bem-sucedida
      if (!response.ok) {
        // Caso o status não seja 2xx, lance um erro com o código de status
        const errorData = await response.text(); // Tente ler o corpo da resposta como texto
        throw new Error(`Erro ao atualizar o livro: ${response.status} - ${errorData}`);
      }
  
      // Caso a resposta tenha sido OK, parse o JSON
      const result = await response.json();
      console.log('Livro atualizado com sucesso: ', result);
      setError(null);
    } catch (err) {
      console.error("Erro ao atualizar o livro:", err);
      setError(err.message);
    }
  }

  const deleteBook = async (bookId) => {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
      });

      if(!response.ok) {
        throw new Error("Erro ao deletar Livro");
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Erro ao deletar livro: ", error);
    }
  }

  return (
    <div>
      <h2>Atualizar ou deletar Livro</h2>
      <form onSubmit={handleUpdate}>
        {/* Campos iguais aos do componente CreateBook */}
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título do livro" />
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Autor do livro" />
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Imagem do livro" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição do livro" />
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags do livro" />
        <input type="number" value={pages} onChange={(e) => setPages(e.target.value)} placeholder="Número de páginas do livro" />
        <button type="submit">Atualizar</button>
      </form>
      <button onClick={() => deleteBook(bookId)}>Deletar Livro</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdateBook;