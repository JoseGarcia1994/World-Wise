import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
polyfillCountryFlagEmojis()

import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Pricing from './pages/Pricing.jsx';
import Login from './pages/Login.jsx';
import AppLayout from './pages/AppLayout.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import CityList from './components/CityList.jsx';
import City from './components/City.jsx';
import CountryList from './components/CountryList.jsx';
import Form from './components/Form.jsx';

const BASE_URL = 'http://localhost:8000'
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      }
      catch {
        alert('There was an error loading data...')
      } finally {
        setIsLoading(false)
      }
    }
      fetchCities();
  }, [])

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path='cities' element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path='cities/:id' element={<City />} />
          <Route path='countries' element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path='form' element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default App
