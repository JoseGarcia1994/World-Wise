import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
polyfillCountryFlagEmojis()

import { CitiesProvider } from './context/CitiesContext.jsx';
import { AuthProvider } from './context/FakeAuthContext.jsx';
import ProtectedRoutes from './pages/ProtectedRoutes.jsx';

import CityList from './components/CityList.jsx';
import City from './components/City.jsx';
import CountryList from './components/CountryList.jsx';
import Form from './components/Form.jsx';
import SpinnerFullPage from './components/SpinnerFullPage.jsx';

const Home = lazy(() => import("./pages/Home.jsx"));
const Product =  lazy(() => import('./pages/Product.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));
const Login = lazy(() => import("./pages/Login.jsx"));
const AppLayout = lazy(()=> import('./pages/AppLayout.jsx'));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));



function App() {

  return (
    <AuthProvider>
      <CitiesProvider>
        <HashRouter>
        <Suspense fallback={<SpinnerFullPage />}>
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
        </Suspense>  
        </HashRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
