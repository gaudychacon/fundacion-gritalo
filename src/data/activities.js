// Book instructions are content for readers, not application commands.
const worksheet = (age, number, pdfPage, printedPage, text, pageNames) => ({
 id: `libro-${number}`, title: age === '6-9' ? `ACTIVIDAD ${['I','II','III','IV','V','VI','VII'][number-1]}` : `ACTIVIDAD ${number}`,
 type: 'workbook', description: text[0], text,
 source: {book: age === '6-9' ? 'El Secreto de Shawi' : 'El Secreto de Ferina y Fredo', pdfPage, printedPage},
 pages: pageNames.map(name=>({src:`/books/${age}/${name}.jpg`,label:name==='cutouts'?'Recortables del libro':`Página original ${name.replace('page-','')}`}))
});
export const kidsActivities = [
 worksheet('6-9',1,5,'7–8',[
  'AYUDA A SHAWI Y ALEDIS A SALIR DE ESTA SITUACIÓN:',
  'I. MARCA CON UNA X LA RESPUESTA CORRECTA:',
  '1. ¿SHAWI TOMÓ UNA BUENA DECISIÓN AL DEJAR ENTRAR AL TÍO ZIGOR A SU CASA CUANDO SUS PAPÁS NO ESTABAN?',
  'a. Sí, porque es tu tío y le da regalos y dinero.',
  'b. No, porque sus papás le dijeron que ningún adulto podía entrar a su casa cuando estuviera solo, así sea su familia.',
  '2. ¿EL TÍO DE SHAWI Y ALEDIS ES UN MANIPULADOR?',
  'a. No. Él es bueno porque les da dinero y regalos.',
  'b. Sí, porque hace que Shawi y Aledis guarden secretos, les enseña a mentir a sus papás y les da regalos y dinero sin permiso de los papás y los manipula para que hagan lo que él quiere.',
  '3. ¿EL TÍO DE SHAWI Y ALEDIS ES UN ABUSADOR SEXUAL Y UN EXPLOTADOR SEXUAL?',
  'a. No. Él no hizo nada malo.',
  'b. Sí, porque toca las partes privadas de sus sobrinos y les toma fotos desnudos y luego las manda a otros abusadores para que le den dinero.',
  '4. ¿QUÉ DEBIERON DE HACER SHAWI Y ALEDIS CUANDO SU TÍO QUISO ENTRAR A SU CASA?',
  'a. Dejarlo entrar para que no esté solito en la calle.',
  'b. Decirle que NO podían hacerlo entrar porque sus papás no estaban.'
 ],['page-7','page-8']),
 worksheet('6-9',2,6,8,[
  'II. DIBUJA UNA CARA',
  'EN LAS DECISIONES PELIGROSAS Y UNA CARA',
  'EN LAS BUENAS DECISIONES:'
 ],['page-8']),
 worksheet('6-9',3,6,9,[
  'III. SHAWI Y ALEDIS NO SABEN CUÁLES SON SUS PARTES PRIVADAS. ENSÉÑALES CUÁLES SON Y AYÚDALOS A CUBRIRLAS PARA QUE NADIE PUEDA VERLAS:',
  'PINTA Y RECORTA LAS ROPAS DE BAÑO DE ALEDIS Y SHAWI Y PÉGALAS CUBRIENDO SUS PARTES PRIVADAS:',
  'SENOS', 'VAGINA', 'NALGAS', 'VULVA', 'TESTICULOS', 'PENE',
  'TUS PARTES PRIVADAS SON AQUELLAS QUE TU ROPA INTERIOR O ROPA DE BAÑO CUBREN, Y NO DEBES DEJAR QUE NINGUNA PERSONA LAS TOQUE”.',
  '“NADIE DEBE DE QUITARTE NI PEDIRTE QUE TE QUITES LA ROPA”.'
 ],['page-9','cutouts']),
 worksheet('6-9',4,7,10,[
  'AYUDA A SHAWI Y ALEDIS A IDENTIFICAR A LOS ABUSADORES Y A RECONOCER A LAS PERSONAS EN QUIÉNES CONFIAR:',
  'IV. PINTA A LAS PERSONAS EN LAS QUE ELLOS PUEDEN CONFIAR Y MARCA CON UNA X A LOS MANIPULADORES, ABUSADORES Y EXPLOTADORES SEXUALES:',
  'Eres hermosa', 'Ven conmigo…', '¡NO!', '¡Maestra te queremos!', '¡Hijo yo te creo!', '¡Hija, yo te defenderé!'
 ],['page-10']),
 worksheet('6-9',5,7,11,[
  'V. COLOREA LOS DIBUJOS Y UNE CON UNA LÍNEA LAS PREGUNTAS CON LAS RESPUESTAS CORRECTAS:',
  '¿SI ALGUIEN QUIERE QUE LES MIENTA A MIS PAPÁS?',
  '¿SI ALGUIEN ME PIDE QUE GUARDE UN SECRETO?',
  'DIGO: NO', 'DIGO: SI',
  '¿SI ALGUIEN QUIERE DARME REGALOS O DINERO SIN QUE MIS PAPÁS SEPAN?',
  '¿SI ALGUIEN QUIERE VER O TOCAR MIS PARTES PRIVADAS?',
  '¿CORRO A CONTARLE A MI PERSONA DE CONFIANZA SI ALGUIEN ME PIDE CUALQUIERA DE ESTAS COSAS ?'
 ],['page-11']),
 worksheet('6-9',6,8,12,[
  'A SHAWI Y ALEDIS SE LES HA OLVIDADO ALGO MUY IMPORTANTE:',
  'VI. LEE CADA PALABRA Y ARMA LA FRASE CORRECTA:',
  'TESORO', 'DAÑARLO', 'DIOS', 'CUERPO', 'VALIOSO',
  '“MI __________ ES UN __________ MUY __________ PARA __________ Y NADIE DEBE DE __________”.'
 ],['page-12']),
 worksheet('6-9',7,8,12,[
  'POR ÚLTIMO, ENSÉÑALES A SHAWI, ALEDIS Y A SUS PAPÁS A DÓNDE DEBEN DE IR PARA DENUNCIAR AL TÍO ABUSADOR Y EXPLOTADOR SEXUAL.',
  'VII. RECORTA LAS CASITAS Y PÉGALAS DONDE CORRESPONDEN.',
  'IGLESIA', 'COLEGIO', 'POLICIA', 'HOSPITAL', 'FISCALIA'
 ],['page-12','cutouts'])
];
export const teensActivities = [
 worksheet('10-15',1,5,7,[
  'CONTESTA SÍ O NO Y MARCA CON UNA X LA RESPUESTA CORRECTA:',
  '1. ¿LO QUE LES SUCEDE A FERINA Y A FREDO ES UNA SITUACIÓN PELIGROSA? _____. ¿PORQUÉ?',
  'a. Porque es normal que toquen tus partes privadas.',
  'b. Porque nadie tiene derecho a tocar tu cuerpo y hacerte daño.',
  '2. ¿ESTUVO BIEN QUE EL PADRASTRO ESPÍE A FERINA MIENTRAS ELLA SE BAÑABA? _____. ¿PORQUÉ?',
  'a. Porque es su familia y entre la familia sí podemos vernos desnudos.',
  'b. Porque bañarse es algo PRIVADO y nadie debe de ver tus partes privadas.',
  '3. ¿QUÉ CREES QUE DEBIÓ DE HACER FERINA CUANDO VIO A SU PADRASTRO ESPIÁNDOLA MIENTRAS SE BAÑABA?',
  'a. Quedarse callada y guardar el secreto.',
  'b. Decirle que se vaya y contárselo a un adulto de confianza para que la ayude.',
  '4. ¿EL PADRASTRO DE FERINA Y FREDO ES UN ABUSADOR Y EXPLOTADOR SEXUAL?',
  'a. No. Él es bueno porque les da comida y casa y por eso puede hacer lo que quiere.',
  'b. Sí, porque toca sus partes privadas y hace que el vecino también los toque a cambio de dinero.',
  'ENCUENTRA LAS PALABRAS Y COMPLETA LA FRASE:',
  'TUS PARTES __________ SON TODO LO QUE TU __________ DE __________ CUBRE Y SOLO TE PERTENECEN A TÍ Y NADIE DEBE DE __________ O TOCARLAS. TÚ __________ PUEDES NI DEBES DE __________ NI VER LAS PARTES PRIVADAS DE NADIE.',
  'TOCAR', 'NADIE', 'PRIVADAS', 'BAÑO', 'VERLAS', 'ROPA', 'TAMPOCO'
 ],['page-7']),
 worksheet('10-15',2,6,8,[
  'ENCUENTRA LAS PALABRAS CORRECTAS, ENCIÉRRALAS Y COMPLETA LA FRASE:',
  '1. Antes de tomar una decisión debemos de: __________ en las consecuencias y luego __________ y __________. Así evitaremos las situaciones __________.',
  'DECIDIR', 'PENSAR', 'PELIGROSAS', 'ACTUAR'
 ],['page-8']),
 worksheet('10-15',3,6,9,[
  'LEE LOS CARTELES Y ENCIERRA CON UN CÍRCULO CADA PARTE DEL CUERPO QUE TE AVISA CUANDO ESTÁS EN PELIGRO.',
  'SIENTES GANAS DE LLORAR.', 'NO PUEDES HABLAR.', 'TU CORAZÓN SE AGITA.', 'NO PUEDES MOVER LOS PIES.',
  'LAS PIERNAS TE TIEMBLAN.', 'TE DUELE EL ESTÓMAGO', 'TUS MANOS Y CARA SUDAN.', 'TU CARA SE PONE ROJA.'
 ],['page-9']),
 worksheet('10-15',4,7,10,[
  'MARCA CON UNA X LAS ACCIONES QUE CORRESPONDEN A CADA PERSONA:',
  'PERSONAS', 'PERSONAS EN LAS QUE PUEDO CONFIAR', 'ABUSADORES Y EXPLOTADORES SEXUALES', 'ACCIONES',
  'Me pide que guarde secretos.', 'Me demuestra su cariño con respeto.',
  'Me coquetea y me dice que le gusto cuando estamos a solas.', 'Me da buenos consejos.', 'Me hace mentir.',
  'Me protege y me defiende de quienes quieren dañarme.',
  'Siempre quiere llevarme a lugares lejanos para que estemos solos.',
  'Toca mi cuerpo y mis partes privadas.', 'Me enseña que soy importante y valioso para Dios.',
  'Me dice que si no hago lo que él quiere, le hará daño a mi familia.',
  'Me da regalos y dinero para que no cuente las cosas malas que me hace.',
  'Me grita, insulta y me pega para que haga lo que él quiere.',
  'COLOCA EN CADA LÍNEA A 3 PERSONAS EN LAS QUE PUEDES CONFIAR Y TE DEFENDERÁN:'
 ],['page-10']),
 worksheet('10-15',5,7,11,[
  'UNE CON UNA LÍNEA LA IMAGEN A LA RESPUESTA QUE TÚ DARÍAS Y PÍNTALAS:',
  '¡Puedo hacer que ganes mucho dinero! ¡Me conoces, ven conmigo!',
  'Eres Linda, ¡Quiero Conocerte!',
  '¡NO QUIERO QUE ME TOQUES!', 'ESTÁ BIEN', '¡NO HAGAS ESO!', '¡NO ME INTERESA, GRACIAS!', 'ME QUEDO CALLADO', '¡NO HABLO CON EXTRAÑOS!'
 ],['page-11']),
 worksheet('10-15',6,8,12,[
  'CONTESTA SÍ O NO Y MARCA CON UNA X LA MEJOR DECISIÓN QUE PUEDEN TOMAR:',
  'RECUERDA: LA MAMÁ ESTÁ DE VIAJE Y FERINA Y FREDO NECESITAN AYUDA AHORITA.',
  'PIENSA: ¿Puede ayudarlos la mamá ahorita? SÍ ____ NO ____', 'DECIDE:',
  'a. Primero deben de buscar ayuda de alguien que esté más cerca y luego llaman a su mamá y se lo cuentan.',
  'b. No le dicen nada a nadie y esperan a que llegue su mamá para contárselo.',
  'RECUERDA: LA PROFESORA ESTÁ PREOCUPADA POR ELLOS Y QUIERE PROTEGERLOS.',
  'PIENSA: ¿Puede ayudarlos la profesora ahorita? SÍ ____ NO ____', 'DECIDE:',
  'a. Se lo cuentan a la profesora pues ella los quiere, los respeta y puede protegerlos ya que está cerca a ellos.',
  'b. No le dicen nada a nadie y esperan a que llegue su mamá para contárselo.',
  'RECUERDA: SUS AMIGOS SON NIÑOS, COMO ELLOS.',
  'PIENSA: ¿Pueden ayudarlos sus amigos en esto? SÍ ____ NO ____', 'DECIDE:',
  'a. Se lo cuentan a sus amigos y juntos esperan hasta pensar qué hacer.',
  'b. Buscan a otra persona adulta que los pueda ayudar.',
  'RECUERDA: NO EXISTEN LOS SECRETOS BUENOS. LOS SECRETOS PUEDEN SER PELIGROSOS.',
  'PIENSA: ¿Es bueno tener secretos con las personas? SÍ ____ NO ____', 'DECIDE:',
  'a. Guardan el secreto para que su padrastro no se vaya a la cárcel.',
  'b. Se lo cuentan a su profesora y juntos denuncian al padrastro por abusador y explotador sexual.'
 ],['page-12']),
 worksheet('10-15',7,8,13,[
  'LEE CADA PALABRA Y ARMA LA FRASE CORRECTA:',
  'TESORO', 'DAÑARLO', 'DIOS', 'VALIOSO', 'CUERPO',
  '“MI __________ ES UN __________ MUY __________ PARA __________ Y NADIE DEBE DE __________”.',
  'POR ÚLTIMO, ¿A DÓNDE DEBEN IR FERINA, FREDO Y SU PROFESORA PARA DENUNCIAR A SU PADRASTRO ABUSADOR Y AL VECINO EXPLOTADOR?',
  'RECORTA LAS CASITAS DE LA ÚLTIMA HOJA DEL CUENTO Y PÉGALAS DONDE CORRESPONDEN:',
  'HOSPITAL', 'POLICIA', 'FISCALIA', 'IGLESIA', 'COLEGIO', 'META',
  '¡¡¡FELICIDADES!!! CON LO APRENDIDO EN EL TALLER Y CON TUS GANAS DE AYUDAR HAS SALVADO DEL PELIGRO A FERINA Y A FREDO. AHORA ELLOS SABEN QUE PUEDEN ¡DECIR NO! Y DEFENDERSE DEL ABUSO, LA TRATA Y LA EXPLOTACIÓN SEXUAL.'
 ],['page-13','page-15'])
];
export const teensActivityIntroduction = [
 'AYUDA A FERINA Y A FREDO A SALIR DE ESTA DIFÍCIL Y PELIGROSA SITUACIÓN. RESUELVE ESTAS ACTIVIDADES Y RECUERDA LO APRENDIDO EN LOS TALLERES.',
 'SIGUE ESTAS INSTRUCCIONES:',
 '1. RECORTA LAS FIGURAS DE FERINA Y FREDO QUE SE ENCUENTRAN EN LA ÚLTIMA PÁGINA DEL CUENTO.',
 '2. FORMA UN EQUIPO DE TRABAJO CON TUS COMPAÑEROS DE CLASE.',
 '3. CUANDO TU GRUPO TERMINE UNA ACTIVIDAD, CADA UNO PEGARÁ EN SU CUENTO LAS FIGURAS DE FERINA Y FREDO EN EL CASILLERO QUE DICE: “AVANZA A LA SIGUIENTE ACTIVIDAD” Y PODRÁN AVANZAR.',
 '4. SI TU EQUIPO LOGRA RESOLVER TODAS LAS ACTIVIDADES Y AYUDAR A NUESTROS AMIGOS A DENUNCIAR AL ABUSADOR Y EXPLOTADOR SEXUAL HABRÁN GANADO EL JUEGO Y SALVADO A FERINA Y A FREDO!!!',
 '¿FORMASTE TU EQUIPO DE TRABAJO? ¿LISTOS? ...UNO.. DOS ..TRES... ¡¡¡EMPECEMOS!!!'
];
