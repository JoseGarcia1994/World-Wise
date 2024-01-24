import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { CitiesProvider } from './context/CitiesContext.jsx';
import { AuthProvider } from './context/FakeAuthContext.jsx';
import ProtectedRoutes from './pages/ProtectedRoutes.jsx';

function App() {

  return (
    <AuthProvider>
      <CitiesProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/app" 
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }>
              <Route index element={<Navigate replace to='cities' />} />
              <Route path='cities' element={<CityList />} />
              <Route path='cities/:id' element={<City />} />
              <Route path='countries' element={<CountryList />} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </HashRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
