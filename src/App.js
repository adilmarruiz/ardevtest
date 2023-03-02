import './App.css';
import NewPerson from './components/NewPerson';
import People from './components/People'; 
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="bg-red-800 text-zinc-50 md:h-screen">
        <div className='text-center py-10'>
          <h1 className='text-4xl md:text-6xl'>AR Dev Test</h1>
        </div>
        <div className='box-border px-500'>
          <NewPerson/>
          <Routes>
            <Route path='/' element={<People/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
