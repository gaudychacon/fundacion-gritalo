import { historias6a9 } from './historias6a9';
import { historias10a15 } from './historias10a15';
import { kidsActivities,teensActivities } from './activities';
export const site = { name: 'Yo Digo No', tagline: 'Historias, juegos y actividades para aprender a cuidarnos y pedir ayuda cuando la necesitamos.' };
const commonLessons=[
 ['Mi cuerpo me pertenece','Tu cuerpo merece respeto. Puedes decidir sobre los abrazos y otros contactos. También debes respetar el cuerpo y los límites de las demás personas.'],
 ['Mi intimidad importa','Las partes del cuerpo que suele cubrir la ropa interior son privadas. Todo tu cuerpo merece respeto, no solo esas partes. Puedes preguntar y buscar ayuda si algo te preocupa.'],
 ['Secretos y sorpresas','Una sorpresa agradable se comparte pronto. Un secreto que incluye miedo, amenazas, presión o daño se puede contar a una persona adulta segura.'],
 ['Puedo decir NO','Puedes decir NO y alejarte si es posible y seguro. Si te quedaste sin voz, quieto o no pudiste salir, no es tu culpa. Aun así puedes pedir ayuda.'],
 ['Personas de confianza','Una persona adulta segura escucha, cree, respeta tus límites y actúa para protegerte. No basta con que sea familiar o tenga una profesión determinada.'],
 ['Si tengo miedo','El corazón puede latir rápido, puedes sentir confusión o quedarte sin palabras. También puedes no notar ninguna señal. No necesitas demostrar miedo para pedir ayuda.'],
 ['Pedir ayuda','Puedes empezar diciendo: «Algo me preocupa y necesito ayuda». Si la primera persona no te escucha o no te ayuda, cuéntaselo a otra persona adulta segura.']
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
 '6-9':{age:'6 a 9 años',label:'El mundo de Shawi',short:'Shawi',title:'¡Hola, pequeño explorador!',description:'Con Shawi, cada historia es una oportunidad para aprender a cuidarte.',stories:historias6a9,storyTitle:'El secreto de Shawi',activities:kidsActivities,lessons:commonLessons,videos:videos('6-9')},
 '10-15':{age:'10 a 15 años',label:'El mundo de Ferina y Fredo',short:'Ferina y Fredo',title:'Tu voz. Tus límites. Tu mundo.',description:'Descubre historias, cuestiona ideas y practica decisiones que te ayudan a cuidarte.',stories:historias10a15,storyTitle:'El secreto de Ferina y Fredo',activities:teensActivities,lessons:[...commonLessons.map(([title,text],i)=>[[ 'Límites personales','Mi cuerpo me pertenece','Presión, amenazas y secretos','Tomar decisiones seguras','Personas de confianza','Señales de alerta','Pedir ayuda'][i],text]),['Ante una situación peligrosa','Busca acercarte a un lugar seguro y a una persona adulta protectora, si puedes. No necesitas enfrentarte a quien te lastima. Si ya pasó, también puedes buscar apoyo.']],videos:videos('10-15')}
};
