import React, { useState, useEffect } from 'react'

function App(){
  const [page, setPage] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(()=>{ fetchPage('home'); }, []);

  async function fetchPage(key){
    const res = await fetch('/api/pages/' + key);
    if(res.ok) setPage(await res.json());
  }

  async function handleLogin(e){
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if(res.ok){ setToken(data.token); localStorage.setItem('token', data.token); setMessage('Logado'); }
    else setMessage(data.error || 'Erro');
  }

  async function handlePublish(){
    const payload = { title: 'Home', sections: page.sections };
    const res = await fetch('/api/admin/pages/home', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if(res.ok) setMessage('Conteúdo publicado'); else setMessage(data.error);
  }

  return (
    <div className="app container">
      <header><h1>Investidor Iniciante 360 (React)</h1></header>
      <main>
        <section>
          <h2>Home</h2>
          {page && page.sections.map(s => (
            <article key={s.slug} className="card"><h3>{s.title}</h3><div dangerouslySetInnerHTML={{__html:s.content}}/></article>
          ))}
        </section>

        <aside className="admin">
          <h3>Admin</h3>
          {!token ? (
            <form onSubmit={handleLogin}>
              <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
              <input type="password" placeholder="senha" value={password} onChange={e=>setPassword(e.target.value)} />
              <button type="submit">Login</button>
            </form>
          ) : (
            <div>
              <p>Conectado</p>
              <button onClick={handlePublish}>Salvar/Atualizar Home</button>
            </div>
          )}
          <div className="muted">{message}</div>
        </aside>
      </main>
    </div>
  )
}

export default App
