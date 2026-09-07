document.addEventListener("DOMContentLoaded",()=>{
  const liveAge=document.getElementById("live-age");
  if(liveAge){
    const dob=Date.UTC(2003,11,27,0,0,0);
    const yearMs=365.2425*24*60*60*1000;
    const tick=()=>{
      const age=(Date.now()-dob)/yearMs;
      liveAge.textContent=age.toFixed(10);
      requestAnimationFrame(tick);
    };
    tick();
  }

  const slides=[...document.querySelectorAll(".design-slide")];
  if(slides.length){let i=0;const show=()=>{slides.forEach((s,j)=>s.classList.toggle("active",j===i));const c=document.querySelector(".design-counter");if(c)c.textContent=String(i+1).padStart(2,"0")+" / "+String(slides.length).padStart(2,"0");i=(i+1)%slides.length};show();setInterval(show,2600);}

  document.querySelectorAll("[data-gallery]").forEach(gallery=>{
    const gs=[...gallery.querySelectorAll(".gallery-slide")], dots=gallery.querySelector(".gallery-dots"), count=gallery.querySelector(".gallery-count"); let i=0;
    gs.forEach((_,j)=>{const b=document.createElement("button");b.setAttribute("aria-label","View image "+(j+1));b.addEventListener("click",()=>show(j));dots.appendChild(b)});
    const show=j=>{i=(j+gs.length)%gs.length;gs.forEach((s,k)=>s.classList.toggle("active",k===i));[...dots.children].forEach((b,k)=>b.classList.toggle("active",k===i));count.textContent=String(i+1).padStart(2,"0")+" / "+String(gs.length).padStart(2,"0")};
    gallery.querySelector(".gallery-prev").addEventListener("click",()=>show(i-1));gallery.querySelector(".gallery-next").addEventListener("click",()=>show(i+1));show(0);
  });

  const designs={
    container:{title:"Container Cargo Dolly",kicker:"GSE · MECHANICAL DESIGN",desc:"A visual set showing multiple CAD views of the container cargo dolly design.",images:["assets/same_way_do_it_for_this_now._dont_change_the_colour_dimension_design_just_make_i.png","assets/__make_this_image_more_realistic_with_metallic_finish_and_aesthetic._dont_change.png"]},
    pallet10:{title:"10 Feet Pallet Dolly",kicker:"GSE · MECHANICAL DESIGN",desc:"Two rendered views of the 10-feet pallet dolly concept.",images:["assets/make_this_image_more_realistic_with_metallic_finish_and_aesthetic._dont_change_t.png","assets/make_this_image_more_realistic_with_metallic_finish_and_aest_10.png"]},
    pallet20:{title:"20 Feet Pallet Dolly",kicker:"GSE · MECHANICAL DESIGN",desc:"Two rendered views of the 20-feet pallet dolly concept.",images:["assets/make_this_image_more_realistic_with_metallic_finish_and_aest_11.png","assets/__make_this_image_more_realistic_with_metallic_finish_and_ae_12.png"]},
    nh90:{title:"NH90 False Landing Gear",kicker:"AEROSPACE · AIRCRAFT GSE",desc:"Six rendered views of the NH90 false landing gear system. Open the full case study for the engineering context, interfaces and design process.",images:["assets/make_this_design_more_realistic_and_aesthetic_finish_without_changing_the_colour.png","assets/same_way_do_it_for_this_now._dont_change_the_colour_dimensio_14.png","assets/same_way_do_it_for_this_now._dont_change_the_colour_dimensio_15.png","assets/same_way_do_it_for_this_now._dont_change_the_colour_dimensio_16.png","assets/same_way_do_it_for_this_now._dont_change_the_colour_dimensio_17.png","assets/same_way_do_it_for_this_now__1_.png"]},
    baggage:{title:"Open Baggage Cart",kicker:"GSE · MECHANICAL DESIGN",desc:"Two rendered views of the open baggage cart design.",images:["assets/__make_this_image_more_realistic_with_metallic_finish_and_ae_19.png","assets/__make_this_image_more_realistic_with_metallic_finish_and_ae_20.png"]}
  };
  const modal=document.querySelector(".design-modal");
  if(modal){let current=0,items=[];const image=modal.querySelector("#modal-image"),title=modal.querySelector("#modal-title"),kicker=modal.querySelector("#modal-kicker"),desc=modal.querySelector("#modal-desc"),count=modal.querySelector("#modal-count");
    const render=()=>{image.style.opacity=0;setTimeout(()=>{image.src=items[current];image.style.opacity=1;count.textContent=String(current+1).padStart(2,"0")+" / "+String(items.length).padStart(2,"0")},120)};
    const open=key=>{const d=designs[key];if(!d)return;items=d.images;current=0;title.textContent=d.title;kicker.textContent=d.kicker;desc.textContent=d.desc;modal.classList.add("open");modal.setAttribute("aria-hidden","false");render();document.body.style.overflow="hidden"};
    const close=()=>{modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""};
    document.querySelectorAll(".design-card[data-design]").forEach(c=>c.addEventListener("click",()=>open(c.dataset.design)));
    modal.querySelector(".modal-close").addEventListener("click",close);modal.querySelector(".modal-backdrop").addEventListener("click",close);modal.querySelector(".modal-prev").addEventListener("click",()=>{current=(current-1+items.length)%items.length;render()});modal.querySelector(".modal-next").addEventListener("click",()=>{current=(current+1)%items.length;render()});
    document.addEventListener("keydown",e=>{if(!modal.classList.contains("open"))return;if(e.key==="Escape")close();if(e.key==="ArrowLeft"){current=(current-1+items.length)%items.length;render()}if(e.key==="ArrowRight"){current=(current+1)%items.length;render()}});
  }

  document.querySelectorAll("[data-gallery]").forEach(gallery=>{
    let startX=0;
    gallery.addEventListener("touchstart",e=>{startX=e.changedTouches[0].clientX},{passive:true});
    gallery.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45){const btn=dx<0?gallery.querySelector(".gallery-next"):gallery.querySelector(".gallery-prev");btn.click()}},{passive:true});
  });

  const path=location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".links a").forEach(a=>{if(a.getAttribute("href")===path)a.classList.add("active")});
});
