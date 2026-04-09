// ═══════════════════════════════════════════════════════════
//  HISTORIAS VIRTUALES — MOTOR DEL JUEGO
// ═══════════════════════════════════════════════════════════

// ── GLOBAL DATA CONTAINERS (filled by story files) ──
const CHARACTERS     = [];
const STORY_CONTEXT  = {};
const COMPLETION_GIFTS = {};
const CHARACTER_DATA = {};
const ZONES          = {};
const SCENES         = {};
const SCENE_IMAGES   = {};
let   SCENE_CAPTIONS = {};
const TRIVIA_BANK    = {};
const SCENE_TRIVIA   = {};
const STORY_QUESTS   = {};
const QUEST_MARKERS  = {};

// ── SHOP CATALOG ──
const SHOP_CATALOG = [
  {id:'sh_lampara',  icon:'🪔',name:'Lámpara de Aceite',  desc:'La fe ilumina el camino cuando todo está oscuro.',                    cost:80,  bonuses:{fe:20},           category:'Fe'},
  {id:'sh_cayado',   icon:'🪶',name:'Pluma del Profeta',   desc:'Escrita con las palabras de quienes confiaron en Jehová.',            cost:120, bonuses:{fe:30},           category:'Fe'},
  {id:'sh_altar',    icon:'🔥',name:'Piedra del Altar',    desc:'Tomada del altar que Noé construyó al salir del arca.',              cost:200, bonuses:{fe:40,pac:10},    category:'Fe'},
  {id:'sh_pergamino',icon:'📜',name:'Pergamino Antiguo',   desc:'Contiene enseñanzas de los primeros patriarcas.',                    cost:80,  bonuses:{sab:20},          category:'Sabiduría'},
  {id:'sh_tablilla', icon:'🪨',name:'Tablilla de Piedra',  desc:'Grabada con las instrucciones del arca — medidas exactas.',         cost:130, bonuses:{sab:30,fe:5},     category:'Sabiduría'},
  {id:'sh_libro',    icon:'📖',name:'Libro de los Orígenes',desc:'Un registro detallado desde la creación hasta el diluvio.',         cost:220, bonuses:{sab:45},          category:'Sabiduría'},
  {id:'sh_semilla',  icon:'🌱',name:'Semilla del Edén',    desc:'Crecer lleva tiempo. La paciencia es su abono.',                    cost:70,  bonuses:{pac:20},          category:'Paciencia'},
  {id:'sh_ramo',     icon:'🕊',name:'Ramo de Olivo',       desc:'La señal que llegó después de meses de espera paciente.',           cost:110, bonuses:{pac:25,fe:10},    category:'Paciencia'},
  {id:'sh_arena',    icon:'⏳',name:'Arena del Desierto',  desc:'Cuarenta años en el desierto enseñan a esperar.',                   cost:180, bonuses:{pac:35,sab:10},   category:'Paciencia'},
];

const NON_TRADEABLE = ['El Fruto Prohibido','Hojas de Higuera','El Costo del Pecado Ajeno'];

// ── ACHIEVEMENTS ──
const ACHIEVEMENTS = [
  {id:'first_game',icon:'🎮',name:'Primera Historia',   desc:'Jugaste tu primera historia'},
  {id:'adan_done', icon:'🍎',name:'El Edén',            desc:'Completaste la historia de Adán y Eva'},
  {id:'noe_done',  icon:'⛵',name:'El Arca',            desc:'Completaste la historia de Noé'},
  {id:'both_done', icon:'✦', name:'Antes del Diluvio',  desc:'Completaste ambas historias del inicio'},
  {id:'shop_buy',  icon:'🏛',name:'Comerciante',        desc:'Compraste tu primer objeto en la tienda'},
  {id:'xp_100',    icon:'⭐',name:'Primer Centenario',  desc:'Acumulaste 100 XP globales'},
  {id:'xp_500',    icon:'🌟',name:'Fiel y Constante',   desc:'Acumulaste 500 XP globales'},
  {id:'daily_3',   icon:'📅',name:'Tres Días Seguidos', desc:'Reclamaste el premio 3 días consecutivos'},
];

// ── TUTORIAL STEPS ──
const TUTORIAL_STEPS = [
  {icon:'📖',title:'¿Cómo funciona el juego?',
   text:'Eres el protagonista de una historia bíblica. Cada decisión que tomes afecta tus cualidades y el rumbo de la historia. No hay una sola forma de jugar.'},
  {icon:'⚡',title:'Las 4 Cualidades',
   text:'✦ Fe · 📖 Sabiduría · ⏳ Paciencia · 🕊 Humildad\n\nCada cualidad empieza baja. Las buenas decisiones las suben. Las malas las bajan. Si 3 llegan a cero... la historia termina.'},
  {icon:'🕊',title:'La Humildad es especial',
   text:'La Humildad NO se puede comprar ni canjear. Solo crece cuando tomas decisiones de obediencia y humildad. Es la cualidad más difícil de mantener.'},
  {icon:'🔒',title:'Opciones bloqueadas',
   text:'Si una cualidad llega a cero, las opciones que la requerían se bloquean con 🔒. Hay caminos que se cierran para siempre en esa partida.'},
  {icon:'🎁',title:'El Inventario y el Canje',
   text:'Las buenas decisiones te regalan objetos. Puedes canjearlos por puntos de cualidad cuando estés en apuros. Úsalos estratégicamente.'},
  {icon:'🏛',title:'La Tienda',
   text:'Con XP acumulado entre partidas puedes comprar objetos en la tienda. Cada objeto da bonus distintos. ¡Ahorra XP para los momentos difíciles!'},
  {icon:'✦',title:'¡Listo para comenzar!',
   text:'Recuerda: esta no es solo una historia. Es una pregunta: ¿Qué hubiera pasado si...? Tus decisiones lo definen.\n\n¡Que la fe te guíe!'},
];

// ── GAME STATE ──
const G = {char:null, stats:{}, inventory:[], quests:[], currentScene:null, currentZone:null, rightTab:'quests'};
const T = {queue:[], answered:new Set(), current:null};

// ── DAILY REWARD CONSTANTS ──
const DAILY_XP = 24, HOURLY_RATE = 0.5, EARLY_PENALTY = 12;

// ═══════════════════════════════
//  LOCALSTORAGE HELPERS
// ═══════════════════════════════
const LS = {
  get:(k,d='')=>{try{return localStorage.getItem(k)||d;}catch(e){return d;}},
  set:(k,v)=>{try{localStorage.setItem(k,v);}catch(e){}},
  getJSON:(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d));}catch(e){return d;}},
  setJSON:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}},
};

function getGlobalXP(){return parseInt(LS.get('hv_global_xp','0'));}
function addGlobalXP(n){LS.set('hv_global_xp',String(getGlobalXP()+n));updateShopXPDisplay();}
function spendGlobalXP(n){const c=getGlobalXP();if(c<n)return false;LS.set('hv_global_xp',String(c-n));updateShopXPDisplay();return true;}
function getCompleted(){return LS.getJSON('hv_completed',[]);}
function markCompleted(id){const l=getCompleted();if(!l.includes(id)){l.push(id);LS.setJSON('hv_completed',l);}}
function isUnlocked(id){const ctx=STORY_CONTEXT[id];if(!ctx||!ctx.requires)return true;return getCompleted().includes(ctx.requires);}
function isCompleted(id){return getCompleted().includes(id);}
function getPurchased(){return LS.getJSON('hv_purchased',[]);}
function addPurchased(id){const l=getPurchased();if(!l.includes(id)){l.push(id);LS.setJSON('hv_purchased',l);}}
function getEarnedAchievements(){return LS.getJSON('hv_achievements',[]);}
function getLifetimeStats(){return LS.getJSON('hv_lifetime_stats',{fe:0,sab:0,pac:0,hum:0});}
function updateLifetimeStats(){if(!G.stats)return;const c=getLifetimeStats();['fe','sab','pac','hum'].forEach(k=>{if((G.stats[k]||0)>(c[k]||0))c[k]=G.stats[k];});LS.setJSON('hv_lifetime_stats',c);}
function hasSave(id){try{const s=localStorage.getItem('hv_save_'+id);return s?JSON.parse(s):null;}catch(e){return null;}}
function clearSave(id){try{localStorage.removeItem('hv_save_'+(id||G.char?.id));}catch(e){}}

// ═══════════════════════════════
//  TRANSITIONS
// ═══════════════════════════════
function sceneTransition(cb, ms=300){
  const o=document.getElementById('scene-transition');
  if(!o){cb();return;}
  o.classList.add('fade-in');
  setTimeout(()=>{cb();setTimeout(()=>o.classList.remove('fade-in'),60);},ms);
}
function screenTransition(fn){
  const o=document.getElementById('scene-transition');
  if(!o){fn();return;}
  o.classList.add('fade-in');
  setTimeout(()=>{fn();setTimeout(()=>o.classList.remove('fade-in'),60);},220);
}
function pulseStatBar(k){
  const b=document.getElementById('bar-'+k);
  if(!b)return;b.classList.remove('stat-changed');void b.offsetWidth;b.classList.add('stat-changed');
  setTimeout(()=>b.classList.remove('stat-changed'),600);
}

// ═══════════════════════════════
//  SCREENS
// ═══════════════════════════════
function hideAll(){
  ['screen-title','screen-map-select','screen-timeline','screen-game',
   'screen-cards','screen-profile'].forEach(id=>{
    const el=document.getElementById(id);if(el)el.style.display='none';
  });
}

function showMapSelect(){
  screenTransition(()=>{
    hideAll();
    const el=document.getElementById('screen-map-select');
    el.style.display='flex';
    const img=document.getElementById('map-sel-img');
    img.src='images/mapa1.jpg';
    updateMapPins();
  });
}

function updateMapPins(){
  Object.keys(STORY_CONTEXT).forEach(id=>{
    const pin=document.getElementById('pin-'+id);
    if(!pin)return;
    const unlocked=isUnlocked(id), completed=isCompleted(id);
    const char=CHARACTERS.find(c=>c.id===id);
    const icon=pin.querySelector('.pin-icon');
    const label=pin.querySelector('.pin-label');
    if(!unlocked){
      pin.style.opacity='0.4';pin.style.cursor='not-allowed';
      pin.onclick=()=>showLockedToast(id);
      if(icon)icon.textContent='🔒';
      if(label){const req=CHARACTERS.find(c=>c.id===STORY_CONTEXT[id].requires);label.innerHTML=(char?.name||id)+'<br><span>Completa '+(req?.name||'historia anterior')+' primero</span>';}
    } else {
      pin.style.opacity='1';pin.style.cursor='pointer';
      pin.onclick=()=>selectStory(id);
      if(icon)icon.textContent=completed?'✅':(char?.icon||'📍');
      if(label)label.innerHTML=(char?.name||id)+'<br><span>'+STORY_CONTEXT[id].dates+(completed?' · Completada':'')+'</span>';
    }
  });
}

function showLockedToast(id){
  const ctx=STORY_CONTEXT[id];
  const req=CHARACTERS.find(c=>c.id===ctx.requires);
  const t=document.createElement('div');
  t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(10,6,3,0.95);border:1px solid var(--gold-dark);color:var(--parchment);font-family:Cinzel,serif;font-size:0.78rem;padding:0.55rem 1.1rem;z-index:400;white-space:nowrap;';
  t.textContent='🔒 Completa '+(req?.name||'la historia anterior')+' primero';
  document.body.appendChild(t);setTimeout(()=>t.remove(),2200);
}

function selectStory(charId){
  screenTransition(()=>{
    hideAll();
    const ctx=STORY_CONTEXT[charId];
    const char=CHARACTERS.find(c=>c.id===charId);
    document.getElementById('tl-icon').textContent=char.icon;
    document.getElementById('tl-name').textContent=char.name;
    document.getElementById('tl-era').textContent=ctx.dates+' · '+ctx.location;
    document.getElementById('tl-desc').textContent=ctx.description;
    document.getElementById('tl-img').src='images/timeline.jpg';
    const marker=document.getElementById('tl-marker');
    marker.style.left=ctx.timelinePos+'%';
    document.getElementById('tl-marker-label').textContent=ctx.markerLabel;
    // Continue button
    const save=hasSave(charId);
    const startBtn=document.getElementById('tl-start-btn');
    const old=document.getElementById('tl-continue-btn');if(old)old.remove();
    if(save){
      startBtn.textContent='🔄 Nueva partida';
      startBtn.onclick=()=>{clearSave(charId);startGame(charId);};
      const cb=document.createElement('button');
      cb.id='tl-continue-btn';cb.className='btn-menu';
      cb.style.cssText='margin-right:0.5rem;background:linear-gradient(135deg,#1a3a1a,#2a5a2a);border-color:#5adc5a;color:#5adc5a;';
      cb.textContent='▶ Continuar ('+new Date(save.timestamp).toLocaleDateString('es-AR')+')';
      cb.onclick=()=>loadGame(charId);
      startBtn.parentNode.insertBefore(cb,startBtn);
    } else {
      startBtn.textContent='⚔ Comenzar Historia';
      startBtn.onclick=()=>startGame(charId);
    }
    document.getElementById('screen-timeline').style.display='flex';
  });
}

function showCards(){
  screenTransition(()=>{
    hideAll();
    renderCards();
    document.getElementById('screen-cards').style.display='flex';
  });
}

function renderCards(){
  const store=getImgStore();
  const grid=document.getElementById('cards-grid');
  if(!grid)return;
  grid.innerHTML=Object.entries(CHARACTER_DATA).map(([id,c])=>{
    const unlocked=isUnlocked(id);
    const statsHtml=c.stats.map(s=>`<div class="ficha-stat"><div class="ficha-stat-label">${s.label}</div><div class="ficha-stat-bar-wrap"><div class="ficha-stat-bar" style="width:${s.val}%;background:${s.color}"></div></div><div class="ficha-stat-val">${s.val}/100</div></div>`).join('');
    const tagsHtml=c.tags.map(t=>`<span class="ficha-tag">${t}</span>`).join('');
    const curiHtml=c.curiosities.map(cu=>`<div style="font-size:0.72rem;color:var(--parchment-dark);padding:0.12rem 0;border-bottom:1px solid rgba(201,168,76,0.07)">· ${cu}</div>`).join('');
    const btn=unlocked
      ?`<button class="ficha-play-btn" onclick="selectStory('${id}')">⚔ &nbsp;Jugar esta historia</button>`
      :`<button class="ficha-play-btn" style="background:rgba(40,25,10,0.6);color:var(--gold-dark);cursor:not-allowed;border:1px solid rgba(201,168,76,0.15)" disabled>🔒 &nbsp;Completa ${CHARACTERS.find(c2=>c2.id===STORY_CONTEXT[id]?.requires)?.name||'la anterior'} primero</button>`;
    return `<div class="char-ficha"><div class="ficha-img-wrap"><img src="${store[c.imgKey]||''}" alt="${c.fullName}"><div class="ficha-img-overlay"></div><div class="ficha-img-name">${c.fullName}</div><div class="ficha-img-era">${c.era}</div></div><div class="ficha-body"><div class="ficha-tags">${tagsHtml}</div><div class="ficha-desc">${c.desc}</div><div class="ficha-stats">${statsHtml}</div><div style="margin-bottom:0.4rem">${curiHtml}</div><div class="ficha-verse">${c.verse}</div>${btn}</div></div>`;
  }).join('');
}

function showProfile(){
  screenTransition(()=>{
    hideAll();
    checkAchievements();
    renderProfile();
    document.getElementById('screen-profile').style.display='flex';
  });
}

function renderProfile(){
  const gxp=getGlobalXP(), comp=getCompleted(), earned=getEarnedAchievements();
  const purchased=getPurchased(), ls=getLifetimeStats();
  document.getElementById('prof-xp').textContent=gxp+' XP total';
  document.getElementById('prof-xp-fill').style.width=Math.min(100,(gxp/500)*100)+'%';
  const SC={fe:'#c9a84c',sab:'#4a9adc',pac:'#5adc5a',hum:'#dc5adc'};
  const SL={fe:'✦ Fe',sab:'📖 Sabiduría',pac:'⏳ Paciencia',hum:'🕊 Humildad'};
  const SN={fe:'Solo crece con decisiones de fe',sab:'Crece respondiendo preguntas y con sabias decisiones',pac:'Crece esperando y resistiendo la impaciencia',hum:'No se puede comprar ni canjear — solo con obediencia'};
  let statsH='';Object.entries(SL).forEach(([k,l])=>{const v=ls[k]||0;statsH+=`<div class="prof-stat-row"><div class="prof-stat-top"><span class="prof-stat-name">${l}</span><span class="prof-stat-val">${v}/100</span></div><div class="prof-stat-track"><div class="prof-stat-fill" style="width:${v}%;background:${SC[k]}"></div></div><div class="prof-stat-note">${SN[k]}</div></div>`;});
  let storiesH='';Object.entries(STORY_CONTEXT).forEach(([id,ctx])=>{const char=CHARACTERS.find(c=>c.id===id);const done=comp.includes(id);const ul=isUnlocked(id);const sc=done?'status-done':ul?'status-open':'status-lock';const st=done?'✓ Completada':ul?'Disponible':'🔒 Bloqueada';storiesH+=`<div class="prof-story-row"><span class="prof-story-icon">${done?'✅':(char?.icon||'📍')}</span><div><div class="prof-story-name">${char?.name||id}</div><div class="prof-story-status ${sc}">${st} · ${ctx.dates}</div></div></div>`;});
  let achH='';ACHIEVEMENTS.forEach(a=>{const got=earned.includes(a.id);achH+=`<div class="prof-achievement"><span class="prof-ach-icon${got?' earned':''}">${a.icon}</span><div><div class="prof-ach-name${got?' earned':''}">${a.name}</div><div class="prof-ach-desc">${a.desc}</div></div></div>`;});
  const shopItems=SHOP_CATALOG.filter(i=>purchased.includes(i.id));
  const shopH=shopItems.length>0?shopItems.map(i=>`<div class="prof-inv-item"><span class="prof-inv-icon">${i.icon}</span><div><div style="font-family:Cinzel,serif;font-size:0.72rem;color:var(--gold-light)">${i.name}</div><div style="font-size:0.65rem;font-style:italic;color:var(--parchment-dark)">${i.desc}</div></div></div>`).join(''):'<div style="color:var(--gold-dark);font-style:italic;font-size:0.78rem">Todavía no compraste objetos.</div>';
  let giftsH='';Object.entries(COMPLETION_GIFTS).forEach(([sid,g])=>{const done=comp.includes(sid);const char=CHARACTERS.find(c=>c.id===sid);const bt=Object.entries(g.shopBonuses).map(([k,v])=>({fe:'Fe',sab:'Sab',pac:'Pac',hum:'Hum'}[k]+' +'+v)).join(', ');giftsH+=`<div class="prof-inv-item" style="${done?'':'opacity:0.4'}"><span class="prof-inv-icon">${done?g.icon:'🔒'}</span><div><div style="font-family:Cinzel,serif;font-size:0.72rem;color:var(--gold-light)">${done?g.name:'???'} <span style="color:var(--gold-dark);font-size:0.6rem">(${char?.name||sid})</span></div><div style="font-size:0.65rem;font-style:italic;color:var(--parchment-dark)">${done?g.desc:'Completa la historia para desbloquear'}</div>${done?`<div style="font-size:0.62rem;color:#5adc5a;font-family:Cinzel,serif">${bt}</div>`:''}</div></div>`;});
  document.getElementById('profile-grid').innerHTML=
    `<div class="profile-card" style="grid-column:1/-1"><div class="profile-card-title">⚡ Cualidades — Mejor marca personal</div>${statsH}</div>`+
    `<div class="profile-card"><div class="profile-card-title">📖 Historias</div>${storiesH}</div>`+
    `<div class="profile-card"><div class="profile-card-title">🏆 Logros</div>${achH}</div>`+
    `<div class="profile-card" style="grid-column:1/-1"><div class="profile-card-title">🎒 Objetos de tienda</div>${shopH}</div>`+
    `<div class="profile-card" style="grid-column:1/-1"><div class="profile-card-title">🌿 Regalos de completar historia</div>${giftsH}</div>`;
}

// ═══════════════════════════════
//  GAME START / LOAD
// ═══════════════════════════════
function startGame(charId){
  const char=CHARACTERS.find(c=>c.id===charId);
  G.char=char;
  G.stats={...char.stats,xp:0,level:1};
  G.inventory=[];
  G.quests=JSON.parse(JSON.stringify(STORY_QUESTS[charId]||[]));
  G.currentZone=char.startZone;
  G.rightTab='quests';
  T.queue=[];T.answered=new Set();T.current=null;
  // Reset zones
  Object.values(ZONES).forEach(z=>z.unlocked=false);
  ZONES[char.startZone] && (ZONES[char.startZone].unlocked=true);
  hideAll();
  document.getElementById('screen-game').style.display='flex';
  document.getElementById('story-box').innerHTML='';
  document.getElementById('scene-image-wrap').classList.add('hidden');
  updateHUD();renderMap();renderRightPanel();updateTriviaHudBtn();
  playScene(char.startScene);
}

function loadGame(charId){
  const save=hasSave(charId);if(!save)return false;
  const char=CHARACTERS.find(c=>c.id===charId);if(!char)return false;
  G.char=char;G.stats=save.stats;G.inventory=save.inventory||[];
  G.quests=save.quests||JSON.parse(JSON.stringify(STORY_QUESTS[charId]||[]));
  G.currentZone=save.currentZone||char.startZone;G.rightTab='quests';
  T.answered=new Set(save.triviaAnswered||[]);T.queue=[];T.current=null;
  // Restore zones
  Object.values(ZONES).forEach(z=>z.unlocked=false);
  ZONES[char.startZone]&&(ZONES[char.startZone].unlocked=true);
  restoreZoneUnlocks(save.currentScene);
  hideAll();
  const sg=document.getElementById('screen-game');sg.style.display='flex';
  document.getElementById('story-box').innerHTML='';
  document.getElementById('scene-image-wrap').classList.add('hidden');
  updateHUD();renderMap();renderRightPanel();updateTriviaHudBtn();
  playScene(save.currentScene);return true;
}

function restoreZoneUnlocks(sceneId){
  const unlockMap={
    adan_serpiente:['arbol'],adan_curiosidad:['arbol'],
    adan_ambos_comen:['arbol','expulsion'],adan_juicio:['arbol','expulsion'],
    adan_expulsion:['arbol','expulsion'],adan_vida_fuera:['arbol','expulsion'],
    noe_acepta_total:['construccion'],noe_predicador:['construccion'],
    noe_entrada_arca:['construccion','arca_adentro'],noe_diluvio:['construccion','arca_adentro'],
    noe_paloma:['construccion','arca_adentro'],
    noe_salida:['construccion','arca_adentro','tierra_nueva'],
    noe_final:['construccion','arca_adentro','tierra_nueva'],
  };
  const scenes=Object.keys(SCENES);
  const idx=scenes.indexOf(sceneId);
  scenes.slice(0,idx+1).forEach(sid=>{(unlockMap[sid]||[]).forEach(z=>{if(ZONES[z])ZONES[z].unlocked=true;});});
}

function saveGame(){
  if(!G.char||!G.currentScene)return;
  try{localStorage.setItem('hv_save_'+G.char.id,JSON.stringify({charId:G.char.id,stats:G.stats,inventory:G.inventory,quests:G.quests,currentScene:G.currentScene,currentZone:G.currentZone,triviaAnswered:[...T.answered],timestamp:Date.now()}));}catch(e){}
}

function goToMenu(){
  clearSave(G.char?.id);
  G.char=null;G.stats={};G.inventory=[];G.quests=[];G.currentScene=null;G.currentZone=null;
  document.getElementById('story-box').innerHTML='';
  document.getElementById('scene-image-wrap').classList.add('hidden');
  screenTransition(()=>{hideAll();document.getElementById('screen-title').style.display='flex';});
}

function restartStory(){
  const id=G.char?.id;clearSave(id);
  G.char=null;document.getElementById('screen-game').style.display='none';
  document.getElementById('story-box').innerHTML='';
  document.getElementById('scene-image-wrap').classList.add('hidden');
  if(id)selectStory(id);else showMapSelect();
}

// ═══════════════════════════════
//  PLAY SCENE
// ═══════════════════════════════
function playScene(sceneId){
  const scene=SCENES[sceneId];
  if(!scene){addMsg('narration','✦ Fin de esta parte de la historia. Pronto habrá más capítulos. ✦');document.getElementById('choices-area').innerHTML='';return;}
  const ca=document.getElementById('choices-area');if(ca)ca.classList.add('hidden-choices');
  sceneTransition(()=>{
    _playSceneInner(sceneId);
    setTimeout(()=>{if(ca)ca.classList.remove('hidden-choices');},180);
  });
}

function _playSceneInner(sceneId){
  const scene=SCENES[sceneId];
  G.currentScene=sceneId;
  if(scene.zone){G.currentZone=scene.zone;renderMap();}
  if(scene.unlockZone){ZONES[scene.unlockZone]&&(ZONES[scene.unlockZone].unlocked=true);renderMap();}
  updateLocationBar();updateSceneImage(sceneId);
  if(scene.xp)applyXP(scene.xp);
  applyEffects(scene);
  if(scene.item){const ah=G.inventory.some(i=>i.name===scene.item.name);if(!ah){G.inventory.push(scene.item);renderRightPanel();}}
  if(scene.narration)addMsg('narration',scene.narration);
  if(scene.dialog){
    const d=document.createElement('div');d.className='story-msg';
    d.innerHTML=(scene.speaker?`<div class="story-speaker">💬 ${scene.speaker}</div>`:'')+`<div class="story-dialog">${scene.dialog}</div>`;
    if(scene.speaker2&&scene.dialog2)d.innerHTML+=`<div class="story-speaker" style="margin-top:0.5rem">💬 ${scene.speaker2}</div><div class="story-dialog">${scene.dialog2}</div>`;
    document.getElementById('story-box').appendChild(d);scrollStory();
  }
  if(scene.event&&scene.eventText){addMsg('event',scene.eventText);markQuestDone(sceneId);}
  queueTriviaForScene(sceneId);
  if(T.queue.length>0)setTimeout(()=>openTrivia(),1800);
  if(scene.choices&&scene.choices.length>0){renderChoices(scene.choices);}
  else if(scene.next){renderChoices([{text:'Continuar...',next:scene.next,xp:0}]);}
  else{
    const id=G.char?.id;
    let giftHtml='';clearSave(id);
    if(id){addGlobalXP(15);const first=!isCompleted(id);markCompleted(id);showToast('✦ Historia completada · +15 XP');
      if(first&&COMPLETION_GIFTS[id]){const g=COMPLETION_GIFTS[id];const ah=G.inventory.some(i=>i.name===g.name);if(!ah){G.inventory.push({...g});renderRightPanel();const bt=Object.entries(g.shopBonuses).map(([k,v])=>({fe:'Fe',sab:'Sab',pac:'Pac',hum:'Hum'}[k]+' +'+v)).join(', ');giftHtml=`<div style="margin:0.6rem auto;max-width:300px;background:rgba(201,168,76,0.07);border:1px solid var(--gold-dark);padding:0.55rem 0.75rem;display:flex;align-items:center;gap:0.55rem"><span style="font-size:1.4rem">${g.icon}</span><div style="text-align:left"><div style="font-family:Cinzel,serif;font-size:0.75rem;color:var(--gold-light)">${g.name}</div><div style="font-size:0.67rem;color:var(--parchment-dark);font-style:italic">${g.desc}</div><div style="font-size:0.62rem;color:#5adc5a;font-family:Cinzel,serif">Canjeable · ${bt}</div></div></div>`;}}
      checkAchievements();updateMapPins();}
    document.getElementById('choices-area').innerHTML=`<div style="text-align:center;padding:1rem"><div style="font-family:'Cinzel',serif;color:var(--gold);font-size:1rem;margin-bottom:0.35rem">✦ &nbsp;Historia completada&nbsp; ✦</div><div style="font-family:'Crimson Text',serif;color:var(--gold-dark);font-size:0.83rem;font-style:italic;margin-bottom:0.5rem">+15 XP de experiencia ganados</div>${giftHtml}<button class="btn-menu" style="margin-top:0.75rem" onclick="goToMenu()">↩ Volver al Menú Principal</button></div>`;
  }
  updateHUD();renderRightPanel();saveGame();
}

// ═══════════════════════════════
//  CHOICES
// ═══════════════════════════════
const STAT_LABELS={fe:'✦ Fe',sab:'📖 Sab',pac:'⏳ Pac',hum:'🕊 Hum'};
const STAT_COLORS={fe:'#c9a84c',sab:'#4a9adc',pac:'#5adc5a',hum:'#dc5adc'};

function canChoose(c){if(!c.requires)return true;return(G.stats[c.requires]||0)>0;}

function renderChoices(choices){
  const area=document.getElementById('choices-area');
  area.innerHTML=`<div class="choices-label">¿Qué harás?</div><div class="choices-list" id="choices-list"></div>`;
  const list=document.getElementById('choices-list');
  choices.forEach((c,i)=>{
    const able=canChoose(c);
    const btn=document.createElement('button');
    btn.className='choice-btn'+(able?'':' choice-disabled');
    let tags='';
    ['fe','sab','pac','hum'].forEach(k=>{if(c[k]){tags+=`<span class="stat-tag" style="color:${STAT_COLORS[k]}">${STAT_LABELS[k]}${c[k]>0?'+':''}${c[k]}</span>`;}});
    const reqLabel=c.requires&&!able?`<span class="req-label">🔒 ${STAT_LABELS[c.requires]}=0</span>`:'';
    btn.innerHTML=`<span class="choice-num">${i+1}.</span><span class="choice-text">${c.text}</span><span class="choice-tags">${tags}${reqLabel}</span>`;
    if(able)btn.onclick=()=>chooseOption(c);
    list.appendChild(btn);
  });
}

function chooseOption(choice){
  const div=document.createElement('div');div.className='story-msg';
  div.innerHTML=`<div class="story-speaker">🧑 Tú decides</div><div class="story-dialog story-player">${choice.text}</div>`;
  document.getElementById('story-box').appendChild(div);scrollStory();
  if(choice.xp)applyXP(choice.xp);
  applyEffects(choice);
  if(choice.item){const ah=G.inventory.some(i=>i.name===choice.item.name);if(!ah){G.inventory.push(choice.item);showToast(choice.item.icon+' '+choice.item.name);renderRightPanel();}}
  checkStatWarnings();
  setTimeout(()=>{if(choice.next)setTimeout(()=>playScene(choice.next),120);else{document.getElementById('choices-area').innerHTML=`<div style="text-align:center;padding:0.8rem;font-family:Cinzel,serif;color:var(--gold);font-size:0.8rem">✦ Fin de este capítulo ✦</div>`;}},350);
}

// ═══════════════════════════════
//  STATS & XP
// ═══════════════════════════════
function applyXP(n){G.stats.xp+=n;addGlobalXP(n);showToast('+'+n+' XP');const need=G.stats.level*100;if(G.stats.xp>=need){G.stats.xp-=need;G.stats.level++;addMsg('system','✦ ¡Nivel '+G.stats.level+' alcanzado! ✦');}updateHUD();updateLifetimeStats();checkAchievements();}

function applyEffects(obj){
  const cl=v=>Math.max(0,Math.min(100,v));
  ['fe','sab','pac','hum'].forEach(k=>{if(obj[k]!==undefined){const prev=G.stats[k];G.stats[k]=cl((G.stats[k]||0)+obj[k]);if(G.stats[k]!==prev)setTimeout(()=>pulseStatBar(k),80);}});
  updateHUD();
}

function checkStatWarnings(){
  const s=G.stats;
  const names={fe:'Fe',sab:'Sabiduría',pac:'Paciencia',hum:'Humildad'};
  const zeroed=['fe','sab','pac','hum'].filter(k=>s[k]<=0);
  const low=['fe','sab','pac','hum'].filter(k=>s[k]>0&&s[k]<=10);
  if(zeroed.length>=3){
    const tradeable=G.inventory.filter(i=>!NON_TRADEABLE.includes(i.name));
    if(tradeable.length>0)showLastChanceWarning(zeroed.map(k=>names[k]));
    else setTimeout(()=>showGameOver(),350);
    return;
  }
  if(zeroed.length===2){
    const tradeable=G.inventory.filter(i=>!NON_TRADEABLE.includes(i.name));
    if(tradeable.length>0)showTradeReminder(zeroed.map(k=>names[k]));
    else showToast('⚠ '+zeroed.map(k=>names[k]).join(' y ')+' en cero');
    return;
  }
  if(zeroed.length>0)showToast('💔 '+zeroed.map(k=>names[k]).join(', ')+' en cero');
  else if(low.length>0)showToast('⚠ '+low.map(k=>names[k]).join(', ')+' muy bajo');
}

function showTradeReminder(zn){
  const t=G.inventory.filter(i=>!NON_TRADEABLE.includes(i.name)).length;
  const box=document.getElementById('story-box');
  const div=document.createElement('div');div.className='story-msg';
  div.innerHTML=`<div style="background:rgba(139,100,20,0.18);border:1px solid var(--gold-dark);padding:0.8rem;text-align:center"><div style="font-family:Cinzel,serif;font-size:0.78rem;color:var(--gold);margin-bottom:0.4rem">🎁 Recordatorio — Podés usar tus objetos</div><div style="font-size:0.82rem;color:var(--parchment-dark);font-style:italic;margin-bottom:0.6rem"><strong>${zn.join(' y ')}</strong> en cero. Te queda 1 más antes del final. Tenés <strong>${t} objeto${t>1?'s':''}</strong> canjeables.</div><button onclick="openTrade()" style="background:linear-gradient(135deg,var(--gold-dark),var(--gold));border:none;color:var(--ink);font-family:Cinzel,serif;font-size:0.78rem;padding:0.45rem 1.1rem;cursor:pointer;font-weight:600">🎁 Canjear ahora</button></div>`;
  box.appendChild(div);scrollStory();
}

function showLastChanceWarning(zn){
  const t=G.inventory.filter(i=>!NON_TRADEABLE.includes(i.name)).length;
  const box=document.getElementById('story-box');
  const div=document.createElement('div');div.className='story-msg';
  div.innerHTML=`<div class="last-chance-msg"><div style="font-family:Cinzel,serif;font-size:0.92rem;color:#dc5a5a;margin-bottom:0.4rem">💔 ¡Última oportunidad!</div><div style="font-size:0.87rem;color:var(--parchment);margin-bottom:0.35rem"><strong>${zn.join(', ')}</strong> llegaron a cero.</div><div style="font-size:0.82rem;color:var(--parchment-dark);margin-bottom:0.75rem">Todavía tenés <strong>${t} objeto${t>1?'s':''}</strong> que podés canjear por +15 puntos de cualidad.</div><div style="display:flex;gap:0.55rem;justify-content:center;flex-wrap:wrap"><button onclick="openTrade()" style="background:linear-gradient(135deg,var(--gold-dark),var(--gold));border:none;color:var(--ink);font-family:Cinzel,serif;font-size:0.82rem;padding:0.55rem 1.2rem;cursor:pointer;font-weight:600">🎁 Canjear objeto</button><button onclick="showGameOver()" style="background:transparent;border:1px solid rgba(220,90,90,0.45);color:#dc5a5a;font-family:Cinzel,serif;font-size:0.72rem;padding:0.55rem 0.9rem;cursor:pointer">Aceptar derrota</button></div></div>`;
  box.appendChild(div);scrollStory();
  document.getElementById('choices-area').innerHTML=`<div style="text-align:center;padding:0.7rem;color:var(--gold-dark);font-family:Cinzel,serif;font-size:0.75rem">⬆ Revisa el mensaje de arriba antes de continuar</div>`;
}

function showGameOver(){
  clearSave(G.char?.id);addGlobalXP(15);
  const box=document.getElementById('story-box');
  const div=document.createElement('div');div.className='story-msg';
  div.innerHTML=`<div class="story-event" style="background:rgba(139,26,26,0.28);border-color:rgba(220,90,90,0.6)">💔 &nbsp;Tres cualidades en cero · La historia terminó aquí&nbsp; 💔<br><span style="font-size:0.82rem;font-style:italic;color:var(--parchment-dark)">Cada decisión tiene consecuencias. Inténtalo de nuevo.</span></div>`;
  box.appendChild(div);scrollStory();
  document.getElementById('choices-area').innerHTML=`<div style="text-align:center;padding:0.9rem"><div style="font-family:'Crimson Text',serif;color:var(--gold-dark);font-size:0.82rem;font-style:italic;margin-bottom:0.7rem">+15 XP por el intento · Sigue intentando</div><div style="display:flex;gap:0.7rem;justify-content:center;flex-wrap:wrap"><button class="btn-menu" onclick="restartStory()">🔄 Intentar de nuevo</button><button class="btn-menu" onclick="goToMenu()">↩ Menú Principal</button></div></div>`;
}

// ═══════════════════════════════
//  HUD
// ═══════════════════════════════
function updateHUD(){
  const s=G.stats;
  if(!document.getElementById('hud-name'))return;
  document.getElementById('hud-name').textContent=G.char?.name||'—';
  document.getElementById('hud-xp').textContent=s.xp||0;
  document.getElementById('bar-xp').style.width=Math.min(100,((s.xp||0)/(s.level*100))*100)+'%';
  ['fe','sab','pac','hum'].forEach(k=>{
    const v=s[k]||0;
    const el=document.getElementById('hud-'+k);if(el)el.textContent=v;
    const b=document.getElementById('bar-'+k);if(b)b.style.width=v+'%';
  });
}

// ═══════════════════════════════
//  MAP
// ═══════════════════════════════
function renderMap(){
  const charZones={adan:['eden','arbol','expulsion'],noe:['tierra_noe','construccion','arca_adentro','tierra_nueva']};
  const ids=charZones[G.char?.id]||[];
  document.getElementById('map-zones').innerHTML=ids.map(zid=>{
    const z=ZONES[zid];if(!z)return '';
    const act=zid===G.currentZone;
    const cls=act?'active':z.unlocked?'':'locked';
    return `<div class="map-zone ${cls}" onclick="${z.unlocked?`travelTo('${zid}')`:''}" ><span class="zone-icon">${z.icon}</span><span class="zone-name">${z.name}</span>${!z.unlocked?'<span style="font-size:0.6rem;color:var(--gold-dark)">🔒</span>':''}</div>`;
  }).join('');
}

function travelTo(zid){if(!ZONES[zid]?.unlocked)return;G.currentZone=zid;renderMap();updateLocationBar();addMsg('system',`Viajando a ${ZONES[zid].name}…`);}

function updateLocationBar(){
  const z=ZONES[G.currentZone];if(!z)return;
  document.getElementById('loc-icon').textContent=z.icon;
  document.getElementById('loc-name').textContent=z.name;
  document.getElementById('loc-desc').textContent=z.desc;
}

// ═══════════════════════════════
//  RIGHT PANEL
// ═══════════════════════════════
function switchTab(tab,e){
  G.rightTab=tab;
  document.querySelectorAll('.right-tab').forEach(t=>t.classList.remove('active'));
  if(e&&e.target)e.target.classList.add('active');
  renderRightPanel();
}

function renderRightPanel(){
  const el=document.getElementById('right-content');if(!el)return;
  if(G.rightTab==='quests'){
    el.innerHTML=G.quests.map(q=>`<div class="quest-item ${q.done?'quest-done':''}"><div class="quest-name">${q.done?'✔ ':'○ '}${q.name}</div><div class="quest-desc">${q.desc}</div></div>`).join('')||'<div style="color:var(--gold-dark);font-size:0.77rem;padding:0.5rem">Sin misiones activas.</div>';
  } else if(G.rightTab==='inv'){
    const tradeable=G.inventory.filter(i=>!NON_TRADEABLE.includes(i.name)).length;
    el.innerHTML=(G.inventory.length?G.inventory.map(i=>{const t=!NON_TRADEABLE.includes(i.name);return`<div class="inv-item" style="${t?'':'opacity:0.55'}"><span class="inv-icon">${i.icon}</span><div><div style="color:var(--gold-light);font-size:0.73rem;font-family:Cinzel,serif">${i.name}</div><div style="font-size:0.63rem;font-style:italic;color:var(--parchment-dark)">${i.desc||''}</div>${t?'<div style="font-size:0.58rem;color:#5adc5a;font-family:Cinzel,serif">canjeable</div>':'<div style="font-size:0.58rem;color:#8b4444;font-family:Cinzel,serif">no canjeable</div>'}</div></div>`;}).join(''):'<div style="color:var(--gold-dark);font-size:0.77rem;padding:0.5rem;font-style:italic">Inventario vacío.</div>')+(tradeable>0?`<button onclick="openTrade()" style="width:100%;margin-top:0.5rem;background:rgba(201,168,76,0.1);border:1px solid var(--gold-dark);color:var(--gold);font-family:Cinzel,serif;font-size:0.68rem;padding:0.45rem;cursor:pointer;letter-spacing:0.08em">🎁 Canjear objeto</button>`:'');
  } else {
    const s=G.stats;
    const bar=v=>`<div style="height:10px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.08);margin:2px 0 5px"><div style="height:100%;width:${v}%;background:var(--gold)"></div></div>`;
    el.innerHTML=`<div class="stat-row"><span class="stat-name">✦ Fe</span><span class="stat-val">${s.fe||0}/100</span></div>${bar(s.fe||0)}<div class="stat-row"><span class="stat-name">📖 Sabiduría</span><span class="stat-val">${s.sab||0}/100</span></div>${bar(s.sab||0)}<div class="stat-row"><span class="stat-name">⏳ Paciencia</span><span class="stat-val">${s.pac||0}/100</span></div>${bar(s.pac||0)}<div class="stat-row"><span class="stat-name">🕊 Humildad</span><span class="stat-val">${s.hum||0}/100</span></div>${bar(s.hum||0)}<div class="stat-row" style="margin-top:6px"><span class="stat-name">XP</span><span class="stat-val">${s.xp||0}</span></div><div class="stat-row"><span class="stat-name">NIV.</span><span class="stat-val">${s.level||1}</span></div>`;
  }
}

function markQuestDone(sceneId){
  const qid=QUEST_MARKERS[sceneId];if(!qid)return;
  const q=G.quests.find(q=>q.id===qid);if(q&&!q.done){q.done=true;renderRightPanel();}
}

// ═══════════════════════════════
//  STORY BOX HELPERS
// ═══════════════════════════════
function addMsg(type,text){
  const box=document.getElementById('story-box');
  const div=document.createElement('div');div.className='story-msg';
  if(type==='narration')div.innerHTML=`<div class="story-narration">${text}</div>`;
  else if(type==='system')div.innerHTML=`<div class="story-system">${text}</div>`;
  else if(type==='event')div.innerHTML=`<div class="story-event">${text}</div>`;
  box.appendChild(div);scrollStory();
}
function scrollStory(){const b=document.getElementById('story-box');setTimeout(()=>b.scrollTop=b.scrollHeight,40);}

// ═══════════════════════════════
//  SCENE IMAGE
// ═══════════════════════════════
function getImgStore(){
  return {
    adan_card:'images/adan_card.jpg',
    noe_card:'images/noe_card.jpg',
    timeline:'images/timeline.jpg',
    mapa1:'images/mapa1.jpg',
    mapa2:'images/mapa2.jpg',
  };
}

function updateSceneImage(sceneId){
  const wrap=document.getElementById('scene-image-wrap');
  const img=document.getElementById('scene-img');
  const cap=document.getElementById('scene-img-caption');
  if(!wrap||!img)return;
  const path=SCENE_IMAGES[sceneId];
  if(path){
    img.style.opacity='0';
    img.src=path;
    img.onload=()=>{img.style.opacity='0.92';};
    if(cap)cap.textContent=SCENE_CAPTIONS[sceneId]||'Historia Bíblica Ilustrada';
    wrap.classList.remove('hidden');
  } else {
    wrap.classList.add('hidden');
  }
}

// ═══════════════════════════════
//  TOAST
// ═══════════════════════════════
function showToast(msg){
  const t=document.getElementById('xp-toast');
  t.textContent=msg;t.className='xp-toast show';
  setTimeout(()=>t.className='xp-toast',2300);
}

// ═══════════════════════════════
//  TRIVIA
// ═══════════════════════════════
function getTriviaForStory(id){return TRIVIA_BANK[id]||[];}

function queueTriviaForScene(sceneId){
  if(!G.char)return;
  const ids=SCENE_TRIVIA[sceneId]||[];
  ids.forEach(id=>{if(!T.answered.has(id)&&!T.queue.includes(id))T.queue.push(id);});
  updateTriviaHudBtn();
}

function updateTriviaHudBtn(){
  const btn=document.getElementById('trivia-hud-btn');if(!btn)return;
  const n=T.queue.length;
  btn.innerHTML=n>0?`📖 Trivia <span class="trivia-count">${n}</span>`:'📖 Trivia';
  btn.style.borderColor=n>0?'var(--gold)':'var(--gold-dark)';
}

function openTrivia(fromBtn=false){
  if(!G.char)return;
  if(fromBtn){const all=getTriviaForStory(G.char.id).filter(q=>!T.answered.has(q.id));if(!all.length){addMsg('system','✦ Ya respondiste todas las preguntas de esta historia. ✦');return;}showTriviaQuestion(all[Math.floor(Math.random()*all.length)]);return;}
  if(!T.queue.length)return;
  const id=T.queue.shift();
  const q=getTriviaForStory(G.char.id).find(q=>q.id===id);
  if(q)showTriviaQuestion(q);
  updateTriviaHudBtn();
}

function showTriviaQuestion(q){
  T.current=q;
  document.getElementById('trivia-question').textContent=q.q;
  document.getElementById('trivia-ref').textContent='📖 '+q.ref;
  document.getElementById('trivia-xp-badge').textContent='+'+q.xp+' XP';
  document.getElementById('trivia-result').classList.remove('show');
  document.getElementById('trivia-result-text').textContent='';
  document.getElementById('trivia-item-reward').style.display='none';
  document.getElementById('trivia-next-btn').style.display='none';
  document.getElementById('trivia-skip-btn').style.display='block';
  const opts=document.getElementById('trivia-options');
  const L=['A','B','C','D'];
  opts.innerHTML=q.opts.map((o,i)=>`<button class="trivia-opt" onclick="answerTrivia(${i})"><span class="trivia-opt-letter">${L[i]}.</span><span>${o}</span></button>`).join('');
  document.getElementById('trivia-modal').classList.add('show');
}

function answerTrivia(idx){
  const q=T.current;if(!q)return;
  T.answered.add(q.id);
  const opts=document.querySelectorAll('.trivia-opt');
  opts.forEach(b=>{b.onclick=null;b.style.cursor='default';});
  const correct=idx===q.correct;
  opts[idx].classList.add(correct?'correct':'wrong');
  if(!correct)opts[q.correct].classList.add('reveal');
  document.getElementById('trivia-result-text').textContent=q.explanation;
  document.getElementById('trivia-result').classList.add('show');
  if(correct){
    applyXP(q.xp);G.stats.sab=Math.min(100,(G.stats.sab||0)+3);updateHUD();
    if(q.item){const ah=G.inventory.some(i=>i.name===q.item.name);if(!ah){G.inventory.push(q.item);renderRightPanel();const r=document.getElementById('trivia-item-reward');r.style.display='flex';r.innerHTML=`${q.item.icon} <span>Obtuviste: <strong>${q.item.name}</strong></span>`;}}
    showToast('✓ Correcto! +'+q.xp+' XP');
  } else {
    ['fe','sab','pac','hum'].forEach(k=>G.stats[k]=Math.max(0,(G.stats[k]||0)-10));
    updateHUD();checkStatWarnings();showToast('✗ Incorrecto · -10 en todas las cualidades');
  }
  document.getElementById('trivia-skip-btn').style.display='none';
  document.getElementById('trivia-next-btn').style.display='block';
  updateTriviaHudBtn();
}

function skipTrivia(){if(T.current)T.queue.push(T.current.id);closeTrivia();}
function closeTrivia(){
  document.getElementById('trivia-modal').classList.remove('show');T.current=null;updateTriviaHudBtn();
  if(T.queue.length>0)setTimeout(()=>{if(T.queue.length>0&&!document.getElementById('trivia-modal').classList.contains('show'))openTrivia();},3000);
}

// ═══════════════════════════════
//  TRADE (CANJE)
// ═══════════════════════════════
let tradeSelectedItem=null;

function openTrade(){
  if(!G.inventory||!G.inventory.length){addMsg('system','✦ Tu inventario está vacío. ✦');return;}
  tradeSelectedItem=null;
  document.getElementById('trade-stat-selector').classList.remove('show');
  renderTradeItems();updateTradeStatBtns();
  document.getElementById('trade-modal').classList.add('show');
}
function closeTrade(){document.getElementById('trade-modal').classList.remove('show');tradeSelectedItem=null;document.getElementById('trade-stat-selector').classList.remove('show');}

function renderTradeItems(){
  const list=document.getElementById('trade-items-list');
  list.innerHTML=G.inventory.map((item,idx)=>{
    const t=!NON_TRADEABLE.includes(item.name);
    const sel=tradeSelectedItem===idx?' selected':'';
    const badge=t?'<span class="trade-item-badge good">+pts</span>':'<span class="trade-item-badge bad">No canjeable</span>';
    return `<div class="trade-item-row${t?'':' not-tradeable'}${sel}" onclick="${t?`selectTradeItem(${idx})`:'void 0'}"><span class="trade-icon">${item.icon}</span><div class="trade-item-info"><div class="trade-item-name">${item.name}</div><div class="trade-item-desc">${item.desc||''}</div></div>${badge}</div>`;
  }).join('');
}

function selectTradeItem(idx){tradeSelectedItem=idx;renderTradeItems();updateTradeStatBtns();document.getElementById('trade-stat-selector').classList.add('show');}

function updateTradeStatBtns(){
  const item=tradeSelectedItem!==null?G.inventory[tradeSelectedItem]:null;
  const isShop=item&&item.shopBonuses;
  ['fe','sab','pac'].forEach(k=>{
    const btn=document.getElementById('trade-'+k);
    const cur=document.getElementById('tcur-'+k);
    if(!btn||!cur)return;
    const v=G.stats[k]||0;
    const gain=isShop?(item.shopBonuses[k]||0):15;
    const canBoost=!isShop||(item.shopBonuses[k]!==undefined);
    cur.textContent=canBoost&&gain?` (${v} +${gain})`:` (${v})`;
    btn.disabled=v>=100||tradeSelectedItem===null||!canBoost||!gain;
    btn.style.opacity=(!canBoost||!gain)?'0.3':'1';
  });
}

function confirmTrade(statKey){
  if(statKey==='hum')return;
  if(tradeSelectedItem===null)return;
  const item=G.inventory[tradeSelectedItem];
  if(!item||NON_TRADEABLE.includes(item.name))return;
  const names={fe:'Fe',sab:'Sabiduría',pac:'Paciencia'};
  const gain=item.shopBonuses?((item.shopBonuses[statKey])||0):15;
  if(!gain){showToast('Este objeto no da '+names[statKey]);return;}
  G.stats[statKey]=Math.min(100,(G.stats[statKey]||0)+gain);
  G.inventory.splice(tradeSelectedItem,1);
  updateHUD();renderRightPanel();
  addMsg('event',`🎁 "${item.name}" canjeado · +${gain} ${names[statKey]}`);
  showToast('+'+gain+' '+names[statKey]);closeTrade();
}

// ═══════════════════════════════
//  SHOP
// ═══════════════════════════════
function openShop(){renderShopItems();updateShopXPDisplay();document.getElementById('shop-modal').classList.add('show');}
function closeShop(){document.getElementById('shop-modal').classList.remove('show');}

function updateShopXPDisplay(){
  const xp=getGlobalXP();
  const el=document.getElementById('shop-xp-display');const fill=document.getElementById('shop-xp-fill');
  if(el)el.textContent=xp+' XP';if(fill)fill.style.width=Math.min(100,(xp/500)*100)+'%';
}

function renderShopItems(){
  const gxp=getGlobalXP(),purchased=getPurchased();
  const SC={fe:'#c9a84c',sab:'#4a9adc',pac:'#5adc5a'};
  const SN={fe:'✦ Fe',sab:'📖 Sab',pac:'⏳ Pac'};
  let html='';
  ['Fe','Sabiduría','Paciencia'].forEach(cat=>{
    html+=`<div class="shop-section-title">── ${cat} ──</div>`;
    SHOP_CATALOG.filter(i=>i.category===cat).forEach(item=>{
      const owned=purchased.includes(item.id),ca=gxp<item.cost&&!owned;
      const cls=owned?'owned':ca?'cant-afford':'';
      const bh=Object.entries(item.bonuses).map(([k,v])=>`<span class="bonus-tag" style="color:${SC[k]};border-color:${SC[k]}">${SN[k]||k} +${v}</span>`).join('');
      html+=`<div class="shop-item ${cls}" onclick="${owned||ca?'void 0':`buyShopItem('${item.id}')`}">${owned?'<span class="owned-badge">✓ Comprado</span>':''}<span class="shop-item-icon">${item.icon}</span><div class="shop-item-info"><div class="shop-item-name">${item.name}</div><div class="shop-item-desc">${item.desc}</div><div class="shop-item-bonus">${bh}</div></div><div class="shop-item-price">${owned?'<span style="color:#5adc5a">✓</span>':item.cost}<span class="price-label">${owned?'en inv':'XP'}</span></div></div>`;
    });
  });
  document.getElementById('shop-items-list').innerHTML=html;
}

function buyShopItem(id){
  const item=SHOP_CATALOG.find(i=>i.id===id);if(!item)return;
  if(!spendGlobalXP(item.cost)){showToast('XP insuficiente');return;}
  addPurchased(id);
  if(G.char){G.inventory.push({icon:item.icon,name:item.name,desc:item.desc,shopBonuses:item.bonuses});renderRightPanel();showToast(item.icon+' '+item.name+' añadido');}
  renderShopItems();updateShopXPDisplay();earnAchievement('shop_buy');
}

// ═══════════════════════════════
//  DAILY REWARD
// ═══════════════════════════════
function getDailyData(){return LS.getJSON('hv_daily',{});}
function saveDailyData(d){LS.setJSON('hv_daily',d);}

function checkDailyReward(){
  const now=Date.now(),d=getDailyData();
  const lastClaim=d.lastClaim||0,lastOpen=d.lastOpen||now;
  const hoursSinceClaim=(now-lastClaim)/3600000;
  const hoursAccum=(now-lastOpen)/3600000;
  saveDailyData({...d,lastOpen:now});
  if(hoursSinceClaim>=24||!d.lastClaim)showDailyModal('daily',hoursAccum);
  else if(hoursAccum>=1)showDailyModal('hourly',hoursAccum);
}

function showDailyModal(mode,hrs){
  const hoursXP=Math.min(24,hrs)*HOURLY_RATE;
  const pct=Math.min(100,(hrs/24)*100);
  const isDone=hrs>=24;
  document.getElementById('daily-progress-fill').style.width=pct+'%';
  document.getElementById('daily-hourly-xp').textContent='+'+hoursXP.toFixed(1)+' XP acumulados ('+Math.min(24,Math.floor(hrs))+'h)';
  const cb=document.getElementById('daily-claim-btn');
  const eb=document.getElementById('daily-early-btn');
  const w=document.getElementById('daily-early-warning');
  if(mode==='daily'){
    document.getElementById('daily-icon').textContent='🌅';
    document.getElementById('daily-title').textContent='¡Premio Diario!';
    document.getElementById('daily-subtitle').textContent='Volviste hoy. Tu fidelidad tiene recompensa.';
    document.getElementById('daily-xp-big').textContent='+'+DAILY_XP;
    cb.textContent='✦ Reclamar +'+DAILY_XP+' XP';cb.style.display='block';eb.style.display='none';w.textContent='';
  } else {
    document.getElementById('daily-icon').textContent='⏱';
    document.getElementById('daily-title').textContent=isDone?'¡Premio listo!':'XP por horas';
    document.getElementById('daily-subtitle').textContent=isDone?'Completaste las 24hs. ¡Reclamá el premio completo!':'Acumulaste '+hoursXP.toFixed(1)+' XP. Esperá el día completo para +'+DAILY_XP;
    document.getElementById('daily-xp-big').textContent='+'+hoursXP.toFixed(1);
    if(isDone){cb.textContent='✦ Reclamar +'+DAILY_XP+' XP';cb.style.display='block';eb.style.display='none';w.textContent='';}
    else{cb.style.display='none';eb.style.display='block';eb.textContent='⚠ Reclamar +'+hoursXP.toFixed(1)+' XP ahora (−'+EARLY_PENALTY+' XP de penalidad)';const net=hoursXP-EARLY_PENALTY;w.textContent=net<0?'⚠ Perderías '+Math.abs(net).toFixed(1)+' XP netos.':'Ganarías '+net.toFixed(1)+' XP netos.';}
  }
  document.getElementById('daily-modal').classList.add('show');
}

function claimDaily(){
  const now=Date.now(),d=getDailyData();
  const done=((now-(d.lastClaim||0))/3600000)>=24||!d.lastClaim;
  const xp=done?DAILY_XP:Math.min(24,(now-(d.lastOpen||now))/3600000)*HOURLY_RATE;
  addGlobalXP(Math.round(xp*10)/10);saveDailyData({lastClaim:now,lastOpen:now});
  closeDailyModal();showToast('🌅 +'+(Number.isInteger(xp)?xp:xp.toFixed(1))+' XP — Premio diario');
}

function claimEarly(){
  const now=Date.now(),d=getDailyData();
  const hrs=Math.max(0,(now-(d.lastOpen||now))/3600000);
  const xp=Math.min(24,hrs)*HOURLY_RATE;
  addGlobalXP(xp);
  const cur=getGlobalXP();LS.set('hv_global_xp',String(Math.max(0,cur-EARLY_PENALTY)));updateShopXPDisplay();
  saveDailyData({lastClaim:now,lastOpen:now});
  closeDailyModal();const net=xp-EARLY_PENALTY;
  showToast(net<0?'⚠ −'+EARLY_PENALTY+' XP por impaciencia':'⏱ +'+net.toFixed(1)+' XP netos');
}
function closeDailyModal(){document.getElementById('daily-modal').classList.remove('show');}

// ═══════════════════════════════
//  ACHIEVEMENTS
// ═══════════════════════════════
function earnAchievement(id){
  const list=getEarnedAchievements();
  if(!list.includes(id)){list.push(id);LS.setJSON('hv_achievements',list);
    const a=ACHIEVEMENTS.find(a=>a.id===id);if(a)showToast(a.icon+' Logro: '+a.name);}
}
function checkAchievements(){
  const xp=getGlobalXP(),comp=getCompleted(),pur=getPurchased();
  if(comp.length>0)earnAchievement('first_game');
  if(comp.includes('adan'))earnAchievement('adan_done');
  if(comp.includes('noe'))earnAchievement('noe_done');
  if(comp.includes('adan')&&comp.includes('noe'))earnAchievement('both_done');
  if(pur.length>0)earnAchievement('shop_buy');
  if(xp>=100)earnAchievement('xp_100');
  if(xp>=500)earnAchievement('xp_500');
}

// ═══════════════════════════════
//  TUTORIAL
// ═══════════════════════════════
let tutStep=0;
function showTutorial(){tutStep=0;renderTutStep();document.getElementById('tutorial-modal').classList.add('show');}
function renderTutStep(){
  const s=TUTORIAL_STEPS[tutStep];
  document.getElementById('tut-icon').textContent=s.icon;
  document.getElementById('tut-title').textContent=s.title;
  document.getElementById('tut-text').textContent=s.text;
  document.getElementById('tut-counter').textContent=(tutStep+1)+' / '+TUTORIAL_STEPS.length;
  document.getElementById('tut-prev').style.display=tutStep>0?'block':'none';
  document.getElementById('tut-next').textContent=tutStep<TUTORIAL_STEPS.length-1?'Siguiente →':'¡Empezar!';
  document.getElementById('tut-dots').innerHTML=TUTORIAL_STEPS.map((_,i)=>`<span style="width:8px;height:8px;border-radius:50%;background:${i===tutStep?'var(--gold)':'rgba(201,168,76,0.22)'};display:inline-block;margin:0 3px"></span>`).join('');
}
function tutNext(){if(tutStep<TUTORIAL_STEPS.length-1){tutStep++;renderTutStep();}else closeTutorial();}
function tutPrev(){if(tutStep>0){tutStep--;renderTutStep();}}
function closeTutorial(){document.getElementById('tutorial-modal').classList.remove('show');LS.set('hv_tutorial_done','1');}
function checkShowTutorial(){if(!LS.get('hv_tutorial_done'))showTutorial();}

// ═══════════════════════════════
//  INIT
// ═══════════════════════════════
let _gameReady = false;

function _onBtnClick(fn) {
  // If scripts not ready yet, wait and retry
  if (!_gameReady) { setTimeout(() => _onBtnClick(fn), 100); return; }
  fn();
}

window.addEventListener('load',()=>{
  const msgs=['Abriendo el Génesis...','Preparando el Edén...','Cargando historias...','¡Casi listo!'];
  let mi=0;const msgEl=document.getElementById('loading-msg');
  const iv=setInterval(()=>{mi=(mi+1)%msgs.length;if(msgEl)msgEl.textContent=msgs[mi];},500);
  setTimeout(()=>{
    clearInterval(iv);
    const ls=document.getElementById('screen-loading');
    if(ls){ls.classList.add('fade-out');setTimeout(()=>{ls.style.display='none';},650);}
    _gameReady=true;
    updateShopXPDisplay();
    // Show title only after loading is fully done
    setTimeout(()=>{
      const t=document.getElementById('screen-title');
      if(t)t.style.display='flex';
      setTimeout(checkDailyReward,600);
      setTimeout(checkShowTutorial,1200);
    },700);
  },2000);
});