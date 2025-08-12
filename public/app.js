async function fetchPage(key = 'home'){
  try{
    const res = await fetch('/api/pages/' + key);
    if(!res.ok) return null;
    const page = await res.json();
    return page;
  }catch(e){
    console.error('fetchPage', e);
    return null;
  }
}

function renderSections(page){
  const container = document.getElementById('pageSections');
  container.innerHTML = '';
  if(!page || !page.sections || page.sections.length===0){
    container.innerHTML = '<p class="muted">Nenhum conteúdo carregado. Use a API /api/pages para criar conteúdo inicial.</p>';
    return;
  }
  page.sections.sort((a,b)=>a.order-b.order).forEach(s => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<h3>${s.title}</h3><div>${s.content}</div>`;
    container.appendChild(el);
  });
}

(async function init(){
  const page = await fetchPage('home');
  renderSections(page);
})();
