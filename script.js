document.documentElement.classList.add('js');
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

// navbar: opaque on scroll + active link
const nav=$('#nav'),links=$$('#links a');
addEventListener('scroll',()=>{nav.classList.toggle('scrolled',scrollY>40);
 const sy=scrollY+140;let cur='home';
 $$('main section[id]').forEach(s=>{if(s.offsetTop<=sy)cur=s.id});
 if(cur==='education')cur='about';
 links.forEach(a=>a.classList.toggle('active',a.hash==='#'+cur));
 if(!reduce)$$('[data-parallax]').forEach(el=>el.style.translate=`0 ${scrollY*-el.dataset.parallax}px`);
},{passive:true});

// mobile menu
const burger=$('#burger'),menu=$('#links');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
links.forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}));

// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*80+'ms';io.observe(el)});

// cursor glow (fine pointers only)
const glow=$('.cursor-glow');
if(matchMedia('(pointer:fine)').matches&&!reduce){
 addEventListener('pointermove',e=>{glow.style.transform=`translate(${e.clientX}px,${e.clientY}px)`},{passive:true});
}else glow.remove();
