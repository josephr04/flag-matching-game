import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/home';
import Level from '@/pages/Level';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='levels/:id' element={<Level />} />
          <Route path='*' />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
