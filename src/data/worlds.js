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
const videos = (age) => {
  const lista = age === '6-9'
    ? [
        {
          id: 1,
          titulo: 'Alguien que me escucha',
          descripcion: 'Aprende que puedes buscar a alguien de confianza que te escuche y te ayude.',
          tema: 'Pedir ayuda',
          archivo: '/videos/6-9/Shawi_alguien_que_me_escucha.mp4',
        },
        {
          id: 2,
          titulo: 'Mi cuerpo merece respeto',
          descripcion: 'Aprende que tu cuerpo te pertenece y que tus límites merecen respeto.',
          tema: 'Mi cuerpo',
          archivo: '/videos/6-9/Shawi_mi_cuerpo_merece_respeto.mp4',
        },
        {
          id: 3,
          titulo: 'Sorpresa o secreto',
          descripcion: 'Descubre la diferencia entre una sorpresa bonita y un secreto que te hace sentir mal.',
          tema: 'Secretos',
          archivo: '/videos/6-9/Shawi_sorpresa_o_secreto.mp4',
        },
      ]
    : [
        {
          id: 1,
          titulo: 'Mi cuerpo merece respeto',
          descripcion: 'Una pausa para aprender sobre nuestros límites.',
          tema: 'Mi cuerpo',
          archivo: '/videos/10-15/Ferina_y_Fredo_mi_cuerpo_es_mio.mp4',
        },
        {
          id: 2,
          titulo: 'Sorpresas y secretos',
          descripcion: 'Aprendemos a reconocer lo que podemos contar.',
          tema: 'Secretos',
          archivo: '/videos/10-15/Ferina_y_Fredo_sorpresas_vs_secretos.mp4',
        },
        {
          id: 3,
          titulo: 'No tengo que hacerlo a solas',
          descripcion: 'Personas que escuchan, respetan y protegen.',
          tema: 'Pedir ayuda',
          archivo: '/videos/10-15/Ferina_y_Fredo_pedir_ayuda.mp4',
        },
      ];

  return lista.map((video, i) => ({
    ...video,
    youtubeId: '',
    thumbnail: `/images/${age}/video-${i + 1}.webp`,
  }));
};


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
