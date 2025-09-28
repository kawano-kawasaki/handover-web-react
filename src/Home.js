import { useEffect, useState } from 'react';
import './App.css';

function Home() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title:"", context:"" });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then(res => res.json())
      .then(data => {
        const loaded = data.map(d => ({
          id: d.id,
          createdAt: new Date().toLocaleString(),
          title: d.title,
          context: d.body
        }));
        setItems(loaded);
      });
  }, []);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      createdAt: new Date().toLocaleString(),
      title: form.title,
      context: form.context
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        setItems([...items, newItem]);
        setForm({ title:"", context:"" });
      })
  }
  
  return (
    <div>
      <button onClick={addItem}>追加</button>
      <input 
        type="text"
        value={form.title}
        placeholder="タイトル"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input 
        type="text"
        value={form.context}
        placeholder="内容"
        onChange={(e) => setForm({ ...form, context: e.target.value })}
      />

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <h3>{item.title}</h3>
            <small>{item.createdAt}</small>
            <p>{item.context}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
