import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Board from './components/board-components/Board'
import '../src/assets/css/style.css'

function App() {
  return (
    <Provider store={store}>
      <> 
        <Board />
      </>
    </Provider>
  );
}

export default App;
