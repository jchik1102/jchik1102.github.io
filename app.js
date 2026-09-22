const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const placeholder = item => `<div class="image-placeholder"><span>${esc(item.caption)}</span><small>Image to be added</small></div>`;
const media = item => item.src ? `<button class="image-button" data-image="${esc(item.src)}" data-alt="${esc(item.alt)}" data-caption="${esc(item.caption)}" aria-label="Expand ${esc(item.alt)}"><img src="${esc(item.src)}" alt="${esc(item.alt)}" loading="lazy" width="1200" height="800"></button>` : placeholder(item);
const tags = p => `<ul class="tags" aria-label="Skills and software">${p.tags.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`;
const grid = document.querySelector('#work');
if(grid) {
  grid.innerHTML = window.projects.map(p => {
    const cover=p.media[0];
    return `<article class="project" id="${esc(p.id)}"><div class="gallery">${cover?.src ? `<img class="cover" src="${esc(cover.src)}" alt="${esc(cover.alt)}" loading="lazy" width="1200" height="800">` : placeholder(cover || {caption:p.title})}</div><div class="project-body"><h2><a class="project-link" href="project.html?id=${encodeURIComponent(p.id)}">${esc(p.title)}</a></h2><p>${esc(p.description)}</p>${tags(p)}<div class="card-links"><span class="detail-cue">View project →</span>${p.repo ? `<a class="source" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(p.title)} on GitHub">GitHub ↗</a>` : ''}</div></div></article>`;
  }).join('');
  document.querySelector('#project-count').textContent = `${window.projects.length} projects`;
}
const detail = document.querySelector('#project-detail');
if(detail) {
  const id=new URLSearchParams(location.search).get('id');
  const p=window.projects.find(project=>project.id===id);
  if(!p) {
    document.title='Project not found — Jonathan Chik';
    detail.innerHTML='<a class="back-link" href="./">← Back to projects</a><h1>Project not found</h1><p>Choose a project from the gallery.</p>';
  } else {
    document.title=p.title+' — Jonathan Chik';
    document.querySelector('meta[name="description"]').content=p.description;
    const d=p.details || {overview:p.description,sections:[],images:[]};
    detail.innerHTML=`<a class="back-link" href="./#${esc(p.id)}">← Back to projects</a><div class="detail-heading"><h1>${esc(p.title)}</h1><p>${esc(p.description)}</p>${tags(p)}${p.repo ? `<a class="source" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">View source on GitHub ↗</a>` : ''}</div><div class="detail-cover">${p.media[0] ? media(p.media[0]) : ''}</div><section class="overview"><h2>Overview</h2><p>${esc(d.overview)}</p></section><div class="detail-layout"><div class="detail-copy">${d.sections.map(s=>`<section><h2>${esc(s.title)}</h2><p>${esc(s.text)}</p></section>`).join('')}</div><aside class="detail-images" aria-label="Project images">${[...p.media.slice(1),...(d.images||[])].map(item=>`<figure>${media(item)}<figcaption>${esc(item.caption)}</figcaption></figure>`).join('')}</aside></div><a class="back-link bottom-back" href="./#${esc(p.id)}">← Back to projects</a>`;
  }
}
const viewer = document.querySelector('#image-viewer');
document.addEventListener('click', event => { const button = event.target.closest('[data-image]'); if(button){viewer.querySelector('img').src=button.dataset.image;viewer.querySelector('img').alt=button.dataset.alt;viewer.querySelector('p').textContent=button.dataset.caption;viewer.showModal();}});
document.querySelector('#close-viewer').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close();});
