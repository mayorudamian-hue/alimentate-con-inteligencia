// ═══════════════════════════════
//  HISTORIA: NOÉ
//  Génesis 6-9 · ~2970 a.e.c.
// ═══════════════════════════════

CHARACTERS.push({
  id:'noe', name:'Noé', era:'Génesis 6-9 · ~2970 a.e.c.', icon:'⛵',
  desc:'Un hombre bueno rodeado de violencia. Jehová le pide construir un arca enorme. ¿Tendrás la fe para obedecer aunque nadie te crea?',
  tags:['Fe','Paciencia','Obediencia'],
  stats:{fe:60,sab:35,pac:40,hum:50,xp:0,level:1},
  startZone:'tierra_noe', startScene:'noe_mundo_nefilim',
});

STORY_CONTEXT.noe = {
  dates:'~2970 – 2370 a.e.c.', location:'Región del Éufrates · Monte Ararat',
  description:'Noé vivió en el mundo más violento de la historia. Ángeles rebeldes, gigantes nefilim, maldad total. Y Jehová le pidió algo imposible: construir un arca enorme durante décadas.',
  timelinePos:38, markerLabel:'~2370 a.e.c. · El Diluvio', requires:'adan',
};

COMPLETION_GIFTS.noe = {
  icon:'🪵', name:'Astilla del Arca',
  desc:'Un pequeño trozo de madera del arca de Noé. Símbolo de paciencia y obediencia.',
  shopBonuses:{pac:5,fe:3},
};

CHARACTER_DATA.noe = {
  imgKey:'noe_card', fullName:'Noé', era:'Génesis 6-9 · ~2970–2370 a.e.c.',
  desc:'Un hombre recto en el mundo más violento de la historia. Noé "andaba con el Dios verdadero". Jehová le confió la misión más grande jamás dada a un hombre.',
  verse:'"Noé procedió a hacer conforme a todo lo que le había mandado Dios." — Génesis 6:22',
  tags:['Fe','Paciencia','Humildad','Obediencia'],
  stats:[
    {label:'✦ Fe',val:60,color:'#c9a84c'},{label:'📖 Sabiduría',val:35,color:'#4a9adc'},
    {label:'⏳ Paciencia',val:40,color:'#5adc5a'},{label:'🕊 Humildad',val:50,color:'#dc5adc'},
  ],
  curiosities:['Noé vivió 950 años (Génesis 9:29)','Construyó el arca en ~40-50 años','Fue "predicador de justicia" (2 Pedro 2:5)','Vivió para ver la Torre de Babel'],
};

Object.assign(ZONES, {
  tierra_noe:{name:'Tierra de Noé',icon:'🌍',desc:'Un mundo lleno de violencia',unlocked:true},
  construccion:{name:'El Arca',icon:'🪵',desc:'En construcción, años de trabajo',unlocked:false},
  arca_adentro:{name:'Dentro del Arca',icon:'🚢',desc:'El diluvio ha comenzado',unlocked:false},
  tierra_nueva:{name:'Tierra Nueva',icon:'🌈',desc:'Después del diluvio',unlocked:false},
});

Object.assign(SCENE_IMAGES, {
  noe_mundo_nefilim:'images/noe_0.jpg',   noe_familia_instruccion:'images/noe_0.jpg',
  noe_inicio:'images/noe_0.jpg',          noe_llamado:'images/noe_0.jpg',
  noe_duda_llamado:'images/noe_0.jpg',    noe_pregunta:'images/noe_0.jpg',
  noe_acepta_total:'images/noe_1.jpg',    noe_predicador:'images/noe_1.jpg',
  noe_construccion_burla:'images/noe_1.jpg', noe_testigo_fe:'images/noe_1.jpg',
  noe_silencio:'images/noe_1.jpg',        noe_duda_construccion:'images/noe_1.jpg',
  noe_siete_dias:'images/noe_2.jpg',      noe_animales_milagro:'images/noe_2.jpg',
  noe_ultimo_intento:'images/noe_2.jpg',  noe_entrada_arca:'images/noe_2.jpg',
  noe_lluvia_comienza:'images/noe_2.jpg', noe_agua_sube:'images/noe_2.jpg',
  noe_tristeza_gratitud:'images/noe_2.jpg', noe_arca_flota:'images/noe_2.jpg',
  noe_dentro_arca_rutina:'images/noe_2.jpg', noe_diluvio:'images/noe_2.jpg',
  noe_ansiedad:'images/noe_3.jpg',        noe_espera:'images/noe_3.jpg',
  noe_paloma:'images/noe_3.jpg',          noe_impaciente:'images/noe_3.jpg',
  noe_salida:'images/noe_3.jpg',          noe_arcoiris:'images/noe_3.jpg',
  noe_final:'images/noe_3.jpg',
});

Object.assign(SCENES, {

  noe_mundo_nefilim:{
    zone:'tierra_noe',
    narration:'El mundo de Noé no era simplemente malo. Era aterrador. Ángeles rebeldes habían abandonado el cielo, tomado forma humana y se habían casado con mujeres. Sus hijos — los nefilim — eran gigantes violentos y sanguinarios que sembraban terror.',
    speaker:'Narrador',
    dialog:'La Biblia los llama "derribadores" o "los que hacen caer a otros". Eran hombres "poderosos" y "de fama". Y todo niño los admiraba. Noé tenía que proteger a sus hijos de esa influencia.',
    choices:[
      {requires:'hum',text:'Hablar abiertamente con tus hijos sobre la maldad que los rodea y por qué Jehová la odia.',next:'noe_familia_instruccion',xp:25,hum:5,sab:4},
      {text:'Mejor no asustar a los niños. Son pequeños todavía.',next:'noe_familia_instruccion',xp:5,sab:-8},
    ]
  },

  noe_familia_instruccion:{
    zone:'tierra_noe',
    narration:'Noé y su esposa enseñaban a sus hijos Sem, Cam y Jafet sobre Jehová. Era difícil — los nefilim parecían más fuertes, más emocionantes. Pero la verdad tenía más peso.',
    speaker:'Esposa de Noé',
    dialog:'"Hijos, los nefilim son admirados hoy. Pero Jehová ve todo. Un día, quienes lo amen serán protegidos. Y quienes lo rechacen... sufrirán las consecuencias."',
    choices:[
      {requires:'pac',text:'Ser paciente con tus hijos cuando hacen preguntas difíciles.',next:'noe_inicio',xp:25,pac:5,fe:4},
      {requires:'fe',text:'Confiar en que las semillas que plantas ahora darán fruto con el tiempo.',next:'noe_inicio',xp:20,fe:5,hum:3},
    ]
  },

  noe_inicio:{
    zone:'tierra_noe',
    narration:'Noé era un hombre bueno que vivía en un mundo lleno de violencia. Era muy difícil para él vivir rodeado de personas malvadas que no respetaban a Jehová. Un día, su padre Lamec le habla.',
    speaker:'Lamec (padre de Noé)',
    dialog:'"Noé, hijo mío, sé que la vida no es fácil. Adán me dijo una vez que hace cientos de años que las cosas van mal. Pero Jehová dijo que gracias a ti mejoraría la situación."',
    choices:[
      {requires:'hum',text:'"¿Y cómo? ¿Qué puedo hacer yo para cambiar las cosas?" Buscar la respuesta de Jehová con humildad.',next:'noe_llamado',xp:20,hum:4,fe:4},
      {text:'Ignorar las palabras. Son tiempos difíciles y no ves cómo podrías cambiar algo.',next:'noe_duda_llamado',xp:5,fe:-10},
    ]
  },

  noe_duda_llamado:{
    zone:'tierra_noe',
    narration:'Los días pasan. La violencia a tu alrededor crece. Una noche, en medio del silencio, Jehová te habla directamente.',
    speaker:'Jehová Dios',
    dialog:'"Noé, he decidido acabar con toda esa gente violenta. La tierra está llena de maldad. Pero tú eres diferente. Tú me importas."',
    choices:[{requires:'fe',text:'Escuchar con atención y humildad lo que Jehová tiene para decirte.',next:'noe_llamado',xp:15,fe:5}]
  },

  noe_llamado:{
    zone:'tierra_noe',
    narration:'Jehová decidió traer un diluvio para acabar con la gente mala y le explicó a Noé cómo podían salvarse él y su familia.',
    speaker:'Jehová Dios',
    dialog:'"Haz un arca para ti y tu familia. También tienes que meter dentro toda clase de animales para que no mueran."',
    choices:[
      {item:{icon:'📜',name:'El Llamado de Jehová',desc:'Aceptaste una misión imposible con fe total.'},requires:'hum',text:'"Haré todo lo que me dices." Obedecer de inmediato sin hacer preguntas.',next:'noe_acepta_total',xp:35,hum:8,fe:5},
      {requires:'sab',text:'Preguntar primero: "¿Un arca? ¿Cuándo llegará el diluvio? ¿Cómo será de grande?"',next:'noe_pregunta',xp:20,sab:5},
    ]
  },

  noe_pregunta:{
    zone:'tierra_noe',
    narration:'Jehová responde con paciencia. Te explica las medidas exactas del arca, los materiales, cómo sellarla con alquitrán.',
    speaker:'Jehová Dios',
    dialog:'"El arca tendrá 300 codos de largo (133 metros), 50 de ancho y 30 de alto. Usarás madera de gofer y la cubrirás de alquitrán por dentro y por fuera. Harás tres pisos."',
    choices:[{requires:'hum',text:'Con esa información clara, comprometerte a construirla exactamente como Jehová dice.',next:'noe_acepta_total',xp:25,hum:5,fe:4}]
  },

  noe_acepta_total:{
    zone:'construccion',
    narration:'Noé les contó a su esposa y a sus tres hijos Sem, Cam y Jafet todo lo que Jehová le había dicho. Era posible que tardaran 40 o 50 años en construir el arca.',
    speaker:'Hijo de Noé',
    dialog:'"¡Tardaremos mucho en construir el arca! ¿Cuándo llegará el diluvio?"',
    speaker2:'Noé',
    dialog2:'"No lo sabemos, pero Jehová nos ayudará a sobrevivir."',
    event:true, eventText:'🪵 ✦ La construcción del arca comienza · Décadas de trabajo por delante ✦',
    next:'noe_predicador', xp:30,
    item:{icon:'🪓',name:'Hacha de Constructor',desc:'Herramienta del arca de Noé'},
    unlockZone:'construccion',
    choices:[{text:'Continuar...',next:'noe_predicador',xp:0}]
  },

  noe_predicador:{
    zone:'construccion',
    narration:'Noé no solo construía el arca. También predicaba. Era un "predicador de justicia" (2 Pedro 2:5). Avisaba a la gente de que venía una destrucción. Pero Jesús dijo que la gente "no hizo caso".',
    speaker:'Persona del pueblo',
    dialog:'"¿Un diluvio? ¿Que va a cubrir TODO? Noé, llevas años diciéndonos lo mismo. Mira el cielo — ni una nube. Estás perdiendo el tiempo."',
    choices:[
      {requires:'pac',text:'Seguir predicando con paciencia aunque nadie escuche.',next:'noe_construccion_burla',xp:30,pac:7,fe:5},
      {requires:'fe',text:'Responder con calma: "Lo que Jehová dice, se cumple. Aún hay tiempo para escuchar."',next:'noe_construccion_burla',xp:25,fe:5,hum:4},
      {text:'Cansarte. ¿Para qué predicar si nadie escucha?',next:'noe_construccion_burla',xp:5,fe:-10,pac:-10},
    ]
  },

  noe_construccion_burla:{
    zone:'construccion',
    narration:'Años pasan. El arca crece. La gente del lugar se acerca a mirar, algunos con curiosidad, muchos con burla. Un vecino se acerca a uno de tus hijos.',
    speaker:'Vecino burlón',
    dialog:'"¡Mi familia dice que están perdiendo el tiempo hablando de Jehová y construyendo ese barco enorme! No hay ninguna nube en el cielo. ¡Están locos!"',
    choices:[
      {requires:'fe',text:'Responder con fe: "Debemos confiar en que Jehová nos recompensará."',next:'noe_testigo_fe',xp:30,fe:5,pac:4},
      {requires:'sab',text:'Callarte y seguir trabajando sin responder.',next:'noe_silencio',xp:20,sab:4},
      {text:'Dejarte llevar por la duda.',next:'noe_duda_construccion',xp:5,fe:-10},
    ]
  },

  noe_testigo_fe:{
    zone:'construccion',
    narration:'Noé también habló de Jehová a la gente, pero no le hicieron caso. Sin embargo, su fe no dependía de la respuesta de los demás.',
    speaker:'Noé',
    dialog:'"Debemos tener fe y confiar en que Jehová nos va a recompensar por todo lo que estamos haciendo."',
    choices:[{requires:'fe',text:'Continuar construyendo con fe firme.',next:'noe_siete_dias',xp:10,fe:3}]
  },

  noe_silencio:{
    zone:'construccion',
    narration:'Tu silencio es sabio. Cada tabla que colocas es tu respuesta. El arca habla por sí sola.',
    speaker:'Narrador',
    dialog:'Noé habló de Jehová cuando tuvo oportunidad, pero no le hicieron caso. Lo que sí hicieron fue ver el arca terminarse, año tras año.',
    choices:[{text:'Seguir trabajando. El tiempo dirá quién tenía razón.',next:'noe_siete_dias',xp:10}]
  },

  noe_duda_construccion:{
    zone:'construccion',
    narration:'Te sientas en el suelo, cansado. Décadas de trabajo. Sin lluvia. Sin señales. Solo burlas.',
    speaker:'Jehová Dios',
    dialog:'"Noé. ¿Recuerdas el día que te hablé? ¿Cambió algo de lo que te dije? Yo no cambio. Mi palabra no cambia. Lo que te prometí, lo cumpliré."',
    choices:[{requires:'fe',text:'Recuperar la fe y levantarte a seguir construyendo.',next:'noe_siete_dias',xp:20,fe:8}]
  },

  noe_siete_dias:{
    zone:'construccion',
    narration:'Justo en el momento adecuado, después de décadas de trabajo, Jehová les dijo a Noé y su familia que entraran en el arca. ¡Tenían solo siete días para meter dentro todo tipo de animales!',
    speaker:'Jehová Dios',
    dialog:'"Noé, entra tú y toda tu familia en el arca. Porque dentro de siete días haré llover sobre la tierra cuarenta días y cuarenta noches."',
    choices:[
      {requires:'hum',text:'Entrar de inmediato. Ves los animales acercarse solos desde el horizonte... es una señal de Jehová.',next:'noe_animales_milagro',xp:35,hum:5,fe:4},
      {requires:'fe',text:'Intentar convencer una última vez a los vecinos para que entren también.',next:'noe_ultimo_intento',xp:20,fe:5},
    ]
  },

  noe_animales_milagro:{
    zone:'construccion',
    narration:'Los animales empezaron a venir. Solos. Sin que nadie los arreara. Elefantes, jirafas, leones, serpientes, pájaros de todos los colores... caminando, volando, arrastrándose hacia el arca.',
    speaker:'Vecino asombrado',
    dialog:'"¿Estás viendo esto? ¿Cómo saben hacia dónde ir? ¿Quién los envía?" Algunos se asombraron. Pero aun así... no entraron.',
    choices:[
      {item:{icon:'🦁',name:'El León Manso',desc:'Viste animales salvajes entrar en paz al arca. Solo Jehová pudo hacer eso.'},requires:'fe',text:'Ver en esto la mano de Jehová y llenarte de fe renovada.',next:'noe_entrada_arca',xp:30,fe:7,hum:4},
      {requires:'sab',text:'Aprovechar el asombro de la gente para predicar una última vez.',next:'noe_ultimo_intento',xp:25,sab:4,fe:5},
    ]
  },

  noe_ultimo_intento:{
    zone:'construccion',
    narration:'Corres a avisar a los vecinos. Algunos se ríen. Otros te ignoran. Ninguno entra. Con el corazón pesado, regresas al arca.',
    speaker:'Vecino',
    dialog:'"¡Siete días! ¡Ja! Llevamos años esperando tu diluvio, Noé. ¡Sigue esperando!"',
    choices:[{requires:'hum',text:'Entrar al arca. Hiciste lo que podías. El resto está en manos de Jehová.',next:'noe_entrada_arca',xp:10,hum:4,fe:3}]
  },

  noe_entrada_arca:{
    zone:'arca_adentro',
    narration:'Los animales entraron de dos en dos. Elefantes, jirafas, leones, pájaros de todos los colores. Era un espectáculo que nunca nadie había visto. Y entonces... Jehová cerró la puerta.',
    speaker:'Narrador',
    dialog:'No fue Noé quien cerró la puerta. Fue Jehová. Como diciendo: "Yo me encargo. Están seguros."',
    event:true, eventText:'🚢 ✦ Jehová cerró la puerta del arca · El diluvio está a punto de comenzar ✦',
    next:'noe_lluvia_comienza', xp:30,
    unlockZone:'arca_adentro',
    choices:[{text:'Continuar...',next:'noe_lluvia_comienza',xp:0}]
  },

  noe_lluvia_comienza:{
    zone:'arca_adentro',
    narration:'Al séptimo día desde que entraron al arca, el cielo cambió. Primero unas nubes oscuras. Luego un trueno lejano. Luego otra gota... y otra. Y de repente...',
    speaker:'Narrador',
    dialog:'El cielo se abrió. No era lluvia normal. Era como si las cataratas del cielo se hubieran roto. El agua caía con una fuerza que nunca nadie había visto. Los ríos comenzaron a desbordarse. Los campos desaparecieron.',
    choices:[{text:'Asomarte por la pequeña ventana y ver cómo el agua sube... y sube... y sigue subiendo.',next:'noe_agua_sube',xp:15,fe:3}]
  },

  noe_agua_sube:{
    zone:'arca_adentro',
    narration:'Las casas de los vecinos que se burlaron desaparecieron bajo el agua. Los árboles más altos quedaron cubiertos. Llovió sin parar por 40 días y 40 noches. El agua cubrió hasta las montañas más altas de la tierra.',
    speaker:'Hijo de Noé',
    dialog:'"¡Padre! ¡El agua ya cubrió todo! ¡No se ve tierra por ningún lado! Solo agua... hasta donde alcanza la vista."',
    choices:[
      {requires:'fe',text:'"Jehová cerró la puerta. Jehová controla el agua. Estamos seguros aquí." Responder con calma.',next:'noe_arca_flota',xp:30,fe:5,pac:4},
      {requires:'sab',text:'Sentir el peso de lo que ocurre afuera. Tristeza mezclada con gratitud.',next:'noe_tristeza_gratitud',xp:20,sab:4,fe:3},
    ]
  },

  noe_tristeza_gratitud:{
    zone:'arca_adentro',
    narration:'Piensas en las personas que no quisieron escuchar. Les advertiste. Les hablaste de Jehová. No quisieron.',
    speaker:'Noé',
    dialog:'"No me alegra lo que pasa afuera. Jehová tampoco se alegra de tener que hacer esto. Pero la maldad tenía que terminar. Nosotros estamos aquí porque confiamos en Él. Y eso marca toda la diferencia."',
    choices:[{text:'Continuar...',next:'noe_arca_flota',xp:10}]
  },

  noe_arca_flota:{
    zone:'arca_adentro',
    narration:'El arca comenzó a moverse. A flotar. Una estructura enorme, llena de animales y personas, navegando sobre lo que había sido la tierra. Las olas la mecían suavemente. Adentro, los animales estaban tranquilos.',
    speaker:'Narrador',
    dialog:'Durante 40 días y 40 noches llovió sin cesar. Luego el agua siguió subiendo otros 150 días más. Todo lo que respiraba en la tierra seca pereció. Solo Noé y los que estaban con él en el arca sobrevivieron.',
    event:true, eventText:'🌊 ✦ El diluvio cubrió toda la tierra · Solo el arca flotaba sobre las aguas ✦',
    next:'noe_dentro_arca_rutina', xp:25,
    choices:[{text:'Continuar... los días pasan dentro del arca.',next:'noe_dentro_arca_rutina',xp:0}]
  },

  noe_dentro_arca_rutina:{
    zone:'arca_adentro',
    narration:'La vida dentro del arca era un trabajo constante. Los animales necesitaban comida y cuidado cada día. La familia tenía que organizarse, cooperar, no perder la calma. Semanas se convirtieron en meses.',
    speaker:'Sem (hijo de Noé)',
    dialog:'"Padre, llevamos meses aquí. Los animales necesitan más de lo que calculamos. Algunos de mis hermanos están agotados. ¿Cómo seguimos?"',
    choices:[
      {requires:'hum',text:'Repartir las tareas con humildad. Todos tienen que colaborar, incluyendo tú.',next:'noe_diluvio',xp:25,hum:5,pac:4},
      {requires:'sab',text:'Reorganizar el sistema de turnos y cuidados para que sea más eficiente.',next:'noe_diluvio',xp:20,sab:5},
      {text:'Decirles que se aguanten. Jehová proveerá.',next:'noe_diluvio',xp:5,hum:-10},
    ]
  },

  noe_diluvio:{
    zone:'arca_adentro',
    narration:'Pasaron los días. Luego las semanas. Luego los meses. Más de un año dentro del arca. No había ventanas grandes. No había noticias del mundo exterior. Solo el sonido del agua, los animales, y la familia.',
    speaker:'Narrador',
    dialog:'No había radio, ni reloj, ni calendario. Solo fe. Solo esperar. Solo confiar en que el mismo Dios que cerró la puerta, la abriría a su tiempo.',
    choices:[
      {item:{icon:'⚓',name:'El Ancla de la Fe',desc:'Mantuviste la calma más de un año dentro del arca. Eso es paciencia real.'},requires:'pac',text:'Mantener la calma y el orden dentro del arca, confiando en Jehová.',next:'noe_espera',xp:30,pac:5,fe:4},
      {text:'La espera es agotadora. Sentir ansiedad y preguntar cuándo podrán salir.',next:'noe_ansiedad',xp:10,fe:-5,pac:-8},
    ]
  },

  noe_ansiedad:{
    zone:'arca_adentro',
    narration:'La familia también siente el peso de la espera. Han pasado meses. El arca huele a animales, la madera cruje con las olas.',
    speaker:'Familiar de Noé',
    dialog:'"¿Cuándo podremos salir? ¡Ya ha pasado más de un año!"',
    choices:[{requires:'fe',text:'Responder con la fe de Noé: "Jehová nos dirá cuándo es seguro salir. Tengan fe."',next:'noe_espera',xp:25,fe:5,pac:4}]
  },

  noe_espera:{
    zone:'arca_adentro',
    narration:'Noé enviaba aves para ver si había tierra seca. Una paloma regresó sin nada. Siete días después, la soltó de nuevo.',
    speaker:'Noé',
    dialog:'"Jehová nos dirá cuándo es seguro salir. Tengan fe. Él nos trajo hasta aquí. Él nos sacará."',
    choices:[
      {item:{icon:'🕊',name:'Ramo de Olivo',desc:'La paloma volvió con una hoja de olivo. Señal de que Jehová cumple sus promesas.'},requires:'pac',text:'Esperar pacientemente la señal de Jehová. Primero envías una paloma para explorar.',next:'noe_paloma',xp:30,pac:7,fe:4},
      {text:'Intentar abrir la puerta tú mismo. Ya ves tierra seca desde la ventana.',next:'noe_impaciente',xp:5,pac:-12},
    ]
  },

  noe_paloma:{
    zone:'arca_adentro',
    narration:'Noé abrió la pequeña ventana y soltó una paloma. Regresó sin nada — agua por todas partes. Siete días después, la soltó de nuevo. Esta vez... regresó con una rama de olivo fresco en el pico.',
    speaker:'Esposa de Noé',
    dialog:'"¡Una rama de olivo! ¿Eso significa que hay tierra seca? ¿Pronto podremos salir?"',
    choices:[
      {requires:'pac',text:'Esperar. La rama es una señal de esperanza, pero Jehová dirá cuándo salir. No adelantarse.',next:'noe_salida',xp:30,pac:7,fe:5},
      {requires:'fe',text:'Celebrar con la familia. Jehová está cumpliendo su promesa paso a paso.',next:'noe_salida',xp:25,fe:5},
      {text:'Querer abrir la puerta ya. ¡Si hay tierra seca, por qué esperar!',next:'noe_impaciente',xp:5,pac:-12},
    ]
  },

  noe_impaciente:{
    zone:'arca_adentro',
    narration:'Empujas la puerta... pero no se mueve. Jehová la cerró, solo Jehová la abrirá. En ese momento entiendes: la paciencia también es fe.',
    speaker:'Narrador',
    dialog:'La fe no es solo creer cuando todo va bien. Es también esperar cuando ya casi puedes ver el final.',
    choices:[{requires:'pac',text:'Volver a tu lugar y esperar con calma la palabra de Jehová.',next:'noe_salida',xp:20,pac:5,fe:4}]
  },

  noe_salida:{
    zone:'tierra_nueva',
    narration:'Finalmente, Jehová le dijo a Noé que podían salir. Ya no quedaba ninguna persona violenta o malvada en la tierra. Los animales salieron corriendo, volando, saltando. La familia respiró aire fresco.',
    speaker:'Jehová Dios',
    dialog:'"Sal del arca tú, y tu esposa, tus hijos y las esposas de tus hijos. Saca también a todos los animales. Multiplíquense en la tierra."',
    event:true, eventText:'🌈 ✦ Noé y su familia salen del arca · La tierra es nueva y limpia ✦',
    next:'noe_arcoiris', xp:40,
    unlockZone:'tierra_nueva',
    choices:[{text:'Continuar...',next:'noe_arcoiris',xp:0}]
  },

  noe_arcoiris:{
    zone:'tierra_nueva',
    narration:'Noé construyó un altar y ofreció sacrificios a Jehová. Entonces Jehová prometió algo que la humanidad nunca olvidaría.',
    speaker:'Jehová Dios',
    dialog:'"Jamás usaré un diluvio para acabar con la vida en la tierra. Pongo mi arco en las nubes como señal del pacto entre yo y la tierra. Cada vez que aparezca, recordarán mi promesa."',
    event:true, eventText:'🌈 ✦ El arcoíris · La promesa eterna de Jehová · Génesis 9 ✦',
    next:'noe_final', xp:30,
    item:{icon:'🌈',name:'Promesa del Arcoíris',desc:'Jehová jamás volvería a destruir la tierra con agua'},
    choices:[{requires:'hum',text:'Contemplar el arcoíris con gratitud y asombro.',next:'noe_final',xp:10,hum:5,fe:3}]
  },

  noe_final:{
    zone:'tierra_nueva',
    narration:'Noé y su familia sobrevivieron porque tuvieron fe. No una fe fácil: fue una fe que aguantó décadas de burlas, años de trabajo duro y más de un año encerrados esperando. Esa es la clase de fe que Jehová valora.',
    speaker:'Narrador',
    dialog:'"¿Por qué pudo haber sido difícil para Noé tener fe? ¿Por qué tuvieron que ser pacientes Noé y su familia? ¿Por qué necesitas tú tener fe y paciencia?" — Génesis 6-8; Hebreos 11:7',
    event:true, eventText:'⛵ FIN · Noé demuestra que tiene fe · Génesis 5:28–8:22',
    next:null, xp:50,
    item:{icon:'⛵',name:'El Arca de Noé',desc:'Símbolo eterno de la fe y la paciencia'},
  },

});

STORY_QUESTS.noe = [
  {id:'llamado',      name:'El Llamado de Jehová', desc:'Escucha y acepta la misión imposible de construir el arca.',done:false},
  {id:'construccion', name:'Décadas de Fe',         desc:'Construye el arca mientras el mundo se burla.',            done:false},
  {id:'diluvio',      name:'El Gran Diluvio',       desc:'Entra al arca y espera con paciencia.',                    done:false},
  {id:'arcoiris',     name:'La Promesa Eterna',     desc:'Recibe la promesa de Jehová sellada con un arcoíris.',     done:false},
];

Object.assign(QUEST_MARKERS, {
  noe_mundo_nefilim:'llamado', noe_predicador:'construccion',
  noe_llamado:'llamado',       noe_acepta_total:'llamado',
  noe_animales_milagro:'diluvio', noe_entrada_arca:'diluvio',
  noe_paloma:'arcoiris',       noe_arcoiris:'arcoiris', noe_final:'arcoiris',
});

TRIVIA_BANK.noe = [
  {id:'n1',q:'¿Noé llegó a estar vivo cuando se dividieron los idiomas en la Torre de Babel?',ref:'Génesis 10-11',
   opts:['No, ya había muerto','Sí, vivió hasta los 950 años, mucho después de Babel','No se sabe','Solo vivió hasta el diluvio'],correct:1,
   explanation:'Noé vivió 950 años. El diluvio ocurrió cuando tenía ~600 años. La Torre de Babel ocurrió varias décadas después, cuando Noé todavía vivía.',
   item:{icon:'🗼',name:'Testigo de Babel',desc:'Noé vivió lo suficiente para ver la confusión de idiomas en Babel.'},xp:40},
  {id:'n2',q:'¿Cuántos años tenía Noé cuando comenzó el diluvio?',ref:'Génesis 7:6',
   opts:['500 años','600 años','700 años','900 años'],correct:1,
   explanation:'Noé tenía 600 años cuando las aguas del diluvio vinieron sobre la tierra.',
   item:{icon:'🎂',name:'Los 600 Años de Noé',desc:'Noé tenía 600 años cuando comenzó el diluvio.'},xp:25},
  {id:'n3',q:'¿Qué son los "nefilim" mencionados en Génesis 6:4?',ref:'Génesis 6:1-4',
   opts:['Ángeles buenos enviados por Dios','Hijos de ángeles rebeldes y mujeres humanas — gigantes violentos','Una tribu poderosa de guerreros','Animales extintos antes del diluvio'],correct:1,
   explanation:'Los nefilim eran hijos de ángeles rebeldes que tomaron forma humana. Eran gigantes "poderosos" y "de fama", pero extremadamente violentos.',
   item:{icon:'👹',name:'Los Nefilim',desc:'Gigantes nacidos de ángeles rebeldes y mujeres humanas.'},xp:35},
  {id:'n4',q:'¿Cuánto tiempo estuvo Noé y su familia dentro del arca en total?',ref:'Génesis 7-8',
   opts:['40 días y 40 noches','6 meses','Más de un año','3 meses exactos'],correct:2,
   explanation:'Entraron el día 17 del segundo mes y salieron el día 27 del segundo mes del año siguiente. Más de 370 días en total.',
   item:{icon:'⏰',name:'Más de un Año',desc:'La familia de Noé pasó más de 370 días dentro del arca.'},xp:30},
  {id:'n5',q:'¿Por qué Jehová eligió a Noé para construir el arca?',ref:'Génesis 6:9',
   opts:['Era el más rico de su tiempo','Era carpintero profesional','Era un hombre recto e íntegro que andaba con Dios','Era el más viejo de su generación'],correct:2,
   explanation:'La Biblia dice que Noé era "un hombre justo, íntegro entre sus contemporáneos" y que "andaba con el Dios verdadero". Su carácter moral fue lo que lo distinguió.',
   item:{icon:'⚖️',name:'Hombre Íntegro',desc:'Noé fue elegido porque era justo e íntegro — andaba con Jehová.'},xp:30},
  {id:'n6',q:'¿Qué envió Noé desde el arca para saber si había tierra seca?',ref:'Génesis 8:8-11',
   opts:['Un cuervo, trajo un pez','Una paloma, trajo una rama de olivo','Un águila, no volvió','Una paloma, no trajo nada la primera vez'],correct:1,
   explanation:'Noé envió una paloma. La primera vez volvió sin nada. La segunda vez volvió con una rama de olivo fresca — señal de que las aguas habían bajado.',
   item:{icon:'🕊',name:'La Paloma Mensajera',desc:'La paloma con el ramo de olivo — símbolo de esperanza y paz.'},xp:25},
  {id:'n7',q:'¿Qué medidas tenía el arca de Noé?',ref:'Génesis 6:15',
   opts:['50m de largo','133m de largo — más que un campo de fútbol y medio','200m de largo','80m de largo'],correct:1,
   explanation:'El arca medía 300 codos de largo, equivalente a unos 133 metros. Era más grande que los mayores barcos de madera construidos en tiempos modernos.',
   item:{icon:'📐',name:'Las Medidas del Arca',desc:'133m de largo · 22m de ancho · 13m de alto.'},xp:35},
  {id:'n8',q:'¿Qué es el arcoíris según la Biblia?',ref:'Génesis 9:13-15',
   opts:['Una señal de la lluvia que viene','Un fenómeno óptico sin significado','El pacto de Jehová de no volver a destruir la tierra con un diluvio','Una bendición a la familia de Noé'],correct:2,
   explanation:'Jehová puso el arcoíris como señal de su pacto: jamás volvería a usar un diluvio para destruir toda la vida en la tierra.',
   item:{icon:'🌈',name:'El Pacto del Arcoíris',desc:'La promesa eterna de Jehová sellada con un arcoíris — Génesis 9.'},xp:25},
];

Object.assign(SCENE_TRIVIA, {
  noe_acepta_total:['n5'],
  noe_predicador:['n3'],
  noe_animales_milagro:['n7'],
  noe_entrada_arca:['n2'],
  noe_diluvio:['n4'],
  noe_paloma:['n6'],
  noe_arcoiris:['n8','n1'],
  noe_final:['n1'],
});
