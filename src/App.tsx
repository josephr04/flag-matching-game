import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/home';
import Level from '@/pages/Level';
import { CountryProvider } from './context/CountryProvider';
import './App.css';

function App() {

  return (
    <CountryProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='levels/:id' element={<Level />} />
            <Route path='*' />
          </Route>
        </Routes>
      </BrowserRouter>
    </CountryProvider>
  )
}

export default App
