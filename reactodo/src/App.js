import './App.css';
import Navigation from './Navigation';
import FakeServer from './FakeServer';
import EventEmitter from 'eventemitter3';
import { AppContext } from './AppContext';

const appContext = {
  title: 'Superprogram v1.0', 
  color: 'red',
  server: new FakeServer(),
  bus: new EventEmitter()
};

function App() {
  return (

      <AppContext.Provider value={appContext}>
          <Navigation />
      </AppContext.Provider>
  );
}

export default App;
