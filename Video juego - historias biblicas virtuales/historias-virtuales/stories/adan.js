// ═══════════════════════════════
//  HISTORIA: ADÁN Y EVA
//  Génesis 2-3 · ~4026 a.e.c.
// ═══════════════════════════════

CHARACTERS.push({
  id:'adan', name:'Adán y Eva', era:'Génesis 2-3 · ~4026 a.e.c.', icon:'🍎',
  desc:'Vivían en el paraíso perfecto. Jehová les dio todo... pero también una norma. Cuando la serpiente habla, ¿qué decides?',
  tags:['Obediencia','Tentación','Fe','Consecuencias'],
  stats:{fe:55,sab:15,pac:20,hum:40,xp:0,level:1},
  startZone:'eden', startScene:'adan_nombres_animales',
});

STORY_CONTEXT.adan = {
  dates:'~4026 a.e.c.', location:'Jardín del Edén · Mesopotamia',
  description:'La historia de la humanidad comienza aquí. Adán y Eva vivían en un paraíso perfecto junto a Jehová. Una sola norma. Una sola decisión. Y todo cambió.',
  timelinePos:2, markerLabel:'~4026 a.e.c.', requires:null,
};

COMPLETION_GIFTS.adan = {
  icon:'🌿', name:'Hoja del Edén',
  desc:'Una hoja del jardín perfecto. Recuerdo de un paraíso que fue.',
  shopBonuses:{fe:5,sab:3},
};

CHARACTER_DATA.adan = {
  imgKey:'adan_card', fullName:'Adán y Eva', era:'Génesis 2-3 · ~4026 a.e.c.',
  desc:'Los primeros seres humanos vivían en perfecta armonía con Jehová. Recibieron todo: belleza, propósito, inmortalidad. Pero también una sola norma.',
  verse:'"¿Dónde estás, Adán?" — Génesis 3:9',
  tags:['Obediencia','Tentación','Fe','Consecuencias'],
  stats:[
    {label:'✦ Fe',val:55,color:'#c9a84c'},{label:'📖 Sabiduría',val:15,color:'#4a9adc'},
    {label:'⏳ Paciencia',val:20,color:'#5adc5a'},{label:'🕊 Humildad',val:40,color:'#dc5adc'},
  ],
  curiosities:['Adán vivió 930 años (Génesis 5:5)','Fue el primero en poner nombre a los animales','Eva fue creada de una costilla de Adán'],
};

Object.assign(ZONES, {
  eden:{name:'Jardín del Edén',icon:'🌿',desc:'El paraíso de Dios',unlocked:true},
  arbol:{name:'Árbol del Conocimiento',icon:'🍎',desc:'En medio del jardín',unlocked:false},
  expulsion:{name:'Puerta del Edén',icon:'🔥',desc:'Guardada por querubines',unlocked:false},
});

Object.assign(SCENE_IMAGES, {
  adan_nombres_animales:'images/eden_0.jpg', adan_soledad:'images/eden_0.jpg',
  adan_eva_creada:'images/eden_0.jpg',       adan_vida_eden:'images/eden_0.jpg',
  adan_inicio:'images/eden_0.jpg',           adan_paseo:'images/eden_0.jpg',
  adan_curiosidad:'images/eden_0.jpg',
  adan_serpiente:'images/eden_1.jpg',        adan_serpiente2:'images/eden_1.jpg',
  adan_serpiente2_duda:'images/eden_1.jpg',  adan_tentacion:'images/eden_1.jpg',
  adan_ambos_comen:'images/eden_1.jpg',
  adan_rechaza:'images/eden_2.jpg',          adan_adan_rechaza:'images/eden_2.jpg',
  adan_obediente_juicio:'images/eden_2.jpg', adan_consecuencias_eva:'images/eden_2.jpg',
  'adan_promesa_adán':'images/eden_2.jpg',   adan_final_obediente:'images/eden_2.jpg',
  adan_juicio:'images/eden_2.jpg',           adan_expulsion:'images/eden_2.jpg',
  adan_confiesa:'images/eden_2.jpg',         adan_acusa:'images/eden_2.jpg',
  adan_vida_fuera:'images/eden_2.jpg',       adan_reflexion_final:'images/eden_2.jpg',
});

SCENE_CAPTIONS = Object.assign(SCENE_CAPTIONS||{}, {
  adan_nombres_animales:'Adán pone nombre a los animales · Génesis 2',
  adan_soledad:'Adán está solo · Génesis 2:18',
  adan_eva_creada:'La creación de Eva · Génesis 2:22',
  adan_vida_eden:'La vida en el Edén · Génesis 2',
  adan_serpiente:'La Serpiente · Génesis 3',
  adan_tentacion:'Eva prueba el fruto · Génesis 3',
  adan_expulsion:'La Expulsión del Edén · Génesis 3',
  adan_reflexion_final:'Las consecuencias · Génesis 5',
});

Object.assign(SCENES, {

  adan_nombres_animales:{
    zone:'eden',
    narration:'Jehová trajo ante Adán todos los animales terrestres y todas las aves para que les pusiera nombre. Era una tarea enorme — y una muestra de confianza increíble. Adán estudió a cada criatura antes de nombrarla.',
    speaker:'Jehová Dios',
    dialog:'"Adán, cuida de todo lo que he creado. Ponle nombre a cada animal. Tú eres responsable de esta creación."',
    choices:[
      {item:{icon:'🌾',name:'Don de Nombrar',desc:'Adán cumplió con sabiduría la tarea de nombrar a cada criatura.'},requires:'hum',text:'Tomarse el tiempo de estudiar bien a cada animal antes de nombrarlo. Hacerlo con cuidado y gratitud.',next:'adan_soledad',xp:20,hum:8,sab:5},
      {requires:'sab',text:'Nombrarlos rápidamente para terminar pronto. Hay tantos...',next:'adan_soledad',xp:10,sab:3},
    ]
  },

  adan_soledad:{
    zone:'eden',
    narration:'Al terminar de nombrar a los animales, Adán se dio cuenta de algo: todos tenían pareja. El elefante con la elefanta. El águila con la águila hembra. Pero él... estaba solo. Jehová vio eso.',
    speaker:'Jehová Dios',
    dialog:'"No es bueno que el hombre continúe solo. Voy a hacerle una ayudante, como complemento de él."',
    choices:[
      {requires:'fe',text:'Confiar en que Jehová sabe lo que necesitas, aunque todavía no lo veas.',next:'adan_eva_creada',xp:20,fe:10},
      {text:'Sentirte triste por estar solo. ¿Por qué Jehová no lo pensó antes?',next:'adan_eva_creada',xp:5,fe:-8},
    ]
  },

  adan_eva_creada:{
    zone:'eden',
    narration:'Jehová hizo que Adán cayera en un sueño profundo. Tomó una de sus costillas y de ella formó a Eva. Cuando Adán despertó y la vio, no pudo contener su asombro.',
    speaker:'Adán',
    dialog:'"¡Esto por fin es hueso de mis huesos y carne de mi carne! Esta será llamada Mujer, porque del hombre fue tomada."',
    event:true, eventText:'✦ Eva es creada · La primera familia comienza · Génesis 2:22',
    next:'adan_vida_eden', xp:25,
    item:{icon:'💑',name:'La Familia',desc:'La primera institución creada por Jehová'},
    choices:[{text:'Continuar...',next:'adan_vida_eden',xp:0}]
  },

  adan_vida_eden:{
    zone:'eden',
    narration:'Los días en el Edén eran perfectos. Adán y Eva cuidaban el jardín, conversaban con los animales, y disfrutaban de la presencia de Jehová. Pero un día, Eva se alejó sola hacia el centro del jardín...',
    speaker:'Narrador',
    dialog:'Jehová les había dado una sola norma. Una sola. Por mucho tiempo la respetaron. Pero Satanás esperaba su momento.',
    choices:[
      {requires:'hum',text:'Adán busca a Eva para recordarle juntos la norma de Jehová.',next:'adan_inicio',xp:20,hum:6,fe:5},
      {text:'Cada uno hace lo suyo. Eva se aleja sola hacia el árbol prohibido.',next:'adan_inicio',xp:5,hum:-5},
    ]
  },

  adan_inicio:{
    zone:'eden',
    narration:'Jehová usó polvo del suelo para crear al primer hombre, Adán, y lo puso junto a su esposa, Eva, en un hermoso jardín llamado Edén. Les dio árboles hermosos y alimentos muy ricos. Les permitió cuidar a los animales y les prometió que podrían vivir para siempre en el paraíso.',
    speaker:'Jehová Dios',
    dialog:'"De todo árbol del jardín puedes comer libremente. Pero del árbol del conocimiento del bien y del mal no comerás, porque el día que comas de él, ciertamente morirás."',
    choices:[
      {requires:'hum',text:'Aceptar la norma con gratitud: Jehová nos ha dado todo, confiaremos en Él.',next:'adan_paseo',xp:20,hum:8,fe:5},
      {requires:'sab',text:'Sentir curiosidad por ese árbol en particular. ¿Por qué ese y no los demás?',next:'adan_curiosidad',xp:10,sab:3},
    ]
  },

  adan_curiosidad:{
    zone:'eden',
    narration:'Eva se acerca al árbol prohibido, observando su fruto. Es hermoso, brillante. En ese momento, algo entre las ramas se mueve...',
    speaker:'Adán',
    dialog:'"Eva, recuerda lo que Dios nos dijo. Hay miles de árboles maravillosos en todo el jardín. No necesitamos ese."',
    choices:[
      {requires:'fe',text:'Alejarse del árbol y explorar el resto del jardín con Adán.',next:'adan_paseo',xp:25,fe:8,sab:4},
      {item:{icon:'🍃',name:'Hojas de Higuera',desc:'Te cubriste con hojas. La vergüenza del pecado busca esconderse.'},text:'Quedarse un poco más, solo mirando... no hay daño en mirar.',next:'adan_serpiente',xp:5,hum:-8},
    ]
  },

  adan_paseo:{
    zone:'eden',
    narration:'El jardín es un paraíso perfecto. Elefantes beben en el río, gacelas saltan entre la hierba, pájaros de colores llenan el aire de música. Adán y Eva caminan en paz, agradecidos. Pero un día, Eva está sola cerca del árbol prohibido...',
    speaker:'Narrador',
    dialog:'La tranquilidad del Edén se rompe con una voz inesperada, suave como el susurro del viento entre las hojas.',
    unlockZone:'arbol',
    choices:[{text:'Continuar...',next:'adan_serpiente',xp:0}]
  },

  adan_serpiente:{
    zone:'arbol',
    narration:'Satanás usó una serpiente para hablarle a Eva. La criatura se enreda entre las ramas del árbol prohibido y habla con voz suave y convincente.',
    speaker:'La Serpiente (Satanás)',
    dialog:'"¿Conque Dios les ha dicho que no coman de ningún árbol del jardín?" La serpiente sabe exactamente qué decir para despertar la duda.',
    choices:[
      {requires:'fe',text:'Eva responde con firmeza: "Solo de ese árbol no podemos comer, o moriremos."',next:'adan_serpiente2',xp:15,fe:5,pac:3},
      {text:'Eva responde con incertidumbre: "No sé bien... Dios dijo algo así..."',next:'adan_serpiente2_duda',xp:5,fe:-5},
    ]
  },

  adan_serpiente2:{
    zone:'arbol',
    narration:'La serpiente no se rinde. Sonríe con una mentira preparada.',
    speaker:'La Serpiente',
    dialog:'"¡Ustedes NO morirán! Dios sabe que el día que coman de ese árbol, sus ojos se abrirán y serán igual que Dios, conociendo el bien y el mal."',
    choices:[
      {item:{icon:'🛡',name:'Escudo de la Fe',desc:'Resististe la primera gran tentación de la historia'},requires:'fe',text:'Alejarse inmediatamente. Esto es una mentira. Jehová nunca nos engañaría.',next:'adan_rechaza',xp:50,fe:10,hum:5},
      {text:'Dudar. ¿Y si la serpiente tiene razón? La fruta se ve tan hermosa...',next:'adan_tentacion',xp:5,fe:-12},
    ]
  },

  adan_serpiente2_duda:{
    zone:'arbol',
    narration:'La serpiente ve tu vacilación y aprovecha cada centímetro de duda.',
    speaker:'La Serpiente',
    dialog:'"¿Lo ves? Ni siquiera recuerdas bien lo que dijo. Eso es porque Dios no quiere que sean libres. Si prueban la fruta, SERÁN IGUAL QUE DIOS."',
    choices:[
      {requires:'hum',text:'Recordar las palabras exactas de Dios y alejarse con determinación.',next:'adan_rechaza',xp:40,fe:10,hum:8},
      {text:'La fruta brilla, huele bien... Satanás quiere que pienses solo en ti misma.',next:'adan_tentacion',xp:0,fe:-15},
    ]
  },

  adan_rechaza:{
    zone:'eden',
    narration:'Te alejas del árbol. La serpiente observa en silencio mientras tú vuelves al jardín. Al reunirte con Adán, le cuentas lo que pasó.',
    speaker:'Eva',
    dialog:'"Adán, una serpiente intentó convencerme de comer la fruta prohibida. Me dijo que no moriríamos... pero sé que Jehová no miente."',
    event:true, eventText:'✦ La tentación fue vencida · La fe fue más fuerte que el engaño ✦',
    next:'adan_final_obediente', xp:40,
    choices:[{text:'Continuar...',next:'adan_final_obediente',xp:0}]
  },

  adan_final_obediente:{
    zone:'eden',
    narration:'El jardín sigue siendo tuyo. Los animales, el río cristalino, los árboles cargados de frutos. Jehová les permite seguir cuidando el paraíso.',
    speaker:'Narrador',
    dialog:'Si Adán y Eva hubieran obedecido, la humanidad nunca habría perdido el paraíso. Cada decisión pequeña puede tener consecuencias enormes. La obediencia a Dios nace de la confianza.',
    event:true, eventText:'🌿 ✦ FIN: El Paraíso Preservado · El camino que pudo haber sido ✦ 🌿',
    next:'adan_reflexion_final', xp:60,
    item:{icon:'🌿',name:'Árbol de la Vida',desc:'La promesa de la vida eterna preservada'},
    choices:[{text:'Ver reflexión final...',next:'adan_reflexion_final',xp:0}]
  },

  adan_tentacion:{
    zone:'arbol',
    narration:'Eva mira la fruta. Brilla bajo el sol. Satanás quería exactamente esto: que pensara solo en ella misma y no en lo que Jehová quiere. Eva tomó la fruta... y comió.',
    speaker:'Eva',
    dialog:'"Adán... probé la fruta. Y tú también deberías probarla."',
    choices:[
      {requires:'hum',text:'Adán rechaza: "¡No! Eva, ¿qué has hecho? Jehová nos lo prohibió."',next:'adan_adan_rechaza',xp:30,hum:10,fe:5},
      {item:{icon:'🍎',name:'El Fruto Prohibido',desc:'Comiste lo que Jehová prohibió. Una decisión que cambió la historia.'},text:'Adán acepta la fruta. No quiere que Eva enfrente sola las consecuencias.',next:'adan_ambos_comen',xp:5,hum:-15,fe:-10},
    ]
  },

  adan_adan_rechaza:{
    zone:'arbol',
    narration:'Adán mira a Eva con tristeza y firmeza. Ella tiene el fruto en la mano. Él sabe lo que ha hecho. Pero también sabe quién es Jehová.',
    speaker:'Adán',
    dialog:'"Eva, yo te amé. Pero no puedo seguirte en esto. Jehová fue claro: quien coma de ese árbol morirá. Tú elegiste desobedecerle. Yo no puedo hacer lo mismo."',
    choices:[
      {item:{icon:'💪',name:'Firmeza de Adán',desc:'Eligió obedecer a Jehová aunque le costó perder a su esposa.'},requires:'fe',text:'Alejarse de Eva y presentarse ante Jehová con honestidad.',next:'adan_obediente_juicio',xp:40,fe:8,hum:8}
    ]
  },

  adan_obediente_juicio:{
    zone:'eden',
    narration:'Adán se arrodilla en el jardín. Jehová se acerca. Adán le cuenta todo: la serpiente, Eva, la fruta. No esconde nada.',
    speaker:'Jehová Dios',
    dialog:'"Lo sé todo, Adán. Vi cada momento. Eva eligió escuchar a Satanás en lugar de obedecerme. Tú elegiste obedecerme aunque te costó perder a tu esposa. Eso habla de tu corazón."',
    choices:[
      {requires:'hum',text:'Escuchar el juicio de Jehová sobre Eva... y la promesa para Adán.',next:'adan_consecuencias_eva',xp:20,fe:5}
    ]
  },

  adan_consecuencias_eva:{
    zone:'expulsion',
    narration:'Jehová llama a Eva. Ella se acerca con vergüenza. Las palabras de Jehová son solemnes y dolorosas.',
    speaker:'Jehová Dios',
    dialog:'"Eva, fuiste engañada por la serpiente... pero tú elegiste creerle a ella en lugar de a mí. Saldrás de este jardín sola. Vagarás por la tierra, trabajarás con esfuerzo para sobrevivir, envejecerás. Y volverás al polvo del suelo del que fuiste tomada."',
    event:true, eventText:'🔥 Eva es expulsada del Jardín del Edén · Vagará sola por la tierra',
    next:'adan_promesa_adán', xp:20,
    unlockZone:'expulsion',
    choices:[{text:'Continuar...',next:'adan_promesa_adán',xp:0}]
  },

  'adan_promesa_adán':{
    zone:'eden',
    narration:'Eva desaparece más allá de los querubines. El jardín se siente diferente sin ella. Adán está solo. Pero Jehová permanece con él.',
    speaker:'Jehová Dios',
    dialog:'"Adán, tú me obedeciste aunque te dolió. No estás solo. El paraíso sigue siendo tuyo. Cuida la creación como siempre lo has hecho. A su tiempo, te daré una nueva compañera."',
    event:true, eventText:'🌿 ✦ Adán permanece en el Edén · La obediencia tuvo su recompensa ✦',
    next:'adan_reflexion_final', xp:60,
    item:{icon:'🌿',name:'El Paraíso Preservado',desc:'La obediencia de Adán le permitió quedarse con Jehová'},
    choices:[{text:'Ver reflexión final...',next:'adan_reflexion_final',xp:0}]
  },

  adan_ambos_comen:{
    zone:'expulsion',
    narration:'Sus ojos se abren. De repente sienten vergüenza de su desnudez y se cubren con hojas de higuera. Escuchan los pasos de Jehová en el jardín... y se esconden entre los árboles.',
    speaker:'Jehová Dios',
    dialog:'"¿Dónde estás, Adán?"',
    unlockZone:'arbol',
    choices:[
      {item:{icon:'🍃',name:'Hojas de Higuera',desc:'Te cubriste con hojas. La vergüenza del pecado busca esconderse.'},text:'Esconderse más. La vergüenza es demasiado grande.',next:'adan_acusa',xp:5,hum:-10},
      {requires:'hum',text:'Salir y enfrentar a Jehová.',next:'adan_juicio',xp:20,hum:8,fe:5},
    ]
  },

  adan_acusa:{
    zone:'expulsion',
    narration:'Adán sale pero busca culpar a otros. La vergüenza lo impulsa a señalar en lugar de confesar.',
    speaker:'Adán',
    dialog:'"La mujer que tú me diste, ella me dio del árbol y yo comí." Eva señala a la serpiente. Nadie asume la responsabilidad.',
    unlockZone:'expulsion',
    choices:[{text:'Escuchar el juicio de Jehová.',next:'adan_juicio',xp:0}]
  },

  adan_juicio:{
    zone:'expulsion',
    narration:'Jehová escucha todo. Le duele profundamente que Adán y Eva hayan sido egoístas y le desobedecieran. Primero habla a la serpiente, luego a Eva, luego a Adán.',
    speaker:'Jehová Dios',
    dialog:'"¿Qué han hecho?! Van a morir y volverán a ser polvo. Con dolor darás a luz, Eva. Con el sudor de tu frente comerás, Adán, hasta que vuelvas al suelo."',
    event:true, eventText:'🔥 Jehová echa a Adán y Eva del Jardín del Edén',
    choices:[{text:'Continuar...',next:'adan_expulsion',xp:0}]
  },

  adan_expulsion:{
    zone:'expulsion',
    narration:'Jehová echó a Adán y Eva del Jardín del Edén y puso querubines con una espada de fuego llameante para vigilar la entrada. Como Adán y Eva fueron egoístas, perdieron el paraíso, la vida eterna y su amistad con Dios.',
    speaker:'Narrador',
    dialog:'Una sola decisión. Una sola norma. Y el paraíso se perdió para toda la humanidad. Pero en medio del juicio, Jehová también prometió algo: un día, el daño causado por la desobediencia sería reparado.',
    event:true, eventText:'🍎 FIN · El Paraíso Perdido · Génesis 3 ✦',
    next:'adan_vida_fuera', xp:30,
    item:{icon:'🌅',name:'La Promesa de Restauración',desc:'Incluso en el juicio, Dios dejó una esperanza'},
    choices:[{text:'Ver reflexión final...',next:'adan_vida_fuera',xp:0}]
  },

  adan_vida_fuera:{
    zone:'expulsion',
    narration:'Fuera del jardín, la tierra era diferente. Dura. Producía espinos y cardos. Adán tenía que trabajar con el sudor de su frente para conseguir alimento. Eva, sola y expulsada, vagaba por tierras desconocidas.',
    speaker:'Narrador',
    dialog:'Con el tiempo, Adán tuvo hijos. Caín, luego Abel. Les contó todo lo que había pasado en el Edén. Las consecuencias del pecado se extendían a todos sus descendientes.',
    choices:[
      {requires:'hum',text:'Enseñar a tus hijos sobre Jehová con honestidad, incluyendo el error cometido.',next:'adan_reflexion_final',xp:30,hum:10,sab:5},
      {text:'Evitar hablar del tema. El pasado es doloroso.',next:'adan_reflexion_final',xp:10,sab:-5,fe:-4},
    ]
  },

  adan_reflexion_final:{
    zone:'expulsion',
    narration:'Adán vivió 930 años. Durante ese tiempo vio crecer a sus hijos y nietos. Vio el mundo cambiar. Nunca olvidó el Edén — ni la promesa de Jehová de que un día la situación mejoraría.',
    speaker:'Narrador',
    dialog:'Una decisión. Un momento de debilidad. Y el mundo entero cambió. Pero Jehová no abandonó a la humanidad. Prometió una "descendencia" que con el tiempo restauraría todo lo que se había perdido. (Génesis 3:15)',
    event:true, eventText:'✦ Adán vivió 930 años · La esperanza de la restauración permanece · Génesis 5:5',
    next:null, xp:40,
    item:{icon:'🌱',name:'La Promesa de Génesis 3:15',desc:'La primera profecía de restauración en toda la historia'},
  },

});

// Quest definitions for Adán
STORY_QUESTS.adan = [
  {id:'norma',      name:'El Comienzo',     desc:'Conoce el Edén y acepta la responsabilidad de cuidarlo.',         done:false},
  {id:'tentacion',  name:'La Tentación',    desc:'Enfrenta a la serpiente junto al árbol prohibido.',                done:false},
  {id:'consecuencias',name:'Las Consecuencias',desc:'Toda decisión tiene un resultado. ¿Cuál será el tuyo?',        done:false},
  {id:'vida_fuera', name:'La Vida Fuera',   desc:'Enfrenta la realidad de vivir fuera del paraíso.',                done:false},
];

// Quest markers
Object.assign(QUEST_MARKERS, {
  adan_nombres_animales:'norma', adan_eva_creada:'norma',
  adan_serpiente:'tentacion',    adan_rechaza:'tentacion',    adan_tentacion:'tentacion',
  adan_expulsion:'consecuencias',adan_juicio:'consecuencias', adan_obediente_juicio:'consecuencias',
  adan_vida_fuera:'vida_fuera',  adan_reflexion_final:'vida_fuera',
});

// Trivia bank
TRIVIA_BANK.adan = [
  {id:'a1',q:'¿De qué material creó Jehová a Adán?',ref:'Génesis 2:7',
   opts:['Barro del río','Polvo del suelo','Arcilla del mar','Piedra del jardín'],correct:1,
   explanation:'Jehová Dios formó al hombre del polvo del suelo y sopló en su nariz el aliento de vida.',
   item:{icon:'🌱',name:'Polvo del Suelo',desc:'El material con que Jehová creó al primer hombre.'},xp:30},
  {id:'a2',q:'¿Cuántos años vivió Adán según la Biblia?',ref:'Génesis 5:5',
   opts:['500 años','730 años','930 años','1000 años'],correct:2,
   explanation:'Adán vivió 930 años en total. Vivió lo suficiente para ver a muchos de sus descendientes.',
   item:{icon:'📅',name:'Los 930 Años de Adán',desc:'Adán vivió 930 años, viendo las consecuencias de su decisión.'},xp:25},
  {id:'a3',q:'¿Qué hizo Jehová para que Adán no pudiera volver al jardín del Edén?',ref:'Génesis 3:24',
   opts:['Construyó una muralla','Puso querubines y una espada de fuego','Inundó el jardín','Hizo desaparecer el jardín'],correct:1,
   explanation:'Jehová puso querubines y una espada llameante que giraba para guardar el camino al árbol de la vida.',
   item:{icon:'🔥',name:'La Espada Llameante',desc:'Los querubines guardaban el Edén con una espada de fuego.'},xp:30},
  {id:'a4',q:'¿Cómo se llamaba el árbol del que Adán y Eva NO podían comer?',ref:'Génesis 2:17',
   opts:['El árbol de la sabiduría','El árbol de la vida','El árbol del conocimiento del bien y del mal','El árbol del paraíso'],correct:2,
   explanation:'Era el árbol del conocimiento del bien y del mal. El árbol de la vida también estaba en el jardín, pero no era el prohibido.',
   item:{icon:'🍎',name:'El Árbol Prohibido',desc:'El árbol del conocimiento del bien y del mal — la única norma del Edén.'},xp:20},
  {id:'a5',q:'¿Quién fue el primer hijo de Adán y Eva mencionado en la Biblia?',ref:'Génesis 4:1',
   opts:['Abel','Set','Caín','Enoc'],correct:2,
   explanation:'Caín fue el primer hijo. Luego nació Abel. Después de la muerte de Abel, Eva tuvo a Set.',
   item:{icon:'👦',name:'Caín, el Primogénito',desc:'El primer hijo nacido fuera del Edén.'},xp:25},
  {id:'a6',q:'¿Qué prometió Jehová en Génesis 3:15?',ref:'Génesis 3:15',
   opts:['Un nuevo jardín','Una "descendencia" que aplastaría a la serpiente','El regreso al Edén','Un diluvio purificador'],correct:1,
   explanation:'Jehová prometió una "descendencia" que heriría en la cabeza a la serpiente. Esta es la primera profecía mesiánica de la Biblia.',
   item:{icon:'🌟',name:'Primera Profecía',desc:'Génesis 3:15 — la primera promesa de restauración en toda la historia.'},xp:40},
];

// Scene trivia triggers
Object.assign(SCENE_TRIVIA, {
  adan_eva_creada:['a1'],
  adan_serpiente:['a4'],
  adan_expulsion:['a3'],
  adan_reflexion_final:['a2','a6'],
  adan_final_obediente:['a5','a6'],
  adan_juicio:['a3','a5'],
});
