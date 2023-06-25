import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../BookPage.css';

function BookPage() {
  
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  

  useEffect(() => {
    async function fetchBooks() {
      try {
        
        const response = await axios.get('http://localhost:8000/books/');
        setBooks(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
      
    }
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      const token = localStorage.getItem('access');
      await axios.delete(`http://localhost:8000/books/${bookId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      setSelectedBook(null);
    } catch (error) {
      try{
      const refresh = localStorage.getItem('refresh');
        const response = await axios.post('http://localhost:8000/auth/token/refresh/', { refresh });
        localStorage.setItem('access', response.data.access);
        const token = localStorage.getItem('access');
        await axios.delete(`http://localhost:8000/books/${bookId}/`, {
            headers: {

                Authorization: `Bearer ${token}`,
            },
        });
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        setSelectedBook(null);
    } catch (error) {
        console.error(error);
    
    }






    }
  };

  const handleView = async (bookId) => {
    try {
      
      const token = localStorage.getItem('access');
      const response = await axios.get(`http://localhost:8000/books/${bookId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedBook(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setIsCreating(false);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('access');
      await axios.put(
        `http://localhost:8000/books/${selectedBook.id}/`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedBook = { ...selectedBook, title, description };
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        )
      );
      setSelectedBook(updatedBook);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('access');
      const response = await axios.post(
        'http://localhost:8000/books/',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBooks((prevBooks) => [...prevBooks, response.data]);
      setSelectedBook(response.data);
      setIsCreating(false);
    } catch (error) {
      console.error(error);
    }
  };
  const isLoggedIn = localStorage.getItem('access');

  if (isLoggedIn) {
  return (
    <div>
      <h1>Books</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                
                
                <p>Title :  {book.title}</p>
                <p>Description : {book.description}</p>
                <p>Author : {book.author}</p>

                <Link to={`/book/${book.id}/pages/`}>Pages Of This Book </Link>
                <br></br>
                <button onClick={() => handleView(book.id)}>MakeUpdate</button>
                <br></br>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <h1>{selectedBook ? selectedBook.title : ''}</h1>
          {selectedBook ? (
            <form onSubmit={handleUpdate}>
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <button type="submit">Update</button>
            </form>
          ) : (
            <div>
              <h1>Create new book</h1>
              <form onSubmit={handleCreate}>
                <div>
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
                <button type="submit">Create</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
} else {
  return (
    <div>
      <h1>Books</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <p>Title : {book.title}</p>
                <p>Description : {book.description}</p>
                <p>Author : {book.author}</p>
                <Link to={`/book/${book.id}/pages/`}>Pages Of This Book</Link>
              </li>
            ))}
          </ul>
          
          <h1>{selectedBook ? selectedBook.title : ''}</h1>
          {selectedBook ? (
            <form onSubmit={handleUpdate}>
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <button type="submit">Update</button>
            </form>
          ) : (
            <div>
              
            </div>
          )}
        </div>
      )}
    </div>
  
  );
          }



}

export default BookPage;