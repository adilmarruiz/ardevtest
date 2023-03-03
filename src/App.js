import './App.css';
import NewPerson from './components/NewPerson';
import People from './components/People'; 
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

/**
 * Componente principal
 */
function App() {
  return (
    <Router>
      {/* Contenedor de la aplicación */}
      <div className="overflow-y-auto flex flex-col p-2 md:p-5 bg-gradient-to-r from-slate-900 to-slate-700 h-screen">
        {/* Título */}
        <div className='flex-none text-center py-4 md:py-10'>
          <h1 className='font-bold text-4xl md:text-6xl'>
            <span className='bg-gradient-to-br from-red-400 to-fuchsia-600 text-transparent bg-clip-text'>
              AR Dev Test
            </span>
          </h1>
        </div>
        {/* Definición de Rutas */}
        <Routes>
          <Route exact path='/' element={<People/>}/>
          <Route path='/create' element={<NewPerson/>}/>
          <Route path='/modificar' element={<NewPerson/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
