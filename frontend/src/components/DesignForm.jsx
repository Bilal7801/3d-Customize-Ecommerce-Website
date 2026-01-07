// DesignForm.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DesignForm = () => {
  const [form, setForm] = useState({ title: '', price: '' });
  const [designs, setDesigns] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  console.log(form); // 👈 check what you're sending
  axios.post('http://localhost:8000/api/designs', form)
    .then(res => {
      alert('Design Added!');
      fetchDesigns();
    })
    .catch(err => {
      console.error(err); // 👈 prints 422 details
    });
};

  const fetchDesigns = () => {
    axios.get('http://localhost:8000/api/designs')
      .then(res => setDesigns(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <button type="submit">Add</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {designs.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.title}</td>
              <td>{d.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ✅ Correct way to export
export default DesignForm;
