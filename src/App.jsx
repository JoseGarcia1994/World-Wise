import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Pricing from './pages/Pricing.jsx';
import Login from './pages/Login.jsx';
import AppLayout from './pages/AppLayout.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<p>Cities Component</p>}/>
          <Route path='cities' element={<p>Cities Component</p>} />
          <Route path='countries' element={<p>Countries Component</p>} />
          <Route path='form' element={<p>Form Component</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default App
