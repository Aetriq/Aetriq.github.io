const d=document,$=s=>d.querySelector(s),g=s=>d.getElementById(s),B=d.body.dataset.b||'',
E=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>'&#'+c.charCodeAt(0)+';'),
X=p=>/^(https?:)?\/\//.test(p),
P=p=>X(p)?p:B+p,
T=p=>X(p)?p:B+p.replace(/(\.\w+)$/,'.t$1'),
H=(s,h)=>{const e=$(s);if(e)e.innerHTML=h;return e},
J=u=>fetch(B+u).then(r=>{if(!r.ok)throw r.status;return r.json()}),
O=u=>X(u)?' target="_blank" rel="noopener noreferrer"':'',
L=(l,c)=>l.url?`<a class="b ${l.type=='primary'?'p ':''}${c||''}" href="${E(P(l.url))}"${O(l.url)}>${E(l.text)}</a>`:`<span class="b off ${c||''}">${E(l.text)}</span>`,
S=s=>/PROGRESS/i.test(s)?'wip':/^INCOMPLETE/i.test(s)?'no':'ok',
I=(s,a,x)=>`<img src="${s}" alt="${E(a)}" loading="lazy" decoding="async"${x||''}>`,
D=p=>`<details class="dt"><summary class="b">${p.u?'':'View '}Details</summary>${p.u?`<p class="st s-wip">Updated ${E(p.u)}</p>`:''}<p class="pl">${E(p.description)}</p></details>`,
N=[['index','Home'],['about','About'],['projects','Projects'],['models','3D Models'],['creative','Creative Work'],['store','Storefront'],['contact','Contact']],
cur=B?'projects':location.pathname.split('/').pop().replace(/\.html$/,'')||'index';
H('#h',`<div class="nav"><a class="brand" href="${B}index.html"><img src="${B}assets/img/aetriq-logo.png" alt="">Aetriq</a><button class="b" id="mb" aria-expanded="false" aria-controls="nl">Menu</button><ul id="nl">${N.map(n=>`<li><a href="${B}${n[0]}.html"${n[0]==cur?' class="on"':''}>${n[1]}</a></li>`).join('')}</ul></div>`);
const mb=g('mb');if(mb)mb.onclick=()=>mb.setAttribute('aria-expanded',g('nl').classList.toggle('open'));
H('#f',`<div class="w"><div class="fg"><div><div class="ft"><img src="${B}assets/img/aetriq-logo.png" alt="">Alex Gordon</div><p>Published November 24th, 2024<br>Last Updated November 7th, 2026<br>You are looking at v4.0 of my website.</p><div class="s"><a href="https://github.com/aetriq"${O('https:')}>GitHub</a><a href="https://www.youtube.com/@Aetriq"${O('https:')}>YouTube</a><a href="https://twitter.com/Veetwo__"${O('https:')}>X</a><a href="https://www.instagram.com/aetriq_/"${O('https:')}>Instagram</a></div></div><div><h4>Navigate</h4>${N.map(n=>`<a href="${B}${n[0]}.html">${n[1]}</a>`).join('')}</div><div><h4>Resources &amp; Legal</h4><a href="https://github.com/aetriq"${O('https:')}>GitHub</a><a href="https://linktr.ee/Aetriq"${O('https:')}>Linktree</a><a href="${B}changelog.html">Changelog</a><a href="${B}privacy.html">Privacy Policy</a><a href="${B}security.txt">Security</a></div></div><div class="fb2"><div>© 2026 Veetwo Music Ltd. All rights reserved.</div><div>By browsing my website, you agree to the cookies obtained via CloudFlare. This is done to prevent AI from scraping my site. See <a href="${B}privacy.html">Privacy Policy</a>.</div></div></div>`);
const bn=g('bn');if(bn){let s;try{s=sessionStorage.getItem('bn')}catch(e){}bn.hidden=!!s;g('bx').onclick=()=>{bn.hidden=true;try{sessionStorage.setItem('bn',1)}catch(e){}}}
if(g('hl')||g('ap'))J('data/projects.json').then(r=>{
H('#hl',(r.highlighted||[]).map(p=>`<article class="card"><div class="im"><img src="${P(p.image)}" alt="${E(p.title)}" decoding="async"><div><h3>${E(p.title)}</h3><p>${E(p.subtitle)}</p></div></div><div class="cb"><div class="st s-${S(p.status)}">[ ${E(p.status)} ]</div>${D(p)}<div class="row">${(p.links||[]).map(l=>L(l)).join('')}</div>${p.affiliates?`<div class="af">${p.affiliates.map(a=>`<a href="${E(a.url)}"${O(a.url)} title="${E(a.name)}">${I(P(a.icon),a.name)}</a>`).join('')}</div>`:''}</div></article>`).join(''));
H('#ap',(r.all||[]).map(p=>`<article class="card"><div class="im">${I(T(p.image),p.title)}</div><div class="cb"><h3>${E(p.title)}</h3><div class="st s-${S(p.status)}">[ ${E(p.status)} ]</div>${D(p)}<div class="row">${(p.links||[]).map(l=>L(l,'s')).join('')}</div></div></article>`).join(''))}).catch(()=>H('#hl','<p>Could not load projects.</p>'));
if(g('mg'))J('data/models.json').then(r=>H('#mg',r.models.map(m=>`<article class="card"><div class="im">${I(m.image,m.title)}</div><div class="cb"><h3 class="c">${E(m.title)}</h3>${D({u:m.updated,description:m.description})}<a class="b p" href="${E(m.link)}"${O(m.link)}>View on Printables</a></div></article>`).join(''))).catch(()=>H('#mg','<p>Could not load models.</p>'));
if(g('ts'))J('data/techstack.json').then(r=>H('#ts',r.categories.map(c=>`<div class="card ts"><h3>${E(c.title)}</h3><div>${c.skills.map(s=>`<span class="pill">${E(s)}</span>`).join('')}</div></div>`).join('')));
if(g('cr'))J('data/creative.json').then(r=>{
const V=a=>a.map(i=>{const c=(r.channels||[]).find(c=>c.id==i.channelId),v=i.customIcon||(c&&c.avatar);return`<a class="vc" href="${E(i.videoUrl||'#')}"${O('https:')}><div class="im">${I(T(i.image),i.title||'Video')}</div><div class="vi">${v?I(P(v),''):''}<span><h3>${E(i.title)}</h3>${i.date?`<small>${E(i.date)}</small>`:''}</span></div></a>`}).join('');
H('#cd',E(r.description));
H('#chs',(r.channels||[]).map(c=>`<a class="chn" href="${E(c.url)}"${O('https:')}>${I(T(c.banner),'')}<div class="ci">${I(P(c.avatar),c.name)}<h3>${E(c.name)}</h3></div></a>`).join(''));
const it=r.items||[],o=it.filter(i=>i.isLegacy);
H('#vg',V(it.filter(i=>!i.isLegacy)));
if(o.length){g('old').hidden=false;H('#od',E(r.legacyDescription));H('#og',V(o))}}).catch(()=>H('#vg','<p>Could not load creative work.</p>'));
if(g('pg'))J('data/store.json').then(r=>{
const p=r.products,mo=g('mo');let cp,ci,ret;
H('#pg',p.map((x,i)=>{const a=x.status=='available',m=x.images&&x.images[0];return`<article class="card" data-i="${i}"><div class="im t">${m?I(T(m),x.title):''}${a?'':'<div class="so">Sold Out</div>'}</div><div class="cb"><h3>${E(x.title)}</h3><div class="pr"><b${a?'':' class="x"'}>${a?E(x.price):'SOLD'}</b><button class="b s${a?'':' off'}">${a?'View Details':'Archived'}</button></div></div></article>`}).join(''));
const show=()=>{const x=cp.images||[],n=x.length;g('mi').hidden=!n;if(n){g('ci').src=P(x[ci]);g('ci').alt=cp.title;g('cn').textContent=ci+1+' / '+n}[g('pv'),g('nx'),g('cn')].forEach(e=>e.hidden=n<2)},
open=i=>{cp=p[i];ci=0;const a=cp.status=='available',b=g('bd'),m=g('ma');g('mt').textContent=cp.title;g('ds').textContent=cp.desc;b.textContent=a?'Available':'Sold Out';b.style.color=b.style.borderColor=a?'var(--ok)':'var(--no)';m.textContent=a?'Buy Now - '+cp.price:'Item Unavailable';m.className='b '+(a?'p':'off');if(a){m.href=cp.link;m.target='_blank';m.rel='noopener noreferrer'}else{m.removeAttribute('href');m.removeAttribute('target')}show();mo.hidden=false;d.documentElement.classList.add('nos');ret=d.activeElement;g('cl').focus()},
close=()=>{mo.hidden=true;d.documentElement.classList.remove('nos');if(ret)ret.focus()},
step=n=>{ci=(ci+n+cp.images.length)%cp.images.length;show()};
g('pg').onclick=e=>{const c=e.target.closest('.card');if(c)open(+c.dataset.i)};
g('cl').onclick=close;mo.onclick=e=>{if(e.target==mo)close()};g('nx').onclick=()=>step(1);g('pv').onclick=()=>step(-1);
d.onkeydown=e=>{if(mo.hidden)return;if(e.key=='Escape')close();else if(cp.images&&cp.images.length>1&&(e.key=='ArrowRight'||e.key=='ArrowLeft'))step(e.key=='ArrowRight'?1:-1)}}).catch(()=>H('#pg','<p>Could not load the store.</p>'));
const cf=g('cf');if(cf)cf.onsubmit=e=>{e.preventDefault();const v=n=>cf.elements[n].value;location.href='mailto:aetriq@protonmail.com?subject='+encodeURIComponent('Message from '+v('n'))+'&body='+encodeURIComponent(v('m')+'\n\n'+v('n')+' <'+v('e')+'>');cf.querySelector('button').textContent='Opening your mail app...'};
const yt=$('.yt');if(yt)yt.onclick=e=>{e.preventDefault();const f=d.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+yt.dataset.v+'?autoplay=1';f.allow='autoplay; encrypted-media; picture-in-picture';f.allowFullscreen=true;f.title=yt.title;yt.removeAttribute('href');yt.innerHTML='';yt.appendChild(f);yt.onclick=null};
const md=g('md');if(md){const id=(new URLSearchParams(location.search).get(md.dataset.q)||md.dataset.def||'').replace(/[^\w-]/g,'');d.title='Aetriq | '+id;
if(id)fetch(B+md.dataset.src+id+'.md').then(r=>{if(!r.ok)throw r.status;return r.text()}).then(t=>{
md.innerHTML=window.marked?marked.parse(t):'<pre>'+E(t)+'</pre>';
md.querySelectorAll('table').forEach(t=>{const w=d.createElement('div');w.className='tw';t.parentNode.insertBefore(w,t);w.appendChild(t)});
md.querySelectorAll('img').forEach(i=>i.loading='lazy');
md.querySelectorAll('a[href^=http]').forEach(a=>{a.target='_blank';a.rel='noopener noreferrer'});
const k=[];md.querySelectorAll('h2,h3').forEach(h=>{const s=h.textContent.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');if(s){h.id=s;k.push(`<a class="${h.tagName.toLowerCase()}" href="#${s}">${E(h.textContent)}</a>`)}});
H('#toc',k.join(''));g('tc').hidden=!k.length;
const e=location.hash&&g(decodeURIComponent(location.hash.slice(1)));if(e)e.scrollIntoView()}).catch(()=>{md.innerHTML='<h1>404</h1><p>The page <b>'+E(id)+'</b> could not be found.</p>'})}
