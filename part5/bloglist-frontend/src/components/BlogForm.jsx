// Exercise 5.3 Blog List Frontend, step 3
// Exercise 5.6 Blog List Frontend, step 6
import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
            <div>
                <label>
                    title
                    <input
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    author
                    <input
                        type="text"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    url
                    <input
                        type="text"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </label>
            </div>
            <div>
                <button type="submit">create</button>
            </div>
        </form>
    </div>
)}

export default BlogForm