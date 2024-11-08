import { useState } from 'react';

const CreateBook = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState(''); // Novo campo para autor
  const [image, setImage] = useState('');
  const [description, setDescription] = useState(''); // Novo campo para descrição
  const [tags, setTags] = useState('');
  const [available, setAvailable] = useState(true);
  const [pages, setPages] = useState(0);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author, 
      image, 
      description, 
      tags, 
      available, 
      pages, 
      status
    };

    try {
      const response = await fetch('api/books', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if(!response.ok) {
        throw new Error("Erro ao adicionar Livro");
      }

      const result = await response.json();
      console.log('Livro adicionado com sucesso:', result);

      setTitle('');
      setAuthor('');
      setImage('');
      setDescription('');
      setTags('');
      setAvailable(true);
      setPages(0);
      setStatus('');
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Adicionar Livro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título do livro"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Autor do livro"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Imagem do livro"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição do livro"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags do livro"
        />
        <input
          type="number"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          placeholder="Número de páginas do livro"
        />
        <button type="submit">Adicionar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default CreateBook;