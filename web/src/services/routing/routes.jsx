import Adondeir from '../../pages/Adondeir';
import Home from '../../pages/Home';

export const routesConfig = [
  {
    name: 'Root',
    path: '/',
    component: <Home />,
  },
  {
    name: 'All',
    path: '*',
    component: <Home />,
  },
  {
    name: 'Adondeir',
    path: '/Adondeir',
    component: <Adondeir />,
    private: false,
  },
];
