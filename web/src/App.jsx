import { Routes, Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { routesConfig } from './services/routing/routes';
import { GuardedRoute } from './components/routing/GuardedRoute';
import Adondeir from './pages/Adondeir';
import Inicio from './pages/Inicio';
import AdondeirConF from './pages/AdondeirConF';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Adondeir" element={<Adondeir />} />
        <Route path="*" element={<Inicio />} />
        <Route path="**" element={<AdondeirConF />} />

        {/* Rutas privadas */}
        <Route element={<GuardedRoute />}>
          {routesConfig.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              element={route.component}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
};
