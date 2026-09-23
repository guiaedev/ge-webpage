/** Independently eased botanical layers; paper and all content remain stationary. */
(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const pointer = matchMedia('(hover: hover) and (pointer: fine)');
 const mobile = matchMedia('(max-width:760px)');
 const scenes = [...document.querySelectorAll('.hero,.site-footer')].map(section => ({section, visible:true, px:0,py:0, layers:[...section.querySelectorAll('.plant-layer')].map(el=>({el,depth:Number(el.dataset.depth),x:0,y:0,tx:0,ty:0}))}));
 let frame=0, last=0;
 const clamp=(v,n)=>Math.max(-n,Math.min(n,v));
 function targets(){
  scenes.forEach(scene=>{
   if(!scene.visible)return;
   const r=scene.section.getBoundingClientRect();
   const distance=scene.section.classList.contains('hero')?-r.top:innerHeight/2-(r.top+r.height/2);
   scene.layers.forEach(l=>{l.tx=scene.px*l.depth;l.ty=clamp(distance*(mobile.matches?.025:.065),mobile.matches?7:22)*l.depth+scene.py*l.depth;});
  });
 }
 function render(time){
  frame=0;
  if(reduced.matches||document.hidden)return;
  const ease=1-Math.exp(-Math.min(time-last||16,50)/110);last=time;
  let moving=false;
  scenes.filter(s=>s.visible).forEach(s=>s.layers.forEach(l=>{
   l.x+=(l.tx-l.x)*ease;l.y+=(l.ty-l.y)*ease;
   if(Math.abs(l.tx-l.x)+Math.abs(l.ty-l.y)>.05)moving=true;
   l.el.style.transform=`translate3d(${l.x.toFixed(2)}px,${l.y.toFixed(2)}px,0)`;
  }));
  if(moving)frame=requestAnimationFrame(render);
 }
 function schedule(){if(reduced.matches||document.hidden)return;targets();if(!frame){last=0;frame=requestAnimationFrame(render);}}
 const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{entries.forEach(e=>{const s=scenes.find(s=>s.section===e.target);if(s)s.visible=e.isIntersecting;});schedule();},{rootMargin:'100px'}):null;
 scenes.forEach(s=>{
  observer?.observe(s.section);
  s.section.addEventListener('pointermove',e=>{if(!pointer.matches||reduced.matches)return;const r=s.section.getBoundingClientRect();s.px=((e.clientX-r.left)/r.width-.5)*12;s.py=((e.clientY-r.top)/r.height-.5)*8;schedule();},{passive:true});
  s.section.addEventListener('pointerleave',()=>{s.px=s.py=0;schedule();});
 });
 function reset(){cancelAnimationFrame(frame);frame=0;scenes.forEach(s=>{s.px=s.py=0;s.layers.forEach(l=>{l.x=l.y=l.tx=l.ty=0;l.el.style.removeProperty('transform');});});schedule();}
 reduced.addEventListener('change',reset);pointer.addEventListener('change',reset);mobile.addEventListener('change',reset);
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();});
 schedule();
})();
