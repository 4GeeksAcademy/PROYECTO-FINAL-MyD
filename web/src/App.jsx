import { Routes, Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { routesConfig } from './services/routing/routes';
import { GuardedRoute } from './components/routing/GuardedRoute';
import Adondeir from './pages/Adondeir';
import AdondeirConF from './pages/AdondeirConF';
import Home from './pages/Home';

import { LoginRedirect } from './components/routing/LoginRedirect';
import { Register } from './pages/Register';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<LoginRedirect />} />
        <Route path="Register" element={<Register />} />
        <Route path="/Adondeir" element={<Adondeir />} />
        <Route path="*" element={<Home />} />
        <Route path="**" element={<AdondeirConF />} />
        <Route element={<GuardedRoute />}>
          {routesConfig.map((route) => {
            return (
              <Route
                key={route.name}
                path={route.path}
                element={route.component}
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
};
