import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function BookPages(props) {
  const { id } = useParams();
  // const id = props.match.params.id;
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [number, setNumber] = useState('');
  const [content, setContent] = useState('');
  const [book, setBook] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    async function fetchPages() {
      try {
        
        const response = await axios.get(`http://localhost:8000/book/${id}/pages/`);
        setPages(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    fetchPages();
  }, []);

  const handleDelete = async (pageId) => {
    try {
      const token = localStorage.getItem('access');
      await axios.delete(`http://localhost:8000/pages/${pageId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPages((prevPages) => prevPages.filter((page) => page.id !== pageId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = async (pageId) => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get(`http://localhost:8000/book/${id}/pages/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedPage(response.data);
      setNumber(response.data.number);
      setContent(response.data.content);
      setBook(response.data.book);

      setIsCreating(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('access');
      const response = await axios.post(
        `http://localhost:8000/book/${id}/pages/`,
        
        {
          number: number,
          content: content,
          book: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPages((prevPages) => [...prevPages, response.data]);
      setNumber('');
      setContent('');
      setBook('');
      setIsCreating(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    
    const book = id;
    try {
      const token = localStorage.getItem('access');
      const response = await axios.put(
        `http://localhost:8000/pages/${selectedPage[0]['id']}/`,
        
        { number, content, book},
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      const updatedPage = {...selectedPage, number, content};
      setPages((prevPages) =>
        prevPages.map((page) => (page.id === selectedPage.id ? response.data : page))
      );
      setSelectedPage(updatedPage);
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };
  

  const isLoggedIn = localStorage.getItem('access');

  if (isLoggedIn) {
  return (
    <div>
      <h1>Pages</h1>
      <button onClick={() => setIsCreating(true)}>Create new page</button>
      {isCreating && (
        <form onSubmit={selectedPage ? handleUpdate : handleCreate}>
          <div>
            <label htmlFor="number">Number:</label>
            <input
              type="number"
              id="number"
              name="number"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />


          </div>

          
          <button type="submit">{selectedPage ? 'Update' : 'Create'}</button>
        </form>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            {pages.map((page) => (
              <li key={page.id}>
                
                <p>Number : {page.number}</p>
                <p>Content : {page.content}</p>
                <p>Book_id : {page.book}</p>
                <br></br>
                <button onClick={() => handleDelete(page.id)}>Delete</button>
                <br></br>
                <button onClick={() => handleView(page.id)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedPage && (
        <div>
          <h1>Edit page</h1>
          <form onSubmit={handleUpdate}>
            <div>
              <label htmlFor="number">number:</label>
              <input
                type="number"
                id="number"
                name="number"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </div>

            


            <button type="submit">Update</button>
            <br></br>
            <button onClick={() => setSelectedPage(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
      } else {

        return (
          <div>
            <h1>Pages</h1>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <ul>
                  {pages.map((page) => (
                    <li key={page.id}>
                      <p>Nubmer : {page.number}</p>
                      <p>Content : {page.content}</p>
                      <p>Book_id : {page.book}</p>

                      
                      
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedPage && (
              <div>
                
              </div>
            )}
          </div>
        );
      }                         
      

}

export default BookPages;