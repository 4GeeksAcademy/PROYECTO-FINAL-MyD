import { createContext } from 'react';

export const UserContext = createContext({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});
