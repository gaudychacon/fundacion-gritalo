import { historias6a9 } from './historias6a9';
import { historias10a15 } from './historias10a15';
import { kidsActivities,teensActivities,teensActivityIntroduction } from './activities';
export const site = { name: 'Yo Digo NO', tagline: 'El Secreto de Shawi · El Secreto de Ferina y Fredo' };
const song = [
 'ESCUCHEN ATENTOS ESTOS CONSEJOS\nQUE DEL PELIGRO TE PUEDEN SALVAR\nSON VARIAS COSAS MUY IMPORTANTES\nQUE SIEMPRE DEBES DE RECORDAR:',
 'EN EL MUNDO HAY GENTE BUENA\nEN LA QUE PUEDES CONFIAR,\nSON AQUELLOS QUE TE PROTEGEN\nY SIEMPRE TE DEFENDERÁN',
 'PERO DEBES TENER CUIDADO\nOTROS TE PUEDEN DAÑAR,\nESTO DEBES RESPONDER\nSI EN PELIGRO TÚ ESTÁS:',
 'CORO:\n¡NO, NO, NO! NO, NO ,NO!\nA QUIEN QUIERA LASTIMARME YO DIGO NO, NO ,NO!\nSI ME PIDEN GUARDAR SECRETOS: YO DIGO NO, NO, NO!\nAL ABUSO Y LA INJUSTICIA YO DIGO NO, NO ,NO!\nSI ALGUIEN QUIERE TOCAR MI CUERPO: YO DIGO NO, NO ,NO!\n¡NO, NO, NO!\n¡GRITO FUERTE: NO, NO, NO!',
 'SI ALGUIEN QUIERE HACERNOS DAÑO,\nLEVANTEMOS NUESTRA VOZ,\nPIDE AYUDA, GRITA FUERTE,\nEL ABUSO HAY QUE DENUNCIAR',
 'CORO',
 'QUIEN TE AMA, NO TE DAÑA\nQUIEN TE AMA, TE RESPETA\nQUIEN TE AMA, TE PROTEGE\nQUIEN TE AMA, NO TE MIENTE\n(repetir 2 veces)',
 'SI ALGUIEN QUIERE HACERNOS DAÑO,\nLEVANTEMOS NUESTRA VOZ,\nPIDE AYUDA, GRITA FUERTE,\nEL ABUSO HAY QUE DENUNCIAR',
 'CORO'
];
const videos=(age)=>['Mi cuerpo','Secretos','Pedir ayuda'].map((tema,i)=>({id:i+1,titulo:['Mi cuerpo merece respeto','Sorpresas y secretos','No tengo que hacerlo a solas'][i],descripcion:'Contenido complementario del sitio. Video pendiente; no forma parte del libro.',tema,youtubeId:'',thumbnail:`/books/${age}/cover.jpg`}));
export const worlds={
 '6-9':{
  age:'6 a 9 años',label:'El mundo de Shawi',short:'Shawi',title:'El Secreto de Shawi',
  description:'A nuestro amigo Shawi le encanta levantarse temprano los días sábados; esos días, sus papás van a comprar al mercado y él debe levantarse a limpiar y arreglar su habitación.',
  stories:historias6a9,storyTitle:'El Secreto de Shawi',activities:kidsActivities,
  activityIntroduction:['AYUDA A SHAWI Y ALEDIS A SALIR DE ESTA SITUACIÓN:'],
  lessons:[
   ['Página 9','TUS PARTES PRIVADAS SON AQUELLAS QUE TU ROPA INTERIOR O ROPA DE BAÑO CUBREN, Y NO DEBES DEJAR QUE NINGUNA PERSONA LAS TOQUE”.'],
   ['Página 7','¡Tenemos que pedir ayuda! ¿Alguien nos podrá ayudar y decir qué podemos hacer?']
  ],
  song:{title:'CANCIÓN ¡YO DIGO NO!',text:song,image:'/books/6-9/song.jpg',source:'PDF 8, página final sin numeración'},
  videos:videos('6-9')
 },
 '10-15':{
  age:'10 a 15 años',label:'El mundo de Ferina y Fredo',short:'Ferina y Fredo',title:'El Secreto de Ferina y Fredo',
  description:'¡Hoy es el cumpleaños de Ferina!',
  stories:historias10a15,storyTitle:'El Secreto de Ferina y Fredo',activities:teensActivities,
  activityIntroduction:teensActivityIntroduction,
  lessons:[
   ['Página 7','Porque nadie tiene derecho a tocar tu cuerpo y hacerte daño.'],
   ['Página 10','Me demuestra su cariño con respeto.'],
   ['Página 12','Primero deben de buscar ayuda de alguien que esté más cerca y luego llaman a su mamá y se lo cuentan.']
  ],
  song:{title:'CANCIÓN ¡YO DIGO NO!',text:song,image:'/books/10-15/page-14.jpg',source:'PDF 9, página impresa 14'},
  videos:videos('10-15')
 }
};
