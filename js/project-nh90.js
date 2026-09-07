
(() => {
 const root=document.querySelector('[data-nh90-gallery]'); if(!root) return;
 const track=root.querySelector('.nh90-gallery-track'), slides=[...root.querySelectorAll('.nh90-gallery-slide')];
 const count=root.querySelector('.nh90-gallery-count'), dots=root.querySelector('.nh90-dots'); let i=0;
 slides.forEach((_,n)=>{const b=document.createElement('button'); b.className='nh90-dot'+(n===0?' active':''); b.setAttribute('aria-label',`View image ${n+1}`); b.onclick=()=>go(n); dots.appendChild(b)});
 function go(n){i=(n+slides.length)%slides.length; track.style.transform=`translateX(-${i*100}%)`; count.textContent=`${String(i+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`; [...dots.children].forEach((d,k)=>d.classList.toggle('active',k===i));}
 root.querySelector('.prev').onclick=()=>go(i-1); root.querySelector('.next').onclick=()=>go(i+1);
 let sx=0; root.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true}); root.addEventListener('touchend',e=>{let dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)go(i+(dx<0?1:-1))},{passive:true});
 document.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')go(i-1);if(e.key==='ArrowRight')go(i+1)});
})();
