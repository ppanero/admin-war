import React, { createContext } from 'react';

const PlayersContext = createContext({
  hero: '',
  enemy: '',
});

export default PlayersContext;
