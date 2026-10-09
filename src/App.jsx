import {Routes,Route} from 'react-router-dom';
import {Layout} from './components/layout/Layout';
import {Home} from './pages/Home';
import {WorldPage,StoriesPage,StoryPage,ActivitiesPage,ActivityPage,LearnPage,VideosPage,HelpPage,NotFound} from './pages/WorldPages';
export default function App(){return <Routes><Route element={<Layout/>}><Route index element={<Home/>}/>{['6-9','10-15'].map(age=><Route key={age} path={age}><Route index element={<WorldPage age={age}/>}/><Route path="historias" element={<StoriesPage age={age}/>}/><Route path="historias/:capitulo" element={<StoryPage age={age}/>}/><Route path="actividades" element={<ActivitiesPage age={age}/>}/><Route path="actividades/:actividad" element={<ActivityPage age={age}/>}/><Route path="aprende" element={<LearnPage age={age}/>}/><Route path="videos" element={<VideosPage age={age}/>}/><Route path="ayuda" element={<HelpPage age={age}/>}/></Route>)}<Route path="*" element={<NotFound/>}/></Route></Routes>}
